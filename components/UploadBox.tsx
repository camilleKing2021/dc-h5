'use client';

import { useRef } from 'react';
import { useToast } from '@/components/ui/Toast';
import { BASE_PATH } from '@/config/basePath';

interface UploadBoxProps {
    onSelect: (file: File) => void;
    previewImage?: string | null;
}

export default function UploadBox({ onSelect, previewImage }: UploadBoxProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();

    const handleClick = () => inputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { toast.show('请选择图片文件'); return; }
        if (file.size > 20 * 1024 * 1024) { toast.show('图片大小不能超过 20MB'); return; }
        onSelect(file);
    };

    return (
        <>
            <div onClick={handleClick} className="relative w-full h-[300px] bg-[#fff0f5] rounded-3xl border-2 border-dashed border-[#F9A8D4] flex flex-col items-center justify-center cursor-pointer">
                {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-contain p-2" />
                ) : (
                    <>
                        <div className="w-12 h-12 mb-3 flex items-center justify-center bg-white rounded-full">
                            <img src={`${BASE_PATH}/assets/icons/upload.svg`} alt="上传" width={19} height={19} />
                        </div>
                        <p className="text-[#F087C0] font-medium text-sm">点击上传图片</p>
                    </>
                )}
                <img src={`${BASE_PATH}/assets/icons/adorn-5.svg`} alt="" className="absolute -bottom-14 -right-5 w-15 h-15 pointer-events-none" />
                <img src={`${BASE_PATH}/assets/icons/adorn-6.svg`} alt="" className="absolute -bottom-14 right-9 w-5 h-5 pointer-events-none" />
                <img src={`${BASE_PATH}/assets/icons/adorn-7.svg`} alt="" className="absolute -bottom-23 -left-7 w-10 h-8 pointer-events-none" />
            </div>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <p className="text-center text-[12px] text-[#C99685] mt-4">请确保定制图片清晰，图片只能上传1张</p>
        </>
    );
}
