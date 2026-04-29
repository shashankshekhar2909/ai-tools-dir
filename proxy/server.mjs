import http from "http";
import fs from "fs";
import path from "path";

const PORT = Number(process.env.PORT || 80);
const RUNTIME_DIR = process.env.RUNTIME_DIR || "/app/runtime";
const SLOT_FILE = path.join(RUNTIME_DIR, "active-slot");
const BACKENDS = {
  blue: "app-blue",
  green: "app-green",
};

const hopByHopHeaders = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

function getActiveSlot() {
  try {
    const raw = fs.readFileSync(SLOT_FILE, "utf8").trim().toLowerCase();
    return raw === "green" ? "green" : "blue";
  } catch {
    return "blue";
  }
}

function getBackend() {
  const slot = getActiveSlot();
  return { slot, host: BACKENDS[slot] || BACKENDS.blue };
}

function copyHeaders(headers, host) {
  const forwarded = {};
  for (const [key, value] of Object.entries(headers)) {
    if (value === undefined) continue;
    if (hopByHopHeaders.has(key.toLowerCase())) continue;
    forwarded[key] = value;
  }
  forwarded.host = host;
  forwarded["x-forwarded-host"] = headers.host || "";
  forwarded["x-forwarded-proto"] = headers["x-forwarded-proto"] || "http";
  forwarded["x-forwarded-port"] = String(PORT);
  return forwarded;
}

function proxyRequest(req, res, targetPath = req.url || "/") {
  const { slot, host } = getBackend();
  const upstream = http.request(
    {
      host,
      port: 3000,
      method: req.method,
      path: targetPath,
      headers: copyHeaders(req.headers, host),
    },
    (upstreamRes) => {
      const responseHeaders = {};
      for (const [key, value] of Object.entries(upstreamRes.headers)) {
        if (value === undefined) continue;
        if (hopByHopHeaders.has(key.toLowerCase())) continue;
        responseHeaders[key] = value;
      }
      res.writeHead(upstreamRes.statusCode || 502, responseHeaders);
      upstreamRes.pipe(res);
    },
  );

  upstream.on("error", (error) => {
    console.error(`[proxy] ${slot} -> ${host} failed:`, error.message);
    if (!res.headersSent) {
      res.writeHead(502, { "content-type": "application/json" });
    }
    res.end(JSON.stringify({ ok: false, error: "Bad gateway" }));
  });

  req.pipe(upstream);
}

function checkHealth(res) {
  const { slot, host } = getBackend();
  const probe = http.request(
    {
      host,
      port: 3000,
      method: "GET",
      path: "/api/health",
      headers: {
        host,
        "x-forwarded-proto": "http",
      },
    },
    (upstreamRes) => {
      res.writeHead(upstreamRes.statusCode || 502, {
        "content-type": "application/json",
      });
      upstreamRes.pipe(res);
    },
  );

  probe.on("error", (error) => {
    console.error(`[proxy] health check failed for ${slot}:`, error.message);
    res.writeHead(503, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: false, slot }));
  });

  probe.end();
}

http.createServer((req, res) => {
  if (req.url === "/health") {
    checkHealth(res);
    return;
  }

  proxyRequest(req, res);
}).listen(PORT, "0.0.0.0", () => {
  console.log(`proxy listening on ${PORT}`);
});
