import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { SizeClient } from "./components/client";
import { SizeColumns } from "./components/columns";

const Sizes = async ({ params }:
    {
        params: { storeId: string }
    }) => {

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedSizes: SizeColumns[] = sizes.map( size => (
        {
            id: size.id,
            name: size.name,
            value: size.value,
            createdAt: format(size.createdAt, "MMMM do, yyyy"),
        }
    )
    )
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes}/>
            </div>
        </div>
    )
}

export default Sizes;