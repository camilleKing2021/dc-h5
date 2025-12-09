'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function GeneratePage() {
    const router = useRouter();
    const toast = useToast();
    const {
        orderNo, customSize, contactPhone, croppedImage, previewUrl,
        taskId, cartoonUrl, pixelUrl, selectedType,
        setTaskId, setGeneratedUrls, setSelectedType, reset,
    } = useAppStore();

    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [viewerState, setViewerState] = useState<{ isOpen: boolean; src: string }>({ isOpen: false, src: '' });
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (!croppedImage || taskId) return;

        const mockUpload = async () => {
            setIsUploading(true);
            await new Promise((resolve) => setTimeout(resolve, 500));
            const mockTaskId = `mock-task-${Date.now()}`;
            setTaskId(mockTaskId);
            setIsUploading(false);

            await new Promise((resolve) => setTimeout(resolve, 3000));
            setGeneratedUrls('/assets/mock/cartoon.svg', '/assets/mock/pixel.svg');
        };

        mockUpload();
    }, [croppedImage, taskId, setTaskId, setGeneratedUrls]);

    const handleSelectType = (type: 'cartoon' | 'pixel') => setSelectedType(type);
    const handleReupload = () => { reset(); router.push('/'); };
    const handlePreview = (url: string) => setViewerState({ isOpen: true, src: url });

    const handleSubmit = async () => {
        if (!selectedType) { toast.show('请选择一种效果'); return; }
        setShowConfirm(true);
    };

    const handleConfirmSubmit = async () => {
        setShowConfirm(false);
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        toast.show('提交成功！');
        setTimeout(() => { reset(); router.push('/success'); }, 1500);
        setIsSubmitting(false);
    };

    const isLoading = isUploading || (taskId && !cartoonUrl);
    const isDone = cartoonUrl && pixelUrl;

    return (
        <>
            {/* 全屏背景图 */}
            <div className="fixed inset-0 bg-[url('/assets/bg/main-bg.png')] bg-cover bg-center -z-10" />

            <div className="min-h-screen px-4 py-5 flex flex-col relative">
                {/* 订单信息 */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-4 relative overflow-visible">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-[#ECEEF4]">
                        <span className="text-sm text-[#9CA3AF]">订单编号</span>
                        <span className="text-sm font-medium text-[#1E1F24] font-num">{orderNo}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-[#ECEEF4]">
                        <span className="text-sm text-[#9CA3AF]">定制尺寸</span>
                        <span className="text-base font-bold text-[#FF8F34] bg-[#FFF3E5] rounded-md py-0.5 px-2 font-num">
                            {customSize.width}*{customSize.height}cm
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#9CA3AF]">联系方式</span>
                        <span className="text-sm font-medium text-[#1E1F24] font-num">{contactPhone}</span>
                    </div>
                    <img src="/assets/icons/adorn-1.svg" alt="" width={21} height={20} className="absolute top-2 -left-4 w-6 h-6" />
                    <img src="/assets/icons/adorn-3.svg" alt="" width={36} height={36} className="absolute bottom-2 -right-4 w-8 h-8" />
                </div>

                {/* 定制照片和生成结果卡片 */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 relative overflow-visible flex-1 flex flex-col">
                    <div className="mb-6">
                        <h2 className="text-[16px] font-medium text-[#8B5E3C] mb-3">您的定制图片：</h2>
                        <div className="w-[40%]">
                            {previewUrl && <ImagePreview src={previewUrl} alt="定制照片" onClick={() => handlePreview(previewUrl)} />}
                        </div>
                    </div>

                    {isLoading && (
                        <div className="flex-1 flex flex-col items-center justify-center py-12">
                            <div className="mb-4"><Trefoil size="40" stroke="4" strokeLength="0.15" bgOpacity="0.4" speed="1.4" color="#fdaab0ff" /></div>
                            <p className="text-gray-600 text-base">AI 正在生成效果图...</p>
                            <p className="text-gray-400 text-sm mt-2">预计需要 10-15 秒</p>
                        </div>
                    )}

                    {isDone && (
                        <div className="flex-1">
                            <ResultSelector cartoonUrl={cartoonUrl} pixelUrl={pixelUrl} selectedType={selectedType} onSelect={handleSelectType} onPreview={handlePreview} />
                        </div>
                    )}
                </div>

                {isDone && (
                    <div className="flex gap-4 pb-6 items-center">
                        <div className="flex-1">
                            <BottomButton text="重新上传" onClick={handleReupload} variant="secondary" disabled={isSubmitting} className="bg-transparent! border-[#FFB7B2]! text-[#FF9BA2]! shadow-none!" />
                        </div>
                        <div className="flex-2">
                            <BottomButton text={isSubmitting ? '提交中...' : '选择完成，开始制作'} onClick={handleSubmit} disabled={!selectedType || isSubmitting} />
                        </div>
                    </div>
                )}
            </div>

            <FullScreenViewer isOpen={viewerState.isOpen} onClose={() => setViewerState(prev => ({ ...prev, isOpen: false }))} src={viewerState.src} />
            <ConfirmModal visible={showConfirm} onConfirm={handleConfirmSubmit} onCancel={() => setShowConfirm(false)} />
        </>
    );
}
