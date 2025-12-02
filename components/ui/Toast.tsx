/*
 * @Descripttion: 
 * @Author: zhaozheng
 * @Version: 0.0.1
 * @Date: 2025-12-02 19:15:34
 * @LastEditors: zhaozheng
 * @LastEditTime: 2025-12-02 19:39:08
 */
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
    id: number;
    content: string;
    type: ToastType;
}

interface ToastContextType {
    show: (content: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const show = useCallback((content: string, type: ToastType = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, content, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 2000);
    }, []);

    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            <style jsx global>{`
                @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-start pt-20 gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        style={{ animation: 'slideDown 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                        className="bg-[#ffc0cb] text-white px-6 py-3 rounded-3xl text-sm font-medium shadow-xl shadow-pink-200/50 backdrop-blur-md flex items-center gap-2 pointer-events-auto"
                    >
                        <span>✨</span>
                        {toast.content}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        // Fallback for when used outside provider (to avoid crash, though no toast will show)
        return { show: (content: string) => console.log('Toast:', content) };
    }
    return context;
};
