import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // 接收 FormData
        const formData = await request.formData();
        const image = formData.get('image') as File;
        const orderNo = formData.get('orderNo') as string;
        const width = formData.get('width') as string;
        const height = formData.get('height') as string;

        // 验证必要字段
        if (!image || !orderNo) {
            return NextResponse.json(
                { error: '缺少必要参数' },
                { status: 400 }
            );
        }

        // Mock: 生成任务 ID
        const taskId = `mock-task-${Date.now()}`;

        // 这里可以保存图片或调用实际的 AI 服务
        console.log('Received upload:', {
            orderNo,
            size: { width, height },
            imageSize: image.size,
            taskId,
        });

        // 模拟延迟
        await new Promise((resolve) => setTimeout(resolve, 500));

        return NextResponse.json({
            success: true,
            taskId,
            message: '上传成功',
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: '上传失败' },
            { status: 500 }
        );
    }
}
