import { Modal } from "@/shared/ui/modal/Modal";
import { SignUpModal } from "@/modules/auth/components/signup-modal/SignUpModal";
import { SignInModal } from "@/modules/auth/components/signin-modal/SignInModal";
import { LogoutOutModal } from "@/modules/auth/components/logout/LogoutModal";
import { useSearchParams } from "react-router-dom";

export const AuthModals = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeModal = searchParams.get("modal");

  const closeAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    setSearchParams(params.toString());
  };

  // without preserving URL params when switching modals
  // const handleRedirectToSignUp = () => setSearchParams({ modal: "signup" });
  // const handleRedirectToSignIn = () => setSearchParams({ modal: "signin"  });

  const handleRedirectToSignUp = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "signup");
    setSearchParams(params);
  };

  const handleRedirectToSignIn = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "signin");
    setSearchParams(params);
  };

  return (
    <>
      <Modal isOpen={activeModal === "signup"} closeModal={closeAll}>
        <SignUpModal
          onRedirectToSignIn={handleRedirectToSignIn}
          onSuccess={closeAll}
        />
      </Modal>

      <Modal isOpen={activeModal === "signin"} closeModal={closeAll}>
        <SignInModal
          onRedirectToSignUp={handleRedirectToSignUp}
          onSuccess={closeAll}
        />
      </Modal>

      <Modal isOpen={activeModal === "logout"} closeModal={closeAll}>
        <LogoutOutModal onClose={closeAll} />
      </Modal>
    </>
  );
};
