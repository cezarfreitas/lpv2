import React from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  quality?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
  sizes = "100vw",
  quality = 80,
}) => {
  const basePath = src.replace(/\.(webp|jpg|jpeg|png)$/, "");
  const extension = src.match(/\.(webp|jpg|jpeg|png)$/)?.[1] || "webp";

  // Generate responsive image URLs
  const generateSrcSet = (basePath: string, extension: string) => {
    const widths = [320, 640, 768, 1024, 1280, 1920];
    return widths
      .map((width) => `${basePath}-${width}w.${extension} ${width}w`)
      .join(", ");
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      sizes={sizes}
      // Note: srcSet would require multiple image sizes to be generated
      // For now, we'll use the single optimized image
    />
  );
};

export default OptimizedImage;
