import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { Navbar } from "@/components/Navbar";

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
            <Navbar/>
            {children}
        </>
    )
}