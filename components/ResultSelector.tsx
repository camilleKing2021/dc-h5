'use client';

import React from 'react';
import Image from 'next/image';

interface ResultSelectorProps {
    cartoonUrl: string;
    pixelUrl: string;
    selectedType: 'cartoon' | 'pixel' | null;
    onSelect: (type: 'cartoon' | 'pixel') => void;
}

export default function ResultSelector({
    cartoonUrl,
    pixelUrl,
    selectedType,
    onSelect,
}: ResultSelectorProps) {
    return (
        <div className="space-y-4">
            {/* 卡通效果 */}
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">卡通画效果图：</h3>
                <div className="grid grid-cols-2 gap-3">
                    {/* 卡通图 1 */}
                    <div
                        onClick={() => onSelect('cartoon')}
                        className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all ${selectedType === 'cartoon'
                                ? 'ring-4 ring-pink-500 scale-105 shadow-lg'
                                : 'hover:scale-105'
                            }`}
                    >
                        <Image
                            src={cartoonUrl}
                            alt="卡通效果"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        {selectedType === 'cartoon' && (
                            <div className="absolute top-2 right-2 w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* 卡通图 2 (备用) */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                        <Image
                            src={cartoonUrl}
                            alt="卡通效果备用"
                            fill
                            className="object-cover opacity-50"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                    </div>
                </div>
            </div>

            {/* 像素效果 */}
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">像素画效果图：</h3>
                <div className="grid grid-cols-2 gap-3">
                    {/* 像素图 1 */}
                    <div
                        onClick={() => onSelect('pixel')}
                        className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all ${selectedType === 'pixel'
                                ? 'ring-4 ring-pink-500 scale-105 shadow-lg'
                                : 'hover:scale-105'
                            }`}
                    >
                        <Image
                            src={pixelUrl}
                            alt="像素效果"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        {selectedType === 'pixel' && (
                            <div className="absolute top-2 right-2 w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* 像素图 2 (备用) */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                        <Image
                            src={pixelUrl}
                            alt="像素效果备用"
                            fill
                            className="object-cover opacity-50"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                    </div>
                </div>
            </div>

            {/* 提示文字 */}
            <p className="text-center text-sm text-pink-400 mt-4">
                {selectedType ? '请您从以下效果中，选择一张' : '* 优素从以下效果中，选择一张'}
            </p>
        </div>
    );
}
