"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Headings } from "@/components/ui/headings"
import { Separator } from "@/components/ui/separator";
import { ColorColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface ColorClientProps {
    data: ColorColumns[]
}

export const ColorClient: React.FC<ColorClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Headings 
                    title = {`Colors (${data.length})`}
                    description="Manage color for you store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable 
                columns={columns}
                data={data}
                searchKey="name"
            />
            <Headings 
                title="API List"
                description="List of an API here"
            />
            <Separator/>
            <ApiList entityName="colors" entityIdName="colorId"/>
        </>
    )
}