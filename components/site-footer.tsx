import Link from "next/link";

const socials = [
  { label: "X / Twitter", href: "https://x.com/shekharbuilds" },
  { label: "GitHub", href: "https://github.com/shashankshekhar2909" },
  { label: "LinkedIn", href: "https://linkedin.com/in/shashankshekhar2k15" },
  { label: "Reddit", href: "https://www.reddit.com/user/s_shekhar29/" },
  { label: "Website", href: "https://buildwithshashank.com/" },
];

const navLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/workflows", label: "Workflows" },
  { href: "/compare", label: "Compare" },
  { href: "/blog", label: "Guides" },
  { href: "/help", label: "Help" },
];

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        backgroundColor: "var(--surface-1)",
        marginTop: 0,
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "3.5rem 1.5rem 2rem",
        }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gap: "2.5rem",
          }}
        >
          {/* Brand block */}
          <div>
            <p
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--text-primary)",
                margin: "0 0 0.625rem",
              }}
            >
              AI Stack Lab
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                margin: "0 0 0.75rem",
                maxWidth: "22rem",
              }}
            >
              Tested AI tools, workflows, and stacks for people who actually ship.
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
              }}
            >
              By{" "}
              <Link href="https://buildwithshashank.com" target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                BuildWithShashank
              </Link>
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.875rem",
                color: "var(--text-muted)",
              }}
            >
              Directory
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-nav-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <nav aria-label="Social links">
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.875rem",
                color: "var(--text-muted)",
              }}
            >
              Connect
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {socials.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                  >
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
            fontSize: "0.75rem",
          }}
        >
          &copy; {new Date().getFullYear()}{" "}
          <Link href="https://buildwithshashank.com" target="_blank" rel="noopener noreferrer" className="footer-nav-link">
            BuildWithShashank
          </Link>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
