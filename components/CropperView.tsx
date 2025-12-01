'use client';

import React, { useState, useCallback } from 'react';
import Cropper, { Point, Area } from 'react-easy-crop';

interface CropperViewProps {
    imageUrl: string;
    aspect: number;
    onCropComplete: (croppedAreaPixels: Area) => void;
}

export default function CropperView({ imageUrl, aspect, onCropComplete }: CropperViewProps) {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const handleCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixels: Area) => {
            onCropComplete(croppedAreaPixels);
        },
        [onCropComplete]
    );

    return (
        <div className="relative w-full h-full">
            {/* 裁剪器 */}
            <Cropper
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
                style={{
                    containerStyle: {
                        backgroundColor: '#000',
                    },
                }}
            />

            {/* 缩放控制 */}
            <div className="absolute bottom-8 left-0 right-0 px-6 z-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                    <div className="flex items-center gap-4">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="flex-1 h-2 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-400 [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* 提示文字 */}
            <div className="absolute top-8 left-0 right-0 text-center z-10">
                <p className="text-white text-sm bg-black/30 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
                    拖动调整位置，双指缩放调整大小
                </p>
            </div>
        </div>
    );
}
