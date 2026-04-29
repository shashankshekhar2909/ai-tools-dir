export const defaultSiteUrl = "https://ai.buildwithshashank.com";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || defaultSiteUrl;
  return raw.replace(/\/+$/, "");
}
