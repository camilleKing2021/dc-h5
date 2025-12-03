'use client';

import React from 'react';
import './ConfirmModal.css';

interface ConfirmModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ visible, onConfirm, onCancel }: ConfirmModalProps) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-[80%] max-w-[320px] p-6 text-center">
                <h3 className="text-lg font-bold text-[#1E1F24] mb-4">提示</h3>

                <p className="text-[#666666] text-sm mb-8 leading-relaxed">
                    提交后X小时后，无法再进行全额退款
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 h-10 rounded-[8px] bg-[#FFF0F1] text-[#FF9BA2] text-sm font-medium"
                    >
                        取消
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 h-10 rounded-[8px] bg-[#FF9BA2] text-white text-sm font-medium"
                    >
                        确认提交
                    </button>
                </div>
            </div>
        </div>
    );
}
