'use client'
import { Field } from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { FileInputIcon } from "lucide-react";


export default function InputNumbersFormSubmit({ label, isPending, formId }: { 
    label: string,
    isPending: boolean,
    formId: string }){

    return(
        <Field orientation='horizontal'>
            {/* <Button type='button' variant='outline' onClick={() => form.reset()}>
                Reset
            </Button> */}
            <Button 
                type='submit' 
                form={formId}
                disabled={isPending}
                className="justify-left px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {isPending ? `${label}.....` : label }
            <FileInputIcon />
            </Button>
        </Field>
    );
}