const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isStaticExport = process.env.STATIC_EXPORT === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出模式（本地打包用）
  ...(isStaticExport && { output: 'export' }),
  images: {
    unoptimized: true,
  },
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  trailingSlash: true,
};

export default nextConfig;
