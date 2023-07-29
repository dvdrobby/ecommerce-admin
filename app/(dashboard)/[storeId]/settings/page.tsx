import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({params}) => {
    const { userId } = auth();

    if(!userId) return redirect("/login");

    const store = await prismadb.stores.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if(!store) return redirect("/");

    return (
        <div className="flex-col">
            <div className="space-y-4 p-8 pt-6 flex-1">
                <SettingsForm/>
            </div>
        </div>
    )

}

export default SettingsPage;