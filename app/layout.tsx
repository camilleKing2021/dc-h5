/*
 * @Descripttion: 
 * @Author: zhaozheng
 * @Version: 0.0.1
 * @Date: 2025-12-01 19:28:22
 * @LastEditors: zhaozheng
 * @LastEditTime: 2025-12-09 16:38:04
 */
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const sanJi = localFont({
  src: "../public/fonts/SanJiCuYuanJianTi-2.ttf",
  variable: "--font-sanji",
  display: "swap",
});

const alimama = localFont({
  src: "../public/fonts/AlimamaFangYuanTiVF-Thin-2.ttf",
  variable: "--font-alimama",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ODO CRAFTS",
  description: "定制照片生成服务",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sanJi.variable}  ${alimama.variable} antialiased flex justify-center bg-[#F8F8F8]`}>
        <ToastProvider>
          <div className="w-full max-w-[750px] min-h-screen">
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
