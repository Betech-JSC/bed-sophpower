import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "standalone",
  // Repo có 2 lockfile (root + web/). Không cố định root thì Next suy ra root là
  // gốc monorepo và build ra .next/standalone/web/server.js (lệch với hướng dẫn
  // deploy `pm2 start .next/standalone/server.js`).
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/food-ingredients",
        destination: "/nguyen-lieu-thuc-pham",
      },
      {
        source: "/food-ingredients/:id",
        destination: "/nguyen-lieu-thuc-pham/:id",
      },
      {
        source: "/cosmetic-ingredients",
        destination: "/nguyen-lieu-my-pham",
      },
      {
        source: "/cosmetic-ingredients/:id",
        destination: "/nguyen-lieu-my-pham/:id",
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm"]],
    rehypePlugins: [
      ["rehype-slug"],
      [
        "rehype-pretty-code",
        {
          theme: "github-dark-default",
          keepBackground: false,
        },
      ],
      [
        "rehype-autolink-headings",
        {
          behavior: "wrap",
          properties: { className: ["heading-anchor"] },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
