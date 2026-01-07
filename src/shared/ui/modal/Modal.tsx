import { useCallback, useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

import css from "./Modal.module.css";

// import CloseIcon from "@/x.svg?react";
import CloseIcon from "@/assets/icons/x.svg?react"

const modalRootRef = document.getElementById("modal-root");

export interface ModalProps {
    isOpen: boolean,
    closeModal: () => void;
    modalClassName?: string;
    children: React.ReactNode;

}

export const Modal = ({ isOpen, closeModal, modalClassName, children }: ModalProps) => {
  const handleBackdropClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) closeModal();
    },
    [closeModal],
  );

  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, closeModal]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !modalRootRef) return null;

  return createPortal(
    <div
      className={clsx(css.backdrop, isOpen && css.open)}
      onClick={handleBackdropClick}
    >
      <div className={clsx(css.content, isOpen && css.open, modalClassName)}>
        <button onClick={closeModal} className={css.close}>
          <CloseIcon className={css.closeIcon} />
        </button>
        {children}
      </div>
    </div>,
    modalRootRef,
  );
};