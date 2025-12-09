/*
 * @Descripttion: 
 * @Author: zhaozheng
 * @Version: 0.0.1
 * @Date: 2025-12-09 10:59:15
 * @LastEditors: zhaozheng
 * @LastEditTime: 2025-12-09 15:34:49
 */
'use client';

import { useState, useEffect } from 'react';

interface ResultSelectorProps {
    cartoonUrl: string;
    pixelUrl: string;
    selectedType: 'cartoon' | 'pixel' | null;
    onSelect: (type: 'cartoon' | 'pixel') => void;
    onPreview: (url: string) => void;
}

export default function ResultSelector({ cartoonUrl, pixelUrl, selectedType, onSelect, onPreview }: ResultSelectorProps) {
    const [selectedPixelIndex, setSelectedPixelIndex] = useState<number | null>(null);

    useEffect(() => {
        if (selectedType !== 'pixel') setSelectedPixelIndex(null);
    }, [selectedType]);

    const handlePixelSelect = (index: number) => {
        setSelectedPixelIndex(index);
        onSelect('pixel');
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-[16px] font-medium text-[#8B5E3C] mb-3">卡通画效果图：</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div onClick={() => onPreview(cartoonUrl)} className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                        <img src={cartoonUrl} alt="卡通效果 1" className="w-full h-full object-cover" />
                    </div>
                    <div onClick={() => onPreview(cartoonUrl)} className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                        <img src={cartoonUrl} alt="卡通效果 2" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-end justify-between mb-3 flex-wrap gap-2">
                    <h3 className="text-[16px] font-medium text-[#8B5E3C] w-full flex justify-between items-center">
                        <span>像素画效果图：</span>
                        <span className="text-xs font-normal ml-2 text-[#C99685]">请您从以下两张中，选择一张</span>
                    </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {[0, 1].map((index) => {
                        const isSelected = selectedType === 'pixel' && selectedPixelIndex === index;
                        return (
                            <div key={index} onClick={() => handlePixelSelect(index)} className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all box-border ${isSelected ? 'border-[3px] border-[#8B5E3C]' : 'border-[3px] border-transparent hover:scale-105'}`}>
                                <img src={pixelUrl} alt={`像素效果 ${index + 1}`} className="w-full h-full object-cover" />
                                {isSelected && (
                                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#8B5E3C] rounded-bl-xl flex items-center justify-center z-10">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
