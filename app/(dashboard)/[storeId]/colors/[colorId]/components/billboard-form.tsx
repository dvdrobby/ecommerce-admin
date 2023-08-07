"use client";

import axios from "axios";
import * as z from "zod"; 
import { Color } from "@prisma/client";
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

interface ColorFormProps {
    initialData : Color | null
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/, {
        message: "Enter a valid hex code"
    })
})

type ColorFormValue = z.infer<typeof formSchema>;

export const ColorForm: React.FC<ColorFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();

    const [open,setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Color" : "Add a Color";
    const description = initialData ? "Edit a color preferences" : "Add a new color";
    const toastMessage = initialData ? "Color updated." : "Color created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ColorFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        }
    });

    const onSubmit = async (data: ColorFormValue)=> {
        try{
            setLoading(true);

            if(initialData){
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
            }else{
                await axios.post(`/api/${params.storeId}/colors`, data)
            }
                
            
                            
            router.refresh();
            router.push(`/${params.storeId}/colors`)
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
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            router.refresh();
            router.push(`/${params.storeId}/colors`);
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
                                            
                                            placeholder="Color name..."
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
                                        <div className="flex items-center space-x-4">
                                            <Input 
                                                disabled={loading}
                                                
                                                placeholder="Color value..."
                                                {...field}/>
                                            <div className="rounded-md p-4 border" style={{backgroundColor:field.value}}/>
                                        </div>
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