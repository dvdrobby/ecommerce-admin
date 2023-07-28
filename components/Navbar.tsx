import { UserButton, auth } from "@clerk/nextjs"
import { MainNav } from "@/components/MainNav";
import { StoreSwitcher } from "@/components/StoreSwitcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export const Navbar = async () => {
    const { userId } =auth();

    if(!userId){
        redirect('/login');
    }

    const stores = await prismadb.stores.findMany({
        where: {
            userId
        }
    });

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-12">
                <StoreSwitcher items={stores}/>
                <MainNav 
                    className="mx-6"
                />
                <div className="flex ml-auto items-center space-x-4">
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </div>
    )
}

