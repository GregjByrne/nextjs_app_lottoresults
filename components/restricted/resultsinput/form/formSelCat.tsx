'use client'
import { Field, FieldDescription, FieldError, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  description?: string;
  options: SelectOption[];
  onChange?: (value: string) => void; // optional
}

export default function InputNumbersCatSelect<T extends FieldValues>({
  name,
  control,
  label,
  description,
  options,
  onChange,
}: SelectFieldProps<T>){

    return(
        <div className="text-black">
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}
>                       {label}
                    </FieldLabel>
                    <Select
                        name={field.name}
                        value={field.value !== undefined ? String(field.value) : undefined}
                         onValueChange={(value) => {
                             if (!value) return; // ignore Radix's internal bubble-sync events (empty value)
                            const numericValue = Number(value);
                            field.onChange(numericValue);
                            onChange?.(value);
                        }}
                    >
                    <SelectTrigger
                    id={name}
                    aria-invalid={fieldState.invalid}
                    className="w-45"
                    >
                    <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="text-black">
                    {options.map((opt) => (
                        <SelectItem 
                            className="text-black" 
                            key={opt.value} 
                            value={opt.value}
                        >
                            {opt.label}
                        </SelectItem>
                    ))}
                    </SelectContent>
                    </Select>
                    {description && <FieldDescription>{description}</FieldDescription>}

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                    </Field>
                )}
                />
            <FieldSeparator />
        </div>
    );

};