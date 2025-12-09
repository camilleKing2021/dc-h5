'use client';

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
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
