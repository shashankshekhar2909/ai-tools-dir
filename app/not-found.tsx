import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: "32rem",
        margin: "4rem auto",
        textAlign: "center",
        backgroundColor: "var(--cds-layer-01)",
        border: "1px solid var(--cds-border-subtle)",
        padding: "3rem 2rem",
      }}
    >
      <h1 className="cds--type-productive-heading-05" style={{ marginBottom: "0.75rem" }}>
        Page not found
      </h1>
      <p className="cds--type-body-short-01" style={{ color: "var(--cds-text-secondary)", marginBottom: "2rem" }}>
        The page you requested does not exist.
      </p>
      <Link
        href="/"
        className="cds--btn cds--btn--primary cds--btn--md"
        style={{ textDecoration: "none" }}
      >
        Back home
      </Link>
    </div>
  );
}
