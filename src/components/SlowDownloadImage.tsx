import React, { useState } from 'react';

interface SlowDownloadImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export const SlowDownloadImage: React.FC<SlowDownloadImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#10181b] ${containerClassName}`}>
      {/* Skeleton Shimmer while downloading for the first time */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#0c1417] via-[#162329] to-[#0c1417] animate-pulse">
          <div className="w-6 h-6 border-2 border-accent/40 border-t-accent rounded-full animate-spin" />
        </div>
      )}

      {/* Actual Image with smooth progressive fade-in */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        className={`transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />

      {/* Fallback for failed loads */}
      {isError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#10181b] text-[#859398] text-xs p-2 text-center">
          <span className="text-sm mb-1">📷</span>
          <span>{alt || 'Dental Image'}</span>
        </div>
      )}
    </div>
  );
};

export default SlowDownloadImage;
