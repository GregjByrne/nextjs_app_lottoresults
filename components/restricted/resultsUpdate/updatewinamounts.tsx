'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { WinResultFormValues, winResultsSchema } from "@/types/adminTypes/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputNumbersFormSubmit from "@/components/restricted/resultsinput/form/formButton";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LottoCategoryName, WinCategoryName } from "@/constants/lottoCategories";
import { useActionState, useEffect, useTransition } from "react";
import { dasboardformatDate, normalizeWinEntry } from "@/utils/admin/adminAction-functions";
import { InsertWinAmountsType } from "@/types/adminTypes/winAmountTypes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateWinningAmounts, UpdateWinAmountsState } from "@/utils/adminUpdates/updatewinAmount";


export default function UpdateWinAmountInputs({ currentWinAmounts }: {
  currentWinAmounts: WinResultFormValues;
}) {

  const router = useRouter();

  const form = useForm<WinResultFormValues>({
    resolver: zodResolver(winResultsSchema),
    defaultValues: {
      lottoCat: currentWinAmounts.lottoCat,
      inputDate: new Date(currentWinAmounts.inputDate), // deterministic parse, not "current time" — safe under Cache Components
      winRows: currentWinAmounts.winRows || [],
    }
  });
  const { control, reset } = form;

  const { fields } = useFieldArray({
    control,
    name: "winRows",
  });

  // Re-sync form whenever the server re-supplies fresh props (e.g. after router.refresh())
  useEffect(() => {
    if (!currentWinAmounts) return;

    reset({
      lottoCat: currentWinAmounts.lottoCat,
      inputDate: new Date(currentWinAmounts.inputDate),
      winRows: currentWinAmounts.winRows,
    });
  }, [currentWinAmounts, reset]);

  const formatted = dasboardformatDate(currentWinAmounts.inputDate);

  const [state, formAction] = useActionState<
        UpdateWinAmountsState,
        InsertWinAmountsType
        >(updateWinningAmounts, {
        success: false,
        error: null,
    });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: WinResultFormValues) {
    const revData = normalizeWinEntry(data);
    startTransition(() => {
      formAction(revData);
    });
  }

  useEffect(() => {
    if (state.success) {
      toast.success(`Saved! Rows affected: ${state.affectedRows}`);
      router.refresh(); // re-fetches server data -> triggers the reset effect above with fresh values
    }

    if (!state.success && state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <div className="space-y-4">
      <Card className="w-full sm:mx-w-md">
        <CardHeader>
          <CardTitle>Update Winning Amounts</CardTitle>
          <CardDescription>Update Selected Winning Amounts</CardDescription>
        </CardHeader>

        <CardContent>
          <form id='updatewinamount-form-id' onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center gap-6">
              <div>
                <Controller
                  name='lottoCat'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="font-bold text-indigo-500 underline underline-offset-8 decoration-indigo-500 text-lg" htmlFor='lottoCat'>
                        {`Lottery Draw: ${LottoCategoryName[currentWinAmounts.lottoCat]}`}
                      </FieldLabel>
                      <Input
                        {...field}
                        className="no-spinner max-w-2"
                        hidden
                        type="number"
                        value={field.value ?? ""}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
              <div>
                <Controller
                  name='inputDate'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="font-bold text-indigo-500 underline underline-offset-8 decoration-indigo-500 text-lg" htmlFor='inputDate'>
                        {`Draw Date: ${formatted}`}
                      </FieldLabel>
                      <Input
                        {...field}
                        className="no-spinner max-w-2"
                        hidden
                        type="date"
                        value={field.value instanceof Date ? field.value.toISOString().slice(0, 10) : ""}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
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
                      <td className="p-2">{WinCategoryName[row.winCatId] ?? row.winCatId}</td>

                      {(["numWinners", "winAmount", "emIrishWinners", "emUkWinners", "emUkWinAmount"] as const).map((fieldName) => (
                        <td className="p-2" key={fieldName}>
                          <Controller
                            name={`winRows.${index}.${fieldName}`}
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <Input
                                  {...field}
                                  className="no-spinner"
                                  type="number"
                                  value={field.value ?? ""}
                                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                              </Field>
                            )}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <InputNumbersFormSubmit label={"Update Results"} isPending={isPending} formId="updatewinamount-form-id" />
        </CardFooter>
      </Card>
    </div>
  );
}
