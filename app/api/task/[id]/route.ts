import { NextRequest, NextResponse } from 'next/server';

// 用于跟踪每个任务的请求次数
const taskRequestCounts = new Map<string, number>();

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        // 获取当前任务的请求次数
        const currentCount = (taskRequestCounts.get(id) || 0) + 1;
        taskRequestCounts.set(id, currentCount);

        console.log(`Task ${id} - Request count: ${currentCount}`);

        // 前 3 次返回 pending
        if (currentCount < 4) {
            return NextResponse.json({
                status: 'pending',
                progress: Math.min(currentCount * 25, 75),
                message: 'AI 正在处理中...',
            });
        }

        // 第 4 次及以后返回完成状态
        return NextResponse.json({
            status: 'done',
            cartoonUrl: '/assets/mock/cartoon.svg',
            pixelUrl: '/assets/mock/pixel.svg',
            message: '生成完成',
        });
    } catch (error) {
        console.error('Task status error:', error);
        return NextResponse.json(
            { error: '获取任务状态失败' },
            { status: 500 }
        );
    }
}

// 清理过期的计数（可选）
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    taskRequestCounts.delete(id);
    return NextResponse.json({ success: true });
}
