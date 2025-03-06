"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title?: string;
  description?: string;
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose?.()}>
      <DialogContent dir="auto">
        {title ? (
          <DialogTitle className="mt-8 text-start">{title}</DialogTitle>
        ) : (
          <DialogTitle className="sr-only">Dialog</DialogTitle>
        )}
        {description && (
          <DialogDescription className="text-start">{description}</DialogDescription>
        )}
        <div>{children}</div>
        <DialogClose onClick={onClose} />
      </DialogContent>
    </Dialog>
  );
};
