"use client";

import axios from "axios";
import * as z from "zod"; 
import { Size } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Headings } from "@/components/ui/headings";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
    Form, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormControl,
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";

interface SizeFormProps {
    initialData : Size | null
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type SizeFormValue = z.infer<typeof formSchema>;

export const SizeForm: React.FC<SizeFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();

    const [open,setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit size" : "Add a size";
    const description = initialData ? "Edit a size preferences" : "Add a new size";
    const toastMessage = initialData ? "Size updated." : "Size created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<SizeFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        }
    });

    const onSubmit = async (data: SizeFormValue)=> {
        try{
            setLoading(true);

            if(initialData){
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
            }else{
                await axios.post(`/api/${params.storeId}/sizes`, data)
            }
                
            
                            
            router.refresh();
            router.push(`/${params.storeId}/sizes`)
            toast.success(toastMessage)
        }catch(err){
            toast.error(`Something went wrong`);
        }finally{
            setLoading(false);
        }

    }

    const onDelete = async () => {
        try{
            console.log("Delete");
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh();
            router.push(`/${params.storeId}/sizes`);
            toast.success("Delete success");
        }catch(err){
            toast.error("Something went wrong")
        }finally{
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>  
            <AlertModal
                isOpen={open}
                onClose = {() => setOpen(false)}
                loading={loading}
                onConfirm = { onDelete }
            />
            <div className="flex items-center justify-between">
                <Headings 
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <Trash 
                            className="h-4 w-4"
                        />
                    </Button>
                )}
            </div>
            <Separator/>
            <Form
                {...form}
            >
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={loading}
                                            className="ml-auto" 
                                            placeholder="Size name..."
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}                     
                        />
                        <FormField 
                            control={form.control}
                            name="value"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={loading}
                                            className="ml-auto" 
                                            placeholder="Size value..."
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}                     
                        />
                    </div>
                    <Button className="ml-auto" disabled={loading} type="submit">{action}</Button>
                </form>
            </Form>
            
        </>
    )
}