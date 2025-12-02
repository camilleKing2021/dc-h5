/*
 * @Descripttion: 
 * @Author: zhaozheng
 * @Version: 0.0.1
 * @Date: 2025-12-01 19:45:10
 * @LastEditors: zhaozheng
 * @LastEditTime: 2025-12-01 19:49:04
 */
'use client';

import React from 'react';

interface BottomButtonProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    icon?: React.ReactNode;
    className?: string;
}

export default function BottomButton({
    text,
    onClick,
    disabled = false,
    variant = 'primary',
    icon,
    className = '',
}: BottomButtonProps) {
    const baseClasses = 'w-full py-4 rounded-full font-medium text-base transition-all active:scale-95 disabled:active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer';

    const variantClasses = {
        primary: 'bg-[linear-gradient(91.18deg,#FF9BA2_0%,#FFB7B2_100%)] text-white shadow-lg shadow-pink-200',
        secondary: 'bg-white text-pink-500 border-2 border-pink-300 shadow-md',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
            {icon && <span>{icon}</span>}
            <span>{text}</span>
        </button>
    );
}
