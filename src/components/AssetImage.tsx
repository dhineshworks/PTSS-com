import React, { useState } from 'react';
import { ASSETS, ASSET_FALLBACKS, AssetKey } from '@/assets';

interface AssetImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  assetKey: AssetKey;
  className?: string;
  alt?: string;
}

export const AssetImage: React.FC<AssetImageProps> = ({
  assetKey,
  className = '',
  alt = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const primarySrc = ASSETS[assetKey];
  const fallbackSrc = ASSET_FALLBACKS[assetKey];

  return (
    <img
      src={hasError ? fallbackSrc : primarySrc}
      alt={alt || assetKey}
      onError={() => {
        if (!hasError) setHasError(true);
      }}
      className={`select-none pointer-events-none object-contain ${className}`}
      loading="eager"
      {...props}
    />
  );
};
