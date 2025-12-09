/*
 * @Descripttion: 
 * @Author: zhaozheng
 * @Version: 0.0.1
 * @Date: 2025-12-09 13:36:16
 * @LastEditors: zhaozheng
 * @LastEditTime: 2025-12-09 14:26:27
 */
import type { NextConfig } from "next";

// 从环境变量读取，打包时设置
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  trailingSlash: true,
};

export default nextConfig;
