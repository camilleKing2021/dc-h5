/*
 * @Descripttion: 
 * @Author: zhaozheng
 * @Version: 0.0.1
 * @Date: 2025-12-01 19:46:02
 * @LastEditors: zhaozheng
 * @LastEditTime: 2025-12-02 21:49:16
 */
'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import CropperView from '@/components/CropperView';
import BottomButton from '@/components/BottomButton';
import { useToast } from '@/components/ui/Toast';
import { ReactCropperElement } from 'react-cropper';

export default function CropPage() {
    const router = useRouter();
    const toast = useToast();
    const { previewUrl, customSize, setCroppedImage } = useAppStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const cropperRef = useRef<ReactCropperElement>(null);

    // 计算裁剪比例
    const aspect = customSize.width / customSize.height;

    const handleConfirm = () => {
        const cropper = cropperRef.current?.cropper;
        if (!cropper) return;

        setIsProcessing(true);

        try {
            cropper.getCroppedCanvas().toBlob((blob) => {
                if (blob) {
                    setCroppedImage(blob);
                    toast.show('裁剪成功');
                    // 跳转回首页
                    router.push('/');
                } else {
                    toast.show('裁剪失败，请重试');
                }
                setIsProcessing(false);
            }, 'image/jpeg', 0.95);
        } catch (error) {
            console.error('Crop error:', error);
            toast.show('裁剪失败，请重试');
            setIsProcessing(false);
        }
    };

    const handleBack = () => {
        router.back();
    };

    // 如果没有图片，返回首页
    if (!previewUrl) {
        router.push('/');
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex justify-center">
            <div className="w-full max-w-[750px] h-full flex flex-col relative bg-black">
                {/* 顶部导航 */}
                <div className="flex items-center justify-between px-5 py-4 z-20">
                    <button
                        onClick={handleBack}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <h1 className="text-white text-lg font-medium">裁剪照片</h1>

                    <div className="w-10" /> {/* 占位 */}
                </div>

                {/* 裁剪区域 */}
                <div className="flex-1 relative w-full bg-black">
                    <CropperView
                        imageUrl={previewUrl}
                        aspect={aspect}
                        onRef={(ref) => (cropperRef.current = ref)}
                    />
                </div>

                {/* 底部按钮 */}
                <div className="p-6 bg-gradient-to-t from-black/60 to-transparent z-20">
                    <BottomButton
                        text={isProcessing ? '处理中...' : '完成裁剪'}
                        onClick={handleConfirm}
                        disabled={isProcessing}
                        className="!shadow-none"
                    />
                </div>
            </div>
        </div>
    );
}
