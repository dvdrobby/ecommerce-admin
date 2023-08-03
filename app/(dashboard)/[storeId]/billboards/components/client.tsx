"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Headings } from "@/components/ui/headings"
import { Separator } from "@/components/ui/separator";

export const BillboardClient = () => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Headings 
                    title = "Billboards (0)"
                    description="Manage billboards for you store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator/>
        </>
    )
}