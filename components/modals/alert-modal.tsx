"use client";

import { useState, useEffect } from "react";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
    loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    const [ isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null
    }

    return (
        <Modal
            title="Are you sure?"
            description="This action cannot be undone"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 flex items-center space-x-2 justify-end w-full">
                <Button 
                    variant="outline"
                    onClick={onClose}
                    disabled={loading}
                >
                Cancel
                </Button>
                <Button
                    variant="destructive"
                    onClick={onConfirm}
                    disabled={loading}
                >
                Continue
                </Button>
            </div>
        </Modal>
    )
}