import { create } from 'zustand';

interface AppState {
    // 订单信息
    orderNo: string;
    customSize: { width: number; height: number };
    contactPhone: string;

    // 图片相关
    originalFile: File | null;
    previewUrl: string | null;
    croppedImage: Blob | null;

    // 生成结果
    taskId: string | null;
    cartoonUrl: string | null;
    pixelUrl: string | null;
    selectedType: 'cartoon' | 'pixel' | null;

    // Actions
    setOrderInfo: (orderNo: string, customSize: { width: number; height: number }, contactPhone: string) => void;
    setOriginalFile: (file: File | null) => void;
    setPreviewUrl: (url: string | null) => void;
    setCroppedImage: (blob: Blob | null) => void;
    setTaskId: (id: string | null) => void;
    setGeneratedUrls: (cartoonUrl: string, pixelUrl: string) => void;
    setSelectedType: (type: 'cartoon' | 'pixel' | null) => void;
    reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    // Initial state
    orderNo: '202511812346789',
    customSize: { width: 80, height: 60 },
    contactPhone: '18772906736',

    originalFile: null,
    previewUrl: null,
    croppedImage: null,

    taskId: null,
    cartoonUrl: null,
    pixelUrl: null,
    selectedType: null,

    // Actions
    setOrderInfo: (orderNo, customSize, contactPhone) =>
        set({ orderNo, customSize, contactPhone }),

    setOriginalFile: (file) => set({ originalFile: file }),

    setPreviewUrl: (url) => set({ previewUrl: url }),

    setCroppedImage: (blob) => set({ croppedImage: blob }),

    setTaskId: (id) => set({ taskId: id }),

    setGeneratedUrls: (cartoonUrl, pixelUrl) =>
        set({ cartoonUrl, pixelUrl }),

    setSelectedType: (type) => set({ selectedType: type }),

    reset: () => set({
        originalFile: null,
        previewUrl: null,
        croppedImage: null,
        taskId: null,
        cartoonUrl: null,
        pixelUrl: null,
        selectedType: null,
    }),
}));
