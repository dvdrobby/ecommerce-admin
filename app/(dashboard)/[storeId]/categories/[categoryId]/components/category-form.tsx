"use client";

import axios from "axios";
import * as z from "zod"; 
import { Billboard, Category } from "@prisma/client";
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
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

interface CategoryFormProps {
    initialData : Category | null
    billboards: Billboard[]
}

const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1)
})

type CategoryFormValue = z.infer<typeof formSchema>;

export const CategoryForm: React.FC<CategoryFormProps> = ({initialData, billboards}) => {
    const params = useParams();
    const router = useRouter();

    const [open,setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Category" : "Add a Category";
    const description = initialData ? "Edit a category preferences" : "Add a new category";
    const toastMessage = initialData ? "Category updated." : "Category created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CategoryFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            billboardId: "",
        }
    });

    const onSubmit = async (data: CategoryFormValue)=> {
        try{
            setLoading(true);

            if(initialData){
                await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
            }else{
                await axios.post(`/api/${params.storeId}/categories`, data)
            }
                
            
                            
            router.refresh();
            router.push(`/${params.storeId}/categories`)
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
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            router.refresh();
            router.push(`/${params.storeId}/categories`);
            toast.success("Delete success");
        }catch(err){
            toast.error("Make sure you removed all categories using this Category first.")
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
                                            placeholder="Category name..."
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}                     
                        />
                        <FormField 
                            control={form.control}
                            name="billboardId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue={field.value}
                                                    placeholder="Select a billboard" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard)=> (
                                                <SelectItem key={billboard.id} value={billboard.id}>{billboard.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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