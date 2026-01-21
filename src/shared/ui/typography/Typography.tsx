import clsx from "clsx";
import * as styles from "./Typography.module.css";

const css = styles as unknown as Record<string, string>;

export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "body" | "bodyS";
export type TypographyColor = "black" | "gray" | "white" | "red";

export interface TypographyProps {
  variant?: TypographyVariant;
  textColor?: TypographyColor;
  truncate?: boolean;
  lineClamp?: number;
  children: React.ReactNode;
  className?: string;
}

const tagMap: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  bodyS: "p",
};

const Typography = ({
  variant = "body",
  children,
  truncate,
  lineClamp,
  className,
  textColor = "black",
}: TypographyProps) => {
  const Tag = tagMap[variant] || "p";

  return (
    <Tag
      className={clsx(
        css.Typography,
        css[variant],
        css[textColor],
        truncate && css.truncate,
        lineClamp && css.lineClamp,
        className,
      )}
      style={
        lineClamp
          ? ({ "--Typography-line-clamp": lineClamp } as React.CSSProperties)
          : {}
      }
    >
      {children}
    </Tag>
  );
};

export interface TypographyErrorProps {
  children: React.ReactNode;
}

const TypographyError = ({ children }: TypographyErrorProps) => {
  return (
    <Typography variant="bodyS" textColor="red" className={css.TypographyError}>
      {children}
    </Typography>
  );
};

export { Typography, TypographyError };
