import * as styles from "./Button.module.css";
import clsx from "clsx";

const s = styles as unknown as Record<string, string>;

export type ButtonVariant = "dark" | "light" | "transparent" | "pink"
export type ButtonSize = "small"|"medium"|"large"
// export type ButtonType = "button"|"submit"|"reset"


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    bordered?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
    children: React.ReactNode;
    className?: string;
}


export const Button = (
    {
  variant = "light",
  size="medium",
  bordered = false,
  disabled = false,
  type = "button",
  icon,
  children,
  onClick,
  className,
  fullWidth = false,
  ...restProps
}
: ButtonProps
) => {
    return (
        <button
      className={clsx(
        s.Button,
        s[variant],
        s[size],
        bordered && s.bordered,
        fullWidth && s.fullWidth,
        className,
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...restProps}
    >
      {children}
      {icon}
    </button>
    )
}