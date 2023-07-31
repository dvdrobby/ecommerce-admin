import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    { params }: { params: {storeId: string}}
){
    try{
        const { userId } = auth();
        const body = await req.json();
        const { name } = body;
        const nameIsExist = await prismadb.stores.findUnique({
            where: {
                name: name,
            }
        });

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if(!name){
            return new NextResponse("Name is required", {status: 400});
        }

        if(!params.storeId){
            return new NextResponse("Id not found", {status:400});
        }

        const store = await prismadb.stores.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        });

        if(nameIsExist){
            return new NextResponse("Name is exist",{status: 400});
        }

        return NextResponse.json(store);
    }
    catch(err){
        console.log("STORE_UPDATE", err);
        return new NextResponse("Internal Error", {status: 500});
    }
}


export async function DELETE(req: Request,
    {params}:{params:{
        storeId: string
    }}
    ){
    try{    
        const { userId } = auth();
       
        if(!userId){
            return new NextResponse("Unauthorized", { status : 401 });
        }

        if(!params.storeId){
            return new NextResponse("Store id is required", { status : 401 });
        }

        const store = await prismadb.stores.deleteMany({
            where:{
                id: params.storeId,
                userId,
            }
        });

        return NextResponse.json(store);
    }catch(err){
        console.log("STORE_DELETE", err);
        return new NextResponse("Internal Error", { status:500 });
    }
}