"use client"
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

interface DatePickerInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  onDateChange?: (date: Date | null) => void;
}

export default function DatePickerInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  onDateChange,
}: DatePickerInputProps<T>)  {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(undefined);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync of current date from an external, non-reactive source (the clock)
    setMonth(new Date());
  }, []);

   return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // Synchronize the input display string based on the form's current value
        const displayValue = field.value ? formatDate(new Date(field.value)) : "";

        return (
          <Field className="w-48">
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id={name}
                value={displayValue} // Use the formatted value from the form state
                placeholder={placeholder}
                onChange={(e) => {
                  const raw = e.target.value;
                  const parsed = new Date(raw);

                  const safeDate = isValidDate(parsed) ? parsed : null;

                  field.onChange(safeDate);
                  onDateChange?.(safeDate);

                  if (safeDate) setMonth(safeDate);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />
              <InputGroupAddon align="inline-end">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <InputGroupButton
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Select date"
                    >
                      <CalendarIcon />
                    </InputGroupButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={field.value} // Link to form state
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(selectedDate) => {
                        field.onChange(selectedDate ?? null);
                        onDateChange?.(selectedDate ?? null);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        );
      }}
    />
  );
};