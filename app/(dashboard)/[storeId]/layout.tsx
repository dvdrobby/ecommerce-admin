import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
    children,
    params
}:{
    children: React.ReactNode,
    params: {
        storeId: string,
    }
}){
    const { userId } = auth();

    if(!userId){
        redirect('/login');
    }

    const store = await prismadb.stores.findFirst({
        where: {
            id: params.storeId,
            userId,
        }
    })

    if(!store){
        redirect('/');
    }

    return (
        <>
            <div>This will be a Navbar called from DashboardLayout</div>
            {children}
        </>
    )
}