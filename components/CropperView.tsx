/*
 * @Descripttion: 
 * @Author: zhaozheng
 * @Version: 0.0.1
 * @Date: 2025-12-01 19:44:50
 * @LastEditors: zhaozheng
 * @LastEditTime: 2025-12-02 22:13:37
 */
'use client';

import React, { useState, useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import './cropper.css';

interface CropperViewProps {
    imageUrl: string;
    aspect: number;
    onRef: (instance: ReactCropperElement | null) => void;
}

export default function CropperView({ imageUrl, aspect, onRef }: CropperViewProps) {
    const [zoom, setZoom] = useState(1);
    const internalRef = useRef<ReactCropperElement | null>(null);

    const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setZoom(value);
        internalRef.current?.cropper.zoomTo(value);
    };

    const onZoom = (event: any) => {
        setZoom(event.detail.ratio);
    };

    const setRef = (ref: ReactCropperElement | null) => {
        internalRef.current = ref;
        onRef(ref);
    };

    const handleZoomIn = () => {
        const newZoom = Math.min(zoom + 0.1, 3);
        setZoom(newZoom);
        internalRef.current?.cropper.zoomTo(newZoom);
    };

    const handleZoomOut = () => {
        const newZoom = Math.max(zoom - 0.1, 0.1);
        setZoom(newZoom);
        internalRef.current?.cropper.zoomTo(newZoom);
    };

    return (
        <div className="w-full h-full bg-black relative">
            <Cropper
                src={imageUrl}
                style={{ height: '100%', width: '100%' }}
                // 核心配置
                initialAspectRatio={aspect}
                aspectRatio={aspect} // 锁定等比
                guides={true} // 显示辅助线
                viewMode={1} // 限制：裁剪框不能移出图片
                dragMode="move" // 背景图片可拖动

                // 交互配置
                scalable={true}
                zoomable={true}
                cropBoxMovable={true} // 裁剪框可移动
                cropBoxResizable={true} // 裁剪框可缩放
                toggleDragModeOnDblclick={false}

                // 样式配置
                background={false} // 不显示网格背景
                responsive={true}
                autoCropArea={0.9} // 初始大小
                checkOrientation={false}

                ref={setRef}
                zoom={onZoom}
                ready={() => {
                    // 初始化时同步 zoom
                    if (internalRef.current?.cropper) {
                        // 这里获取 canvasData 可能还不准确，通常默认 ratio 是图片原始比例
                        // 但为了简单，我们让它从 1 开始（如果不缩放的话）
                        // 或者尝试获取 containerData
                    }
                }}
            />

            {/* 缩放控制 */}
            <div className="absolute bottom-2 w-[80%] max-w-[300px] left-1/2 -translate-x-1/2 z-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
                    <div className="flex items-center gap-4">
                        <svg
                            className="w-4 h-4 text-white cursor-pointer active:scale-90 transition-transform"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            onClick={handleZoomOut}
                        >
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        <input
                            type="range"
                            min={0.1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={handleZoomChange}
                            className="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-400 [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                        <svg
                            className="w-4 h-4 text-white cursor-pointer active:scale-90 transition-transform"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            onClick={handleZoomIn}
                        >
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* 样式覆盖：保持现有风格 */}
            <style jsx global>{`
                /* 裁剪框边框 */
                .cropper-view-box {
                    outline: 2px solid #fff;
                    box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
                }
                
                /* 角点样式 */
                .cropper-point {
                    width: 8px;
                    height: 8px;
                    background-color: #fff;
                    opacity: 1;
                    border-radius: 50%;
                }
                
                /* 线条样式 */
                .cropper-line {
                    background-color: rgba(255, 255, 255, 0.5);
                }
                
                /* 遮罩颜色 */
                .cropper-modal {
                    background-color: rgba(0, 0, 0, 0.6);
                }
                
                /* 背景 */
                .cropper-bg {
                    background-image: none;
                    background-color: #000;
                }
            `}</style>
        </div>
    );
}
