import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { orderNo, taskId, selectedType, contactPhone } = body;

        // 验证必要字段
        if (!orderNo || !taskId || !selectedType) {
            return NextResponse.json(
                { error: '缺少必要参数' },
                { status: 400 }
            );
        }

        // Mock: 提交订单
        console.log('Received submission:', {
            orderNo,
            taskId,
            selectedType,
            contactPhone,
            timestamp: new Date().toISOString(),
        });

        // 模拟延迟
        await new Promise((resolve) => setTimeout(resolve, 800));

        return NextResponse.json({
            success: true,
            message: '提交成功',
            orderId: `ORDER-${Date.now()}`,
        });
    } catch (error) {
        console.error('Submit error:', error);
        return NextResponse.json(
            { error: '提交失败' },
            { status: 500 }
        );
    }
}
