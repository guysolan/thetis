import React, { useEffect, useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface AnimatedModalProps {
  triggerId: string;
  modalId: string;
  triggerClass?: string;
  modalClass?: string;
  footerClass?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  triggerChildren: React.ReactNode;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
}

export default function AnimatedModal({
  triggerId,
  modalId,
  triggerClass = "",
  modalClass = "",
  footerClass = "",
  size = "lg",
  variant = "default",
  triggerChildren,
  children,
  footerContent,
}: AnimatedModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const handleClickOutside = (e: MouseEvent) => {
      const dialogDimensions = dialog?.getBoundingClientRect();
      if (!dialogDimensions) return;

      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog?.close();
        document.body.style.overflow = "auto";
      }
    };

    dialog?.addEventListener("click", handleClickOutside);
    return () => dialog?.removeEventListener("click", handleClickOutside);
  }, []);

  const openModal = () => {
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    dialogRef.current?.close();
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <button
        id={triggerId}
        onClick={openModal}
        className={cn(buttonVariants({ variant, size }), triggerClass)}
      >
        {triggerChildren}
      </button>

      <dialog
        ref={dialogRef}
        id={modalId}
        className={cn(
          "min-h-[50%] max-h-[90%] max-w-[100vw] w-screen-lg md:max-w-[80vw] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm",
          modalClass,
        )}
      >
        <div className="relative flex flex-col h-full">
          <button
            className="top-4 right-4 absolute close-modal group"
            aria-label="Close modal"
            onClick={closeModal}
          >
            <X />
          </button>

          <div className="flex flex-col flex-1 p-8 md:p-10">{children}</div>

          {footerContent && (
            <div
              className={cn(
                "flex justify-end p-4 bg-gray-100 dark:bg-neutral-900",
                footerClass,
              )}
            >
              {footerContent}
            </div>
          )}
        </div>
      </dialog>

      <style jsx>{`
        dialog {
          margin: auto;
          opacity: 0;
          scale: 0.5;
          rotate: 0deg;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        dialog[open] {
          opacity: 1;
          scale: 1;
          rotate: 0deg;
        }

        dialog::backdrop {
          background: rgb(0 0 0 / 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        dialog[open]::backdrop {
          opacity: 1;
          animation: fade 0.3s ease forwards;
        }

        dialog[open] {
          animation: slide 0.3s ease forwards;
        }

        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide {
          from {
            opacity: 0;
            scale: 0.5;
            rotate: 4deg;
          }
          to {
            opacity: 1;
            scale: 1;
            rotate: 0deg;
          }
        }
      `}</style>
    </>
  );
}
