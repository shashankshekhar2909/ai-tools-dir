import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Stack Lab",
    short_name: "AIStackLab",
    description: "Tested AI tools, workflows, and stacks for people who actually ship.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  };
}
