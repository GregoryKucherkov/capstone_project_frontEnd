import { useState, type ReactNode, type ImgHTMLAttributes } from "react";
import placeholder from "@/assets/icons/mock-of-picture.svg";
import { normalizeImagePath } from "@/shared/utils/normalizeImagePath";

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  alt: string;
  className?: string;
  renderFallback?: () => ReactNode;
  fallbackSrc?: string;
}

const Image = ({
  src,
  alt,
  className,
  renderFallback,
  fallbackSrc = placeholder,
  ...props
}: ImageProps) => {
  const [hasError, setHasError] = useState(false);

  const isBroken = hasError || !src;

  if (isBroken) {
    if (renderFallback) return <>{renderFallback()}</>;

    return <img src={fallbackSrc} alt={alt} className={className} {...props} />;
  }

  return (
    <img
      src={normalizeImagePath(src)}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

export { Image };
