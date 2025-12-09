export const getBasePath = () => {
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
};

export const getAssetPath = (path: string) => {
  const basePath = getBasePath();
  // 确保 path 以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  // 移除 path 中可能已经包含的 basePath（防止重复添加）
  if (basePath && normalizedPath.startsWith(basePath)) {
    return normalizedPath;
  }
  return `${basePath}${normalizedPath}`;
};
