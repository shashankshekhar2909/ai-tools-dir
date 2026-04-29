import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "asl_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "change-me-in-production";
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

function encodeSession(payload: { userId: string; exp: number }) {
  const json = JSON.stringify(payload);
  const base = Buffer.from(json).toString("base64url");
  const sig = sign(base);
  return `${base}.${sig}`;
}

function decodeSession(raw: string) {
  const [base, sig] = raw.split(".");
  if (!base || !sig) return null;
  const expected = sign(base);
  if (sig !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(base, "base64url").toString("utf8")) as {
      userId: string;
      exp: number;
    };
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string) {
  const exp = Date.now() + SESSION_TTL_MS;
  const token = encodeSession({ userId, exp });
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(exp),
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getSessionUser() {
  const jar = await cookies();
  const raw = jar.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  const payload = decodeSession(raw);
  if (!payload) return null;
  return prisma.adminUser.findUnique({ where: { id: payload.userId } });
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function authenticateAdmin(email: string, password: string) {
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;
  return user;
}
