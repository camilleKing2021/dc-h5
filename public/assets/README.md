# 资源目录说明

此目录包含 H5 项目所需的所有静态资源。

## 目录结构

```
assets/
├── bg/                     # 背景图片
│   └── main-bg.png         # 主背景图（已存在）
├── icons/                  # 图标资源
│   ├── upload.png          # 上传图标
│   ├── star.png            # 星星装饰
│   ├── dot.png             # 圆点装饰
│   └── sparkle.png         # 闪光装饰
└── mock/                   # Mock 测试图片
    ├── cartoon.jpg         # 卡通效果图
    └── pixel.jpg           # 像素效果图
```

## 使用方式

在组件或页面中引用资源时，请使用绝对路径：

```tsx
// 背景图
<div className="bg-[url('/assets/bg/main-bg.png')]" />

// 图标
<Image src="/assets/icons/upload.png" alt="上传" />

// Mock 图片
<Image src="/assets/mock/cartoon.jpg" alt="卡通效果" />
```

## 注意事项

1. **不要使用相对路径**：始终使用 `/assets/...` 格式
2. **图片命名**：使用小写字母和连字符
3. **图片格式**：
   - 背景图：PNG（支持透明）
   - 图标：PNG（推荐 SVG）
   - Mock 图：JPG/PNG
4. **图片优化**：上传前请压缩图片以提升加载速度

## 替换 Mock 图片

当前使用的 mock 图片需要替换为实际的测试图片：

1. 准备两张测试图片（卡通效果和像素效果）
2. 重命名为 `cartoon.jpg` 和 `pixel.jpg`
3. 放入 `mock/` 目录
4. 确保图片尺寸适中（建议 800x800 以下）
