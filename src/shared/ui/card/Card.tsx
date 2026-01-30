import css from "./Card.module.css";
import clsx from "clsx";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "green" | "pink" | "yellow" | "thick" | "small" | "default";
}

export const Card = ({
  children,
  className,
  variant = "default",
}: CardProps) => {
  return (
    <div
      className={clsx(
        css.card,
        variant !== "default" && css[variant],
        className,
      )}
    >
      {children}
    </div>
  );
};
