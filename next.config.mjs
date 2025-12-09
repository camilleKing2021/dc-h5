/*
 * @Descripttion: 
 * @Author: zhaozheng
 * @Version: 0.0.1
 * @Date: 2025-12-09 15:56:37
 * @LastEditors: zhaozheng
 * @LastEditTime: 2025-12-09 17:15:45
 */
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
