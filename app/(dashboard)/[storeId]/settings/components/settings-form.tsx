"use client";

import axios from "axios";
import * as z from "zod"; 
import { stores } from "@prisma/client";
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

interface SettingsFormProps {
    initialData : stores
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingsFormValue = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();

    const [open,setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingsFormValue)=> {
        try{
            setLoading(true);
            const response = await axios.patch(`/api/stores/${params.storeId}`, data).
            catch(err => {
                throw new Error(err.response.data);
            });
                            
            router.refresh();
            toast.success("Store updated")
        }catch(err){
            toast.error(`${err}`);
        }finally{
            setLoading(false);
        }

    }

    const onDelete = async () => {
        try{
            console.log("Delete");
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh();
            toast.success("Delete success")
        }catch(err){
            console.log(err)
            toast.error("Something went wrong")
        }finally{
            setLoading(false);
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
                    title="Settings"
                    description="Manage store preferences"
                />
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
                                            placeholder="Store name"
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}                     
                        />
                    </div>
                    <Button className="ml-auto" disabled={loading} type="submit">Save Changes</Button>
                </form>
            </Form>
        </>
    )
}