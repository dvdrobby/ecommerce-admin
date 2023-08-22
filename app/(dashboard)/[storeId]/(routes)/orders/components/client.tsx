"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Headings } from "@/components/ui/headings"
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
    data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {

    return (
        <>
            <Headings 
                title = {`Orders (${data.length})`}
                description="Manage orders for you store"
            />
            <Separator/>
            <DataTable 
                columns={columns}
                data={data}
                searchKey="products"
            />
        </>
    )
}