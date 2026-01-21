import { Typography } from "@/shared/ui/typography/Typography";
import css from "./LogoutModal.module.css";
import { Button } from "@/shared/ui/button/Button";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import toast from "react-hot-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/shared/constants/messages";

export interface LogoutModalProps {
  onClose: () => void;
}

export const LogoutOutModal = ({ onClose }: LogoutModalProps) => {
  const { mutateAsync: logout, isPending } = useLogout();

  const breakpoint = useBreakpoint();
  const isMobile = ["mobile", "small-mobile"].includes(breakpoint);

  const disabled = isPending;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(DEFAULT_ERROR_MESSAGE);
      }
    }
  };

  return (
    <div className={css.container}>
      <Typography className={css.title} variant="h2">
        {isMobile ? "Log out" : "Are you logging out?"}
      </Typography>

      <Typography className={css.text} variant="body">
        You can always log back in at any time.
      </Typography>

      <Button
        className={`${css.button} ${css.buttonMB}`}
        type="button"
        variant="dark"
        size="medium"
        disabled={disabled}
        bordered
        onClick={handleLogout}
      >
        Log out
      </Button>

      <Button
        className={css.button}
        type="button"
        variant="light"
        size="medium"
        bordered
        onClick={onClose}
      >
        Cancel
      </Button>
    </div>
  );
};
