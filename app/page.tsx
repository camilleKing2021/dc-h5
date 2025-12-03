'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import UploadBox from '@/components/UploadBox';
import BottomButton from '@/components/BottomButton';

export default function Home() {
  const router = useRouter();
  const { orderNo, customSize, contactPhone, originalFile, setOriginalFile, setPreviewUrl, croppedImage } = useAppStore();
  const [displayUrl, setDisplayUrl] = useState<string | null>(null);

  useEffect(() => {
    if (croppedImage) {
      const url = URL.createObjectURL(croppedImage);
      setDisplayUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setDisplayUrl(null);
    }
  }, [croppedImage]);

  const handleFileSelect = (file: File) => {
    setOriginalFile(file);

    // 生成预览 URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // 立即跳转裁剪
    router.push('/crop');
  };

  const handleNext = () => {
    if (!croppedImage) return;
    router.push('/generate');
  };

  return (
    <>
      {/* 全屏背景图 */}
      <div className="fixed inset-0 bg-[url('/assets/bg/main-bg.png')] bg-cover bg-center -z-10" />

      <div className="min-h-screen px-4 py-5 flex flex-col relative">
        {/* 标题 */}
        <div className="text-center mb-5">
          <Image
            src="/assets/icons/logo.svg"
            alt="ODO CRAFTS"
            width={186}
            height={24}
            className="mx-auto"
            priority
          />
        </div>

        {/* 订单信息卡片 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 relative overflow-visible">
          {/* 订单号 */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-[#ECEEF4]">
            <span className="text-sm text-[#9CA3AF]">订单编号</span>
            <span className="text-sm font-medium text-[#1E1F24] font-num">{orderNo}</span>
          </div>

          {/* 定制尺寸 */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-[#ECEEF4]">
            <span className="text-sm text-[#9CA3AF]">定制尺寸</span>
            <span className="text-base font-bold text-[#FF8F34] bg-[#FFF3E5] rounded-md py-0.5 px-2 font-num">
              {customSize.width}*{customSize.height}cm
            </span>
          </div>

          {/* 联系方式 */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#9CA3AF]">联系方式</span>
            <span className="text-sm font-medium text-[#1E1F24] font-num">{contactPhone}</span>
          </div>

          {/* 点缀 */}
          <Image src="/assets/icons/adorn-1.svg" alt="" width={21} height={20} className="absolute top-2 -left-4 w-6 h-6" />
          <Image src="/assets/icons/adorn-2.svg" alt="" width={25} height={17} className="absolute -top-3 -right-4 w-8 h-6" />
          <Image src="/assets/icons/adorn-3.svg" alt="" width={36} height={36} className="absolute bottom-2 -right-4 w-8 h-8" />
          <Image src="/assets/icons/adorn-4.svg" alt="" width={48} height={48} className="absolute -bottom-7 -left-4 w-8 h-8" />
        </div>

        {/* 上传区域 */}
        <div className="flex-1 mb-6">


          {/* 白色卡片包裹上传区域 */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-medium text-gray-700">上传定制照片：</h2>
              <span className="text-xs border border-[#FEF08A] bg-[#fef9c3] text-[#CA8A04] px-3 py-1 rounded-full font-bold">
                限一张 · 20M以内
              </span>
            </div>
            <UploadBox onSelect={handleFileSelect} previewImage={displayUrl} />
          </div>
        </div>

        {/* 底部装饰 */}
        <div className="text-center mb-6">
          <Image
            src="/assets/icons/logo.svg"
            alt="ODO CRAFTS"
            width={124}
            height={16}
            className="mx-auto opacity-30"
          />
        </div>

        {/* 提交按钮 */}
        <div className="pb-6">
          <BottomButton
            text="提交"
            onClick={handleNext}
            disabled={!croppedImage}
            icon={
              <Image
                src="/assets/icons/right.svg"
                alt=""
                width={20}
                height={20}
              />
            }
          />
        </div>
      </div>
    </>
  );
}
