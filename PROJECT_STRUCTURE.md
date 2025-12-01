# 🎨 DC-H5 项目结构说明

基于 Next.js 16 + TailwindCSS 4 的移动端 H5 定制照片生成应用。

## 📦 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS v4
- **UI 组件**: Ant Design Mobile
- **状态管理**: Zustand
- **数据获取**: SWR
- **图片裁剪**: react-easy-crop

## 📁 项目结构

```
dc-h5/
├── app/                          # Next.js App Router
│   ├── upload/                   # 上传页面
│   │   └── page.tsx
│   ├── crop/                     # 裁剪页面
│   │   └── page.tsx
│   ├── generate/                 # 生成结果页面
│   │   └── page.tsx
│   ├── api/                      # API 路由 (Mock)
│   │   ├── upload/
│   │   │   └── route.ts          # 上传接口
│   │   ├── task/[id]/
│   │   │   └── route.ts          # 任务状态查询
│   │   └── submit/
│   │       └── route.ts          # 提交选择
│   ├── layout.tsx                # 根布局 (已存在)
│   ├── page.tsx                  # 首页 (已存在)
│   └── globals.css               # 全局样式 (已存在)
│
├── components/                   # 可复用组件
│   ├── UploadBox.tsx            # 上传组件
│   ├── CropperView.tsx          # 裁剪组件
│   ├── ImagePreview.tsx         # 图片预览组件
│   ├── ResultSelector.tsx       # 效果选择组件
│   └── BottomButton.tsx         # 底部按钮组件
│
├── store/                        # Zustand 状态管理
│   └── useAppStore.ts           # 全局状态
│
└── public/                       # 静态资源
    └── assets/
        ├── bg/
        │   └── main-bg.png      # 主背景图
        ├── icons/               # 图标资源 (待添加)
        │   ├── upload.png
        │   ├── star.png
        │   ├── dot.png
        │   └── sparkle.png
        └── mock/                 # Mock 测试图
            ├── cartoon.svg       # 卡通效果占位图
            └── pixel.svg         # 像素效果占位图
```

## 🔄 页面流程

```
/upload (上传页面)
    ↓ 选择照片
/crop (裁剪页面)
    ↓ 确认裁剪
/generate (生成页面)
    ↓ 上传图片
    ↓ 轮询状态 (2秒间隔)
    ↓ 显示结果
    ↓ 选择效果
    ↓ 提交完成
```

## 🎯 核心功能

### 1. 上传页面 (`/upload`)
- 显示订单信息（订单号、定制尺寸、联系方式）
- 图片上传（支持拖拽、点击选择）
- 文件验证（格式、大小限制 10MB）
- 生成预览 URL

### 2. 裁剪页面 (`/crop`)
- 基于 `react-easy-crop` 的裁剪器
- 支持拖动、双指缩放
- 根据定制尺寸自动计算裁剪比例
- 导出裁剪后的 Blob

### 3. 生成页面 (`/generate`)
- 上传裁剪后的图片到服务器
- 使用 SWR 轮询任务状态（间隔 2秒）
- 显示加载动画
- 展示卡通和像素两种效果
- 支持选择效果并提交

## 🔌 API 接口 (Mock)

### POST `/api/upload`
上传裁剪后的图片

**请求体**:
```typescript
FormData {
  image: Blob,
  orderNo: string,
  width: string,
  height: string
}
```

**响应**:
```typescript
{
  success: boolean,
  taskId: string,
  message: string
}
```

### GET `/api/task/[id]`
查询任务状态

**响应** (前3次):
```typescript
{
  status: 'pending',
  progress: number,
  message: string
}
```

**响应** (第4次及以后):
```typescript
{
  status: 'done',
  cartoonUrl: string,
  pixelUrl: string,
  message: string
}
```

### POST `/api/submit`
提交选择的效果

**请求体**:
```typescript
{
  orderNo: string,
  taskId: string,
  selectedType: 'cartoon' | 'pixel',
  contactPhone: string
}
```

**响应**:
```typescript
{
  success: boolean,
  message: string,
  orderId: string
}
```

## 🎨 UI 设计规范

### 颜色主题
- **主色**: 粉色系 (`#FF69B4`, `#FFB6C1`)
- **渐变**: `from-pink-400 to-pink-500`
- **背景**: 淡粉色 + 主背景图
- **文字**: 深灰 (`#333`), 中灰 (`#666`)

### 组件样式
- **卡片**: `rounded-3xl shadow-lg bg-white/90 backdrop-blur-sm`
- **按钮**: 粉色渐变，圆角 `rounded-full`
- **上传框**: 虚线边框 `border-dashed border-pink-300`
- **选中状态**: `ring-4 ring-pink-500`

### 动画效果
- **点击**: `active:scale-95 transition-transform`
- **悬停**: `hover:scale-105`
- **加载**: Ant Design Mobile `DotLoading`

## 🗂️ Zustand Store 状态

```typescript
{
  // 订单信息
  orderNo: string,
  customSize: { width: number, height: number },
  contactPhone: string,

  // 图片数据
  originalFile: File | null,
  previewUrl: string | null,
  croppedImage: Blob | null,

  // 生成结果
  taskId: string | null,
  cartoonUrl: string | null,
  pixelUrl: string | null,
  selectedType: 'cartoon' | 'pixel' | null,

  // Actions
  setOrderInfo(),
  setOriginalFile(),
  setPreviewUrl(),
  setCroppedImage(),
  setTaskId(),
  setGeneratedUrls(),
  setSelectedType(),
  reset()
}
```

## 🚀 运行项目

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 运行生产版本
pnpm start
```

访问 `http://localhost:3000/upload` 开始使用。

## 📝 待完成事项

- [ ] 替换 `/public/assets/mock/` 中的占位图为真实测试图
- [ ] 添加图标资源到 `/public/assets/icons/`
- [ ] 连接真实的后端 API（替换 Mock）
- [ ] 添加错误边界处理
- [ ] 添加图片压缩优化
- [ ] 添加用户引导提示
- [ ] 移动端适配测试（不同屏幕尺寸）
- [ ] 添加 PWA 支持

## 🔧 配置说明

### 路径别名
项目已配置 `@/` 别名指向根目录：

```typescript
// 使用示例
import { useAppStore } from '@/store/useAppStore';
import UploadBox from '@/components/UploadBox';
```

### TailwindCSS v4
使用 `@import "tailwindcss"` 和 `@theme inline` 语法。

### Next.js Image
所有图片使用 `next/image` 组件优化加载。

## ⚠️ 注意事项

1. **不要覆盖已有文件**: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`
2. **资源路径**: 始终使用 `/assets/...` 绝对路径
3. **TypeScript 严格模式**: 确保类型定义完整
4. **移动端优先**: 所有组件使用 mobile-first 设计
5. **性能优化**: 图片懒加载、代码分割

## 📞 联系方式

如有问题，请联系项目负责人。
