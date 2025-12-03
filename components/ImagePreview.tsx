'use client';

import React from 'react';
import Image from 'next/image';

interface ImagePreviewProps {
    src: string;
    alt?: string;
    className?: string;
    rounded?: boolean;
    onClick?: () => void;
}

export default function ImagePreview({
    src,
    alt = '预览图片',
    className = '',
    rounded = true,
    onClick
}: ImagePreviewProps) {
    return (
        <div
            className={`relative w-full aspect-square overflow-hidden ${rounded ? 'rounded-2xl' : ''} ${className} ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
    );
}
