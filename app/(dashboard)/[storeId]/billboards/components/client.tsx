"use client";

import { Plus } from "lucide-react";
import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Headings } from "@/components/ui/headings"
import { Separator } from "@/components/ui/separator";
import { BillboardColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface BillboardClientProps {
    data: BillboardColumns[]
}

export const BillboardClient: React.FC<BillboardClientProps> = async ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Headings 
                    title = {`Billboards (${data.length})`}
                    description="Manage billboards for you store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable 
                columns={columns}
                data={data}
            />
        </>
    )
}