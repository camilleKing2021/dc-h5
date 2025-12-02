'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import CropperView from '@/components/CropperView';
import BottomButton from '@/components/BottomButton';
import { Area } from 'react-easy-crop';
import { useToast } from '@/components/ui/Toast';

// 工具函数：创建裁剪后的图片
async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area
): Promise<Blob> {
    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => {
        image.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Canvas context not available');
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Canvas is empty'));
            }
        }, 'image/jpeg', 0.95);
    });
}

export default function CropPage() {
    const router = useRouter();
    const toast = useToast();
    const { previewUrl, customSize, setCroppedImage } = useAppStore();
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // 计算裁剪比例
    const aspect = customSize.width / customSize.height;

    const handleCropComplete = useCallback((croppedArea: Area) => {
        setCroppedAreaPixels(croppedArea);
    }, []);

    const handleConfirm = async () => {
        if (!previewUrl || !croppedAreaPixels) {
            toast.show('请先调整裁剪区域');
            return;
        }

        setIsProcessing(true);

        try {
            const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels);
            setCroppedImage(croppedBlob);

            toast.show('裁剪成功');

            // 跳转回首页
            router.push('/');
        } catch (error) {
            console.error('Crop error:', error);
            toast.show('裁剪失败，请重试');
        } finally {
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
                        onCropComplete={handleCropComplete}
                    />
                </div>

                {/* 底部按钮 */}
                <div className="p-6 bg-gradient-to-t from-black/60 to-transparent z-20">
                    <BottomButton
                        text={isProcessing ? '处理中...' : '完成裁剪'}
                        onClick={handleConfirm}
                        disabled={isProcessing || !croppedAreaPixels}
                        className="!shadow-none"
                    />
                </div>
            </div>
        </div>
    );
}
