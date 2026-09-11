'use client'
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { NumericKeys, ResultFormValues } from "@/types/adminTypes/formSchema";

interface FormFieldGroupProps {
    label: string;
    labelInput: string;
    name: NumericKeys<ResultFormValues>; // "NumericKeys" -> form-schema
    control: ReturnType<typeof useForm<ResultFormValues>>['control'];
}

export default function NumsFieldGroup({
    label,
    labelInput,
    name,
    control,
}: FormFieldGroupProps){
    return(
        <div className="flex justify-center items-center w-10 md:w-15 lg:w-20">
        <Controller
            name={name}
            control={control}
            render={({field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm" htmlFor={labelInput}>
                        {label}
                    </FieldLabel>
                    <Input
                        {...field}
                        type="number"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        id={labelInput}
                        value={field.value  ?? ""}
                        aria-invalid={fieldState.invalid}
                        // Manually cast the string value to a number
                        onChange={(e) => {
                            const val = e.target.valueAsNumber;
                            field.onChange(isNaN(val) ? undefined : val)
                        }}
                    />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}

                </Field>
            )} />
        </div>
    );
}