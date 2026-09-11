
'use client'
import { SelectCategory } from "@/types/adminTypes/admin-db-select";
import DatePickerInput from "@/components/restricted/resultsinput/form/datepicker";
import InputNumbersCatSelect from "@/components/restricted/resultsinput/form/formSelCat";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import InputNumbersFormSubmit from "@/components/restricted/resultsinput/form/formButton";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { normalizeRaffleEntry } from "@/utils/admin/adminAction-functions";
import { RaffleNumbersFormValues, raffleNumbersSchema } from "@/types/adminTypes/formSchema";
import { Field, FieldError } from "@/components/ui/field";
import { useActionState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { insertRaffleAction, InsertRaffleNumbersState, InsertRaffleNumbersPayload } from "@/utils/admin/prismaInsertAction";
import { toast } from "sonner";

export default function RaffleNumbersTable({ lottoCategorys }: { lottoCategorys: SelectCategory[] }) {

    const form = useForm<RaffleNumbersFormValues>({
        resolver: zodResolver(raffleNumbersSchema),
        defaultValues: {
            lottoCat: undefined,
            inputDate: undefined,
            raffleNumbers: [{ raffleNumber: "" }], // one field by default
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "raffleNumbers",
    });

    const [state, formAction] = useActionState<
      InsertRaffleNumbersState,
      InsertRaffleNumbersPayload
    >(insertRaffleAction, {
      success: false,
      error: null,
    });

    function onSubmit(data: RaffleNumbersFormValues) {
      const revData = normalizeRaffleEntry(data);
      startTransition(() => {
        formAction(revData);
      });
    }

    const { reset } = form;

    useEffect(() => {
      if (state.success) {
        toast.success(`Saved! ${state.insertedCount} raffle number(s) added`);
        reset({
          lottoCat: undefined,
          inputDate: undefined,
          raffleNumbers: [{ raffleNumber: "" }], // back to one empty field, not []
        });
      }
      if (!state.success && state.error) {
        toast.error(state.error);
      }
    }, [state, reset]);

    const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-4">
      <Card className="w-full sm:mx-w-md">
        <CardHeader>
          <CardTitle>Lottery Winning Amounts</CardTitle>
          <CardDescription>
            Insert the latest Lottery Winning Amounts
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="winamount-form-id" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-start lg:flex-row gap-4 mb-10">
              <div className="max-w-64 p-2">
                <InputNumbersCatSelect<RaffleNumbersFormValues>
                  name="lottoCat"
                  control={form.control}
                  label="Select Lottery Category:"
                  description="Choose the Lottery Category."
                  options={lottoCategorys.map(c => ({
                    value: String(c.id),
                    label: c.lottoCat,
                  }))}
                />
              </div>

              <div className="p-2">
                <DatePickerInput
                  control={form.control}
                  name="inputDate"
                  label="Draw Date:"
                  placeholder="MM/DD/YYYY"
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-3 grid-rows-5 gap-4 border p-4 rounded-md">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center w-64">
                        <Controller
                            name={`raffleNumbers.${index}.raffleNumber`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <Input
                                {...field}
                                placeholder={`Raffle Number ${index + 1}`}
                                className="no-spinner"
                            />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                            )}
                        />

                        {fields.length > 1 && (
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-600 text-sm"
                            aria-label={`Remove raffle number ${index + 1}`}
                        >
                         Remove
                        </button>
                        )}
                    </div>
                    ))}
            </div>
            <div className="flex justify-end m-4">
              <Button
                type="button"
                onClick={() => append({ raffleNumber: "" })}
                className="justify-left px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
              + Add Raffle Number
            </Button>
          </div>
          </form>
        </CardContent>

        <CardFooter>
          <InputNumbersFormSubmit  label={"Submit Results"}  isPending={isPending} formId="winamount-form-id" />
        </CardFooter>
      </Card>
    </div>
  );
};