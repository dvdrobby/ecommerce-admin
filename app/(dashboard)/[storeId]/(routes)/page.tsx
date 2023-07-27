import prismadb from "@/lib/prismadb";

interface DashboardProps{
    params : { storeId: string}
}

const DashboardPage: React.FC<DashboardProps> = async ({ params }) => {
    const store = await prismadb.stores.findFirst({
        where: { id: params.storeId},
    })
    return (
        <div>
            Welcome to : {store?.name} 
        </div>
    )
}

export default DashboardPage;