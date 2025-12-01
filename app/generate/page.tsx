'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useAppStore } from '@/store/useAppStore';
import ImagePreview from '@/components/ImagePreview';
import ResultSelector from '@/components/ResultSelector';
import BottomButton from '@/components/BottomButton';
import { Toast, DotLoading } from 'antd-mobile';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GeneratePage() {
    const router = useRouter();
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
                Toast.show({
                    content: '上传失败，请重试',
                    position: 'center',
                });
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

    const handleSubmit = async () => {
        if (!selectedType) {
            Toast.show({
                content: '请选择一种效果',
                position: 'center',
            });
            return;
        }

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
                Toast.show({
                    content: '提交成功！',
                    position: 'center',
                });

                setTimeout(() => {
                    reset();
                    router.push('/');
                }, 1500);
            }
        } catch (error) {
            console.error('Submit error:', error);
            Toast.show({
                content: '提交失败，请重试',
                position: 'center',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // 如果没有裁剪图，返回首页
    if (!croppedImage) {
        router.push('/');
        return null;
    }

    const isLoading = isUploading || (taskId && !cartoonUrl);
    const isDone = cartoonUrl && pixelUrl;

    return (
        <div className="min-h-screen bg-[url('/assets/bg/main-bg.png')] bg-cover bg-center">
            <div className="min-h-screen px-5 py-8 flex flex-col">
                {/* 标题 */}
                <div className="text-center mb-6">
                    <Image
                        src="/assets/icons/logo.svg"
                        alt="ODO CRAFTS"
                        width={186}
                        height={24}
                        className="mx-auto"
                        priority
                    />
                </div>

                {/* 订单信息 */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-4 mb-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <div className="text-gray-500 mb-1">订单编号</div>
                            <div className="font-medium text-gray-800">{orderNo}</div>
                        </div>
                        <div>
                            <div className="text-gray-500 mb-1">定制尺寸</div>
                            <div className="font-bold text-orange-400">
                                {customSize.width}*{customSize.height}cm
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-500 mb-1">联系方式</div>
                            <div className="font-medium text-gray-800">{contactPhone}</div>
                        </div>
                    </div>
                </div>

                {/* 定制照片预览 */}
                <div className="mb-6">
                    <h2 className="text-sm font-medium text-gray-700 mb-3">您的定制图片：</h2>
                    <div className="w-[40%] mx-auto">
                        {previewUrl && <ImagePreview src={previewUrl} alt="定制照片" />}
                    </div>
                </div>

                {/* 加载状态 */}
                {isLoading && (
                    <div className="flex-1 flex flex-col items-center justify-center py-12">
                        <DotLoading color="primary" className="text-pink-500 text-4xl mb-4" />
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
                    <div className="grid grid-cols-2 gap-4 pb-6">
                        <BottomButton
                            text="重新上传"
                            onClick={handleReupload}
                            variant="secondary"
                            disabled={isSubmitting}
                        />
                        <BottomButton
                            text={isSubmitting ? '提交中...' : '选择完成，开始制作'}
                            onClick={handleSubmit}
                            disabled={!selectedType || isSubmitting}
                        />
                    </div>
                )}

                {/* 装饰元素 */}
                <div className="fixed top-24 right-6 w-8 h-8 opacity-60">
                    <svg className="w-full h-full text-pink-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
