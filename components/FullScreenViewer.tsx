'use client';

interface FullScreenViewerProps {
    isOpen: boolean;
    onClose: () => void;
    src: string;
    alt?: string;
}

export default function FullScreenViewer({ isOpen, onClose, src, alt = 'Preview' }: FullScreenViewerProps) {
    if (!isOpen || !src) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div
                className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-full object-contain"
                />
            </div>
        </div>
    );
}
