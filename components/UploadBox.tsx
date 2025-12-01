/*
 * @Descripttion: 
 * @Author: zhaozheng
 * @Version: 0.0.1
 * @Date: 2025-12-01 19:44:40
 * @LastEditors: zhaozheng
 * @LastEditTime: 2025-12-01 21:19:14
 */
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Toast } from 'antd-mobile';

interface UploadBoxProps {
    onSelect: (file: File) => void;
}

export default function UploadBox({ onSelect }: UploadBoxProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            Toast.show({
                content: '请选择图片文件',
                position: 'center',
            });
            return;
        }

        // 验证文件大小（限制 10MB）
        if (file.size > 10 * 1024 * 1024) {
            Toast.show({
                content: '图片大小不能超过 10MB',
                position: 'center',
            });
            return;
        }

        onSelect(file);
    };

    return (
        <>
            <div
                onClick={handleClick}
                className="relative w-full aspect-square bg-[#fff0f5] rounded-3xl border-2 border-dashed border-[#F9A8D4] flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform"
            >
                {/* 上传图标 */}
                <div className="w-12 h-12 mb-3 flex items-center justify-center bg-white rounded-full">
                    <Image
                        src="/assets/icons/upload.svg"
                        alt="上传"
                        width={19}
                        height={19}
                    />
                </div>

                {/* 上传文字 */}
                <p className="text-[#F087C0] font-medium text-sm">
                    点击上传图片
                </p>

                 {/* 点缀 */}
                <Image src="/assets/icons/adorn-5.svg" alt="" width={21} height={20} className="absolute -bottom-14 -right-5 w-15 h-15" />
                <Image src="/assets/icons/adorn-6.svg" alt="" width={21} height={20} className="absolute -bottom-14 right-9 w-5 h-5" />
                <Image src="/assets/icons/adorn-7.svg" alt="" width={21} height={20} className="absolute -bottom-23 -left-7 w-10 h-8" />
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* 提示文字 */}
            <p className="text-center text-[12px] text-[#C99685] mt-4">
                请确保定制图片清晰，图片只能上传1张
            </p>
        </>
    );
}
