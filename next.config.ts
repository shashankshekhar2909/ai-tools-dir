import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@carbon/react", "@carbon/styles", "@carbon/icons-react"],
  sassOptions: {
    // Suppress deprecation warnings from Carbon's Sass (they use legacy `@import` syntax internally)
    quietDeps: true,
    silenceDeprecations: ["legacy-js-api", "import"],
  },
};

export default nextConfig;
