# 🚀 快速启动指南

## 1. 验证依赖安装

所有必要的依赖已安装：
```bash
✅ antd-mobile (5.41.1)
✅ zustand (5.0.9)
✅ swr (2.3.7)
✅ react-easy-crop (5.6.6)
```

## 2. 启动开发服务器

```bash
pnpm dev
```

服务器将在 `http://localhost:3000` 启动。

## 3. 访问页面

### 主要页面路由：
- **上传页面**: http://localhost:3000/upload
- **裁剪页面**: http://localhost:3000/crop (需要先上传图片)
- **生成页面**: http://localhost:3000/generate (需要先裁剪图片)

### 完整流程测试：
1. 访问 `/upload`
2. 点击上传框选择一张照片
3. 点击"继续"按钮
4. 在裁剪页面调整裁剪区域
5. 点击"完成裁剪"
6. 等待 AI 生成效果图（约 8 秒）
7. 选择卡通或像素效果
8. 点击"选择完成，开始制作"

## 4. 文件结构概览

```
✅ store/useAppStore.ts           - Zustand 状态管理
✅ components/
   ├── UploadBox.tsx              - 上传组件
   ├── CropperView.tsx            - 裁剪组件
   ├── ImagePreview.tsx           - 预览组件
   ├── ResultSelector.tsx         - 效果选择组件
   └── BottomButton.tsx           - 按钮组件
✅ app/upload/page.tsx            - 上传页面
✅ app/crop/page.tsx              - 裁剪页面
✅ app/generate/page.tsx          - 生成页面
✅ app/api/upload/route.ts        - 上传 API
✅ app/api/task/[id]/route.ts     - 任务状态 API
✅ app/api/submit/route.ts        - 提交 API
✅ public/assets/                 - 静态资源目录
```

## 5. Mock 数据说明

### API Mock 行为：

#### `/api/upload`
- 接收图片并返回 `taskId`
- 延迟：500ms

#### `/api/task/[id]`
- 前 3 次请求：返回 `status: 'pending'`
- 第 4 次及以后：返回 `status: 'done'` 及图片 URL
- SWR 轮询间隔：2 秒

#### `/api/submit`
- 接收选择并返回成功
- 延迟：800ms

## 6. 常见问题

### Q: 页面显示空白？
A: 确保访问 `/upload` 而不是 `/`（首页是默认的 Next.js 页面）

### Q: 图片不显示？
A: 检查 `public/assets/mock/` 目录下是否有 `cartoon.svg` 和 `pixel.svg`

### Q: 裁剪器不工作？
A: 确保先在上传页面选择了图片

### Q: TypeScript 报错？
A: 运行 `pnpm install` 确保所有类型定义已安装

### Q: 样式不生效？
A: 检查 TailwindCSS 配置，确保 `app/globals.css` 中有 `@import "tailwindcss"`

## 7. 下一步

### 替换 Mock 图片
将真实的测试图片放入 `public/assets/mock/` 目录：
```bash
public/assets/mock/
├── cartoon.jpg  # 替换 cartoon.svg
└── pixel.jpg    # 替换 pixel.svg
```

然后更新 `app/api/task/[id]/route.ts` 中的文件扩展名。

### 添加图标
将图标文件放入 `public/assets/icons/` 目录，并在组件中引用：
```tsx
<Image src="./assets/icons/star.png" alt="星星" width={24} height={24} />
```

### 连接真实 API
修改 API 路由文件，替换 Mock 逻辑为真实的后端调用。

## 8. 移动端测试

### 使用 Chrome DevTools
1. 打开 Chrome DevTools (F12)
2. 点击设备工具栏图标（Ctrl+Shift+M）
3. 选择移动设备（如 iPhone 12 Pro）
4. 测试触摸、滑动、缩放等操作

### 使用真实设备
1. 确保电脑和手机在同一网络
2. 找到电脑的 IP 地址
3. 在手机浏览器访问 `http://[电脑IP]:3000/upload`

## 9. 性能优化建议

- ✅ 使用 `next/image` 优化图片加载
- ✅ 使用 `'use client'` 标记客户端组件
- ⚠️ 考虑添加图片压缩（如 sharp）
- ⚠️ 考虑添加离线支持（PWA）
- ⚠️ 考虑添加错误边界

## 10. 部署

### Vercel（推荐）
```bash
pnpm build
vercel --prod
```

### 自定义服务器
```bash
pnpm build
pnpm start
```

---

**提示**: 如果遇到问题，请查看控制台日志和 Network 面板。
