'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useAppStore } from '@/store/useAppStore';
import ImagePreview from '@/components/ImagePreview';
import ResultSelector from '@/components/ResultSelector';
import BottomButton from '@/components/BottomButton';
import { useToast } from '@/components/ui/Toast';
import FullScreenViewer from '@/components/FullScreenViewer';
import ConfirmModal from '@/components/ConfirmModal';
// @ts-ignore
import { Trefoil } from 'ldrs/react';

// @ts-ignore
import 'ldrs/react/Trefoil.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GeneratePage() {
    const router = useRouter();
    const toast = useToast();
    const {
        orderNo,
        customSize,
        contactPhone,
        croppedImage,
        previewUrl,
        taskId,
        cartoonUrl,
        pixelUrl,
        selectedType,
        setTaskId,
        setGeneratedUrls,
        setSelectedType,
        reset,
    } = useAppStore();

    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [viewerState, setViewerState] = useState<{ isOpen: boolean; src: string }>({ isOpen: false, src: '' });
    const [showConfirm, setShowConfirm] = useState(false);

    // 上传裁剪后的图片
    useEffect(() => {
        if (!croppedImage || taskId) return;

        const uploadImage = async () => {
            setIsUploading(true);

            try {
                const formData = new FormData();
                formData.append('image', croppedImage, 'cropped.jpg');
                formData.append('orderNo', orderNo);
                formData.append('width', customSize.width.toString());
                formData.append('height', customSize.height.toString());

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (data.taskId) {
                    setTaskId(data.taskId);
                }
            } catch (error) {
                console.error('Upload error:', error);
                toast.show('上传失败，请重试');
            } finally {
                setIsUploading(false);
            }
        };

        uploadImage();
    }, [croppedImage, taskId, orderNo, customSize, setTaskId]);

    // 轮询任务状态
    const { data: taskData, error: taskError } = useSWR(
        taskId ? `/api/task/${taskId}` : null,
        fetcher,
        {
            refreshInterval: taskId && !cartoonUrl ? 2000 : 0, // 2秒轮询
            revalidateOnFocus: false,
        }
    );

    // 处理任务完成
    useEffect(() => {
        if (taskData?.status === 'done' && taskData.cartoonUrl && taskData.pixelUrl) {
            setGeneratedUrls(taskData.cartoonUrl, taskData.pixelUrl);
        }
    }, [taskData, setGeneratedUrls]);

    const handleSelectType = (type: 'cartoon' | 'pixel') => {
        setSelectedType(type);
    };

    const handleReupload = () => {
        reset();
        router.push('/');
    };

    const handlePreview = (url: string) => {
        setViewerState({ isOpen: true, src: url });
    };

    const handleSubmit = async () => {
        if (!selectedType) {
            toast.show('请选择一种效果');
            return;
        }
        setShowConfirm(true);
    };

    const handleConfirmSubmit = async () => {
        setShowConfirm(false);
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderNo,
                    taskId,
                    selectedType,
                    contactPhone,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.show('提交成功！');

                setTimeout(() => {
                    reset();
                    router.push('/success');
                }, 1500);
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.show('提交失败，请重试');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 如果没有裁剪图，返回首页
    // useEffect(() => {
    //     if (!croppedImage) {
    //         router.replace('/');
    //     }
    // }, [croppedImage, router]);

    // if (!croppedImage) {
    //     return null;
    // }

    const isLoading = isUploading || (taskId && !cartoonUrl);
    const isDone = cartoonUrl && pixelUrl;

    return (
        <div className="min-h-screen bg-[url('/assets/bg/main-bg.png')] bg-cover bg-center">
            <div className="min-h-screen px-4 py-8 pt-6 flex flex-col">

                {/* 订单信息 */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-4 relative overflow-visible ">
                    {/* 订单号 */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-[#ECEEF4]">
                        <span className="text-sm text-[#9CA3AF]">订单编号</span>
                        <span className="text-sm font-medium text-[#1E1F24]">{orderNo}</span>
                    </div>

                    {/* 定制尺寸 */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-[#ECEEF4]">
                        <span className="text-sm text-[#9CA3AF]">定制尺寸</span>
                        <span className="text-base font-bold text-[#FF8F34] bg-[#FFF3E5] rounded-md py-0.5 px-2">
                            {customSize.width}*{customSize.height}cm
                        </span>
                    </div>

                    {/* 联系方式 */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#9CA3AF]">联系方式</span>
                        <span className="text-sm font-medium text-[#1E1F24]">{contactPhone}</span>
                    </div>

                    {/* 点缀 - 保持和首页一致 */}
                    <Image src="/assets/icons/adorn-1.svg" alt="" width={21} height={20} className="absolute top-2 -left-4 w-6 h-6" />
                    <Image src="/assets/icons/adorn-3.svg" alt="" width={36} height={36} className="absolute bottom-2 -right-4 w-8 h-8" />
                </div>

                {/* 定制照片预览 */}
                <div className="mb-6">
                    <h2 className="text-[16px] font-medium text-[#8B5E3C] mb-3">您的定制图片：</h2>
                    <div className="w-[40%]">
                        {previewUrl && (
                            <ImagePreview
                                src={previewUrl}
                                alt="定制照片"
                                onClick={() => handlePreview(previewUrl)}
                            />
                        )}
                    </div>
                </div>

                {/* 加载状态 */}
                {isLoading && (
                    <div className="flex-1 flex flex-col items-center justify-center py-12">
                        <div className="mb-4">
                            <Trefoil
                                size="40"
                                stroke="4"
                                strokeLength="0.15"
                                bgOpacity="0.4"
                                speed="1.4"
                                color="#fdaab0ff"
                            />
                        </div>
                        <p className="text-gray-600 text-base">AI 正在生成效果图...</p>
                        <p className="text-gray-400 text-sm mt-2">预计需要 10-15 秒</p>
                    </div>
                )}

                {/* 生成结果 */}
                {isDone && (
                    <div className="flex-1 mb-6">
                        <ResultSelector
                            cartoonUrl={cartoonUrl}
                            pixelUrl={pixelUrl}
                            selectedType={selectedType}
                            onSelect={handleSelectType}
                            onPreview={handlePreview}
                        />
                    </div>
                )}

                {/* 错误提示 */}
                {taskError && (
                    <div className="flex-1 flex items-center justify-center py-12">
                        <div className="text-center">
                            <p className="text-red-500 text-base mb-4">生成失败，请重试</p>
                            <BottomButton
                                text="重新上传"
                                onClick={handleReupload}
                                variant="secondary"
                            />
                        </div>
                    </div>
                )}

                {/* 底部按钮 */}
                {isDone && (
                    <div className="flex gap-4 pb-6 items-center">
                        <div className="flex-1">
                            <BottomButton
                                text="重新上传"
                                onClick={handleReupload}
                                variant="secondary"
                                disabled={isSubmitting}
                                className="!bg-transparent !border-[#FFB7B2] !text-[#FF9BA2] !shadow-none"
                            />
                        </div>
                        <div className="flex-[2]">
                            <BottomButton
                                text={isSubmitting ? '提交中...' : '选择完成，开始制作'}
                                onClick={handleSubmit}
                                disabled={!selectedType || isSubmitting}
                            />
                        </div>
                    </div>
                )}
            </div>

            <FullScreenViewer
                isOpen={viewerState.isOpen}
                onClose={() => setViewerState(prev => ({ ...prev, isOpen: false }))}
                src={viewerState.src}
            />

            <ConfirmModal
                visible={showConfirm}
                onConfirm={handleConfirmSubmit}
                onCancel={() => setShowConfirm(false)}
            />
        </div>
    );
}
