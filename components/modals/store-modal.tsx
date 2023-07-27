"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/Modal"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name is required and at least contains 2 characters"
    }),
})

export const StoreModal = ()=>{

    const [ loading , setLoading ] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            setLoading(true);
            const response = await axios.post("api/stores", values);
            toast.success("Success");
        }catch(err){
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    const storeModal = useStoreModal();
    return(
        <Modal 
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={loading}
                                                {...field}
                                                placeholder="E-Commerce"></Input>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-start justify-end">
                                <Button 
                                    disabled={loading}
                                    variant="outline"
                                    onClick={storeModal.onClose}
                                    >Cancel
                                </Button>
                                <Button 
                                    disabled={loading}
                                    type="submit"
                                    >Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}