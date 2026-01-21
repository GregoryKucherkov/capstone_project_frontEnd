import { useState, useEffect } from "react";

export type BreakpointVariant =
  | "small-mobile"
  | "mobile"
  | "tablet"
  | "desktop";

export interface UseBreakpointProps {
  desktop?: number;
  tablet?: number;
  mobile?: number;
  smallMobile?: number;
}

export const useBreakpoint = (
  props?: UseBreakpointProps,
): BreakpointVariant => {
  const { desktop = 1440, tablet = 768, mobile = 375 } = props ?? {};

  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : mobile,
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width >= desktop) return "desktop";
  if (width >= tablet) return "tablet";
  if (width >= mobile) return "mobile";

  return "small-mobile"; // < 375px (320–374)
};
