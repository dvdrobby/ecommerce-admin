"use client";

import * as z from "zod"; 
import { stores } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Headings } from "@/components/ui/headings";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";

interface SettingsFormProps {
    initialData : stores
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingsFormValue = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({initialData}) => {
    const [open,setOpen] = useState();
    const [loading, setLoading] = useState();

    const form = useForm<SettingsFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingsFormValue)=> {
        console.log(data);
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Headings 
                    title="Settings"
                    description="Manage store preferences"
                />
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={()=>{}}
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
                    
                </form>
            </Form>
        </>
    )
}