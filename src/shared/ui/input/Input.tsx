import { Typography } from "@/shared/ui/typography/Typography";
import styles from "./Input.module.css";

export type VariantProp = "default" | "underline" | "ghost";

export interface InputProps {
  name?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  variant?: VariantProp;
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  iconRight?: React.ReactNode;
  onIconClick?: () => void;
  className?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = ({
  name,
  placeholder,
  value = "",
  onChange,
  type = "text",
  error,
  variant = "default",
  maxLength,
  disabled,
  required = false,
  iconRight,
  onIconClick,
  className,
  onFocus,
  onBlur,
}: InputProps) => {
  const showCounter = typeof maxLength === "number";

  return (
    <div
      className={`${styles.wrapper} ${disabled ? styles.disabled : ""} ${className}`}
    >
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${styles[variant]} ${error ? styles.error : ""}`}
          type={type}
          placeholder={required ? `${placeholder}*` : placeholder}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          name={name}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {iconRight && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={onIconClick}
          >
            {iconRight}
          </button>
        )}
        {showCounter && (
          <div className={styles.counter}>
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      {error && (
        <Typography variant="body" textColor="red">
          {error}
        </Typography>
      )}
    </div>
  );
};
