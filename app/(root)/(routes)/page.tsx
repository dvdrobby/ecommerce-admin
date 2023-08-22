"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

export function SetupPage() {

  const storeModal = useStoreModal();
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!storeModal.isOpen) {
      storeModal.onOpen();
    }
  }, [storeModal.isOpen, storeModal.onOpen]);
  

  return null;
}

export default SetupPage;