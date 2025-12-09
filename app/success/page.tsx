/*
 * @Descripttion: 
 * @Author: zhaozheng
 * @Version: 0.0.1
 * @Date: 2025-12-09 13:36:16
 * @LastEditors: zhaozheng
 * @LastEditTime: 2025-12-09 16:46:32
 */
'use client';

export default function SuccessPage() {
    return (
        <>
            {/* 全屏背景图 */}
            <div className="fixed inset-0 bg-[url('/assets/bg/main-bg.png')] bg-cover bg-center -z-10" />

            <div className="min-h-screen flex justify-center">
                <div className="text-center px-6 pt-[100px]">
                    <div className="w-20 h-20 rounded-full bg-[#FF9BA2] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-200">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h2 className="text-[18px] font-bold text-[#1E1F24] mb-2">您的商品正在加急制作中，</h2>
                    <p className="text-[18px] font-bold text-[#1E1F24]">我们会第一时间安排发货，请您耐心稍候~</p>
                </div>
            </div>
        </>
    );
}
