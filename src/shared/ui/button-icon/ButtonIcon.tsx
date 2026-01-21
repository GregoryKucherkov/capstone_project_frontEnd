import clsx from "clsx";
import css from "./ButtonIcon.module.css";

export interface ButtonIconProps {
  variant: "dark" | "light" | "transparent";
  size: "small" | "medium" | "large";
  icon: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const ButtonIcon = ({
  variant,
  size,
  icon,
  disabled,
  type = "button",
  onClick,
  className,
  ...restProps
}: ButtonIconProps) => {
  return (
    <button
      className={clsx(css.ButtonIcon, css[variant], css[size], className)}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...restProps}
    >
      {icon}
    </button>
  );
};
