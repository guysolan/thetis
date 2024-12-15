"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@thetis/ui/animated-modal";
import { motion } from "framer-motion";

export function BuyModal() {
  const images = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <div className="flex justify-center items-center py-40">
      <Modal>
        <ModalTrigger className="flex justify-center bg-primary text-white group/modal-btn">
          <span className="text-center transition group-hover/modal-btn:translate-x-40 duration-500">
            Book your flight
          </span>
          <div className="z-20 absolute inset-0 flex justify-center items-center text-white transition -translate-x-40 group-hover/modal-btn:translate-x-0 duration-500">
            ✈️
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="mb-8 font-bold text-center text-lg text-neutral-600 md:text-2xl dark:text-neutral-100">
              Book your trip to{" "}
              <span className="border-gray-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 px-1 py-0.5 border rounded-md">
                Bali
              </span>{" "}
              now! ✈️
            </h4>
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <motion.div
                  key={`images-${idx}`}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="flex-shrink-0 border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 mt-4 -mr-4 p-1 border rounded-xl overflow-hidden"
                >
                  <img
                    src={image}
                    alt="bali images"
                    width="500"
                    height="500"
                    className="flex-shrink-0 rounded-lg w-20 md:w-40 h-20 md:h-40 object-cover"
                  />
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap justify-start items-start gap-x-4 gap-y-6 mx-auto py-10 max-w-sm">
              <div className="flex justify-center items-center">
                <PlaneIcon className="mr-1 w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span className="text-neutral-700 text-sm dark:text-neutral-300">
                  5 connecting flights
                </span>
              </div>
              <div className="flex justify-center items-center">
                <ElevatorIcon className="mr-1 w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span className="text-neutral-700 text-sm dark:text-neutral-300">
                  12 hotels
                </span>
              </div>
              <div className="flex justify-center items-center">
                <VacationIcon className="mr-1 w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span className="text-neutral-700 text-sm dark:text-neutral-300">
                  69 visiting spots
                </span>
              </div>
              <div className="flex justify-center items-center">
                <FoodIcon className="mr-1 w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span className="text-neutral-700 text-sm dark:text-neutral-300">
                  Good food everyday
                </span>
              </div>
              <div className="flex justify-center items-center">
                <MicIcon className="mr-1 w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span className="text-neutral-700 text-sm dark:text-neutral-300">
                  Open Mic
                </span>
              </div>
              <div className="flex justify-center items-center">
                <ParachuteIcon className="mr-1 w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span className="text-neutral-700 text-sm dark:text-neutral-300">
                  Paragliding
                </span>
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button
              type="button"
              className="border-gray-300 bg-gray-200 dark:bg-black px-2 py-1 border dark:border-black rounded-md w-28 text-black text-sm dark:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-black dark:bg-white px-2 py-1 border border-black rounded-md w-28 text-sm text-white dark:text-black"
            >
              Book Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

const PlaneIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
    </svg>
  );
};

const VacationIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
      <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
      <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
      <path d="M15 9l-3 5.196" />
      <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
    </svg>
  );
};

const ElevatorIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
      <path d="M10 10l2 -2l2 2" />
      <path d="M10 14l2 2l2 -2" />
    </svg>
  );
};

const FoodIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
    </svg>
  );
};

const MicIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
      <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
    </svg>
  );
};

const ParachuteIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M22 12a10 10 0 1 0 -20 0" />
      <path d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
      <path d="M2 12l10 10l-3.5 -10" />
      <path d="M15.5 12l-3.5 10l10 -10" />
    </svg>
  );
};

export default BuyModal;
