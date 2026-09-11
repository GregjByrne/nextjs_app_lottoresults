'use client'

import { SelectCategory } from "@/types/adminTypes/admin-db-select";
import DatePickerInput from "@/components/restricted/resultsinput/form/datepicker";
import InputNumbersCatSelect from "@/components/restricted/resultsinput/form/formSelCat";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import InputNumbersFormSubmit from "@/components/restricted/resultsinput/form/formButton";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { WIN_CAT_MAP } from "@/constants/lottoLookups";
import { WinCategoryName } from "@/constants/lottoCategories";
import { InsertWinAmountsType } from "@/types/adminTypes/winAmountTypes";
import {InsertWinAmountsState} from "@/utils/admin/prismaInsertAction";
import { normalizeWinEntry } from "@/utils/admin/adminAction-functions";
import { toast } from "sonner";
import { Field, FieldError } from "@/components/ui/field";
import { insertWinningAmounts } from "@/utils/admin/prismaInsertAction";
import { WinResultFormValues, winResultsSchema } from "@/types/adminTypes/formSchema";

export default function WinningAmountTable({ lottoCategorys }: { lottoCategorys: SelectCategory[] }) {

// ****************************************************************************************************
    // Set Form Types / Schema
  const form = useForm<WinResultFormValues>({
    resolver: zodResolver(winResultsSchema),
    defaultValues: {
      lottoCat: undefined,
      inputDate: undefined,
      winRows: [], // RHF will fill this when lottoCat changes
    }
  });
// ****************************************************************************************************

// ****************************************************************************************************
  // Set form controls 
  const { control, reset } = form;
// ****************************************************************************************************

// ****************************************************************************************************
  // Watch for Lotto Category change
  const lottoCat = useWatch({
    control,
    name: "lottoCat",
  });
// ****************************************************************************************************

// ****************************************************************************************************
  // Set forminput fields
  useEffect(() => {
    if (!lottoCat) return;

    const winCatIds = WIN_CAT_MAP[lottoCat];
    if (!winCatIds) return;

    const newRows = winCatIds.map((id) => ({
      winCatId: id,
      numWinners: undefined,
      winAmount: undefined,
      emIrishWinners: undefined,
      emUkWinners: undefined,
      emUkWinAmount: undefined,
    }));

    reset({
      ...form.getValues(),
      winRows: newRows,
    });
  }, [lottoCat, reset, form]);
// ****************************************************************************************************

  // **************************************************************************************************
  // Set form action controls
  const [state, formAction] = useActionState<
    InsertWinAmountsState,
    InsertWinAmountsType
    >(insertWinningAmounts, {
    success: false,
    error: null,
  });
    
// ****************************************************************************************************

  // **************************************************************************************************
    // Form Action for `onSubmit` update query rendering control
  const [isPending, startTransition] = useTransition();
// ****************************************************************************************************

// ****************************************************************************************************
    // Form submit Insert Winners / Winning Amounts
  function onSubmit(data: WinResultFormValues) {
    const revData = normalizeWinEntry(data);
    startTransition(() => {
        formAction(revData);
    });
}
// ****************************************************************************************************

// ****************************************************************************************************
    // Check database insert return success message
  useEffect(() => {
      if (state.success && state) {
        toast.success(`Saved! Entry ID: ${state}`);
        reset(); 
      }

      if (!state.success && state.error) {
        toast.error("Failed to save entry");
      }
  }, [state, reset]);


  const { fields } = useFieldArray({
    control: form.control,
    name: "winRows",
  });
// ****************************************************************************************************

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
                <InputNumbersCatSelect<WinResultFormValues>
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

            <div className="flex justify-center gap-2">
              <table className="table-auto md:table-fixed max-w-4xl text-center">
                <thead>
                  <tr className="text-sm text-center">
                    <th className="p-2 min-h-12 max-w-24">Category</th>
                    <th className="p-2 min-h-12">Winners</th>
                    <th className="p-2 min-h-12">Win Amount</th>
                    <th className="p-2 min-h-12">Irish EM Winners</th>
                    <th className="p-2 min-h-12">UK EM Winners</th>
                    <th className="p-2 min-h-12">UK EM Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {fields.map((row, index) => (
                    <tr key={row.id} className="border-b text-sm text-center">
                      <td className="p-2">
                        {WinCategoryName[row.winCatId] ?? row.winCatId}
                      </td>

                      <td className="p-2">
                        <Controller
                          name={`winRows.${index}.numWinners`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <Input
                                {...field}
                                className="no-spinner"
                                type="number"
                                value={field.value  ?? ""}
                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                              />
                              {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </td>

                      <td className="p-2">
                        <Controller
                          name={`winRows.${index}.winAmount`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <Input
                                {...field}
                                className="no-spinner"
                                type="number"
                                value={field.value  ?? ""}
                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                              />
                              {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </td>

                      <td className="p-2">
                        <Controller
                          name={`winRows.${index}.emIrishWinners`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <Input
                                {...field}
                                className="no-spinner"
                                type="number"
                                value={field.value  ?? ""}
                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                              />
                              {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                          )}
                        />
                      </td>

                      <td className="p-2">
                        <Controller
                          name={`winRows.${index}.emUkWinners`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <Input
                                {...field}
                                className="no-spinner"
                                type="number"
                                value={field.value  ?? ""}
                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                              />
                              {fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </td>

                      <td className="p-2">
                        <Controller
                          name={`winRows.${index}.emUkWinAmount`}
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <Input
                                {...field}
                                className="no-spinner"
                                type="number"
                                value={field.value  ?? ""}
                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                              />
                              {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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