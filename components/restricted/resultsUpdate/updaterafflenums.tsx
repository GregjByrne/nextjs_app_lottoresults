'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { RaffleNumbersFormValues, raffleNumbersSchema } from "@/types/adminTypes/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputNumbersFormSubmit from  "@/components/restricted/resultsinput/form/formButton";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useTransition } from "react";
import { updateRaffleNumbersAction, UpdateRaffleNumbersState } from "@/utils/adminUpdates/updateraffleNums";
import { normalizeRaffleEntry } from "@/utils/admin/adminAction-functions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LottoCategoryName } from "@/constants/lottoCategories";

type CurrentRaffleNumbers = {
  lottoCat: number;
  inputDate: Date;
  raffleNumbers: { raffleNumber: string }[];
};

export default function UpdateRaffleNumbersInputs({ currentRaffleNumbers }: { currentRaffleNumbers: CurrentRaffleNumbers }) {
  const router = useRouter();

  const form = useForm<RaffleNumbersFormValues>({
    resolver: zodResolver(raffleNumbersSchema),
    defaultValues: {
      lottoCat: currentRaffleNumbers.lottoCat,
      inputDate: new Date(currentRaffleNumbers.inputDate),
      raffleNumbers: currentRaffleNumbers.raffleNumbers,
    },
  });
  const { reset, control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "raffleNumbers",
  });

  useEffect(() => {
    if (!currentRaffleNumbers) return;
    reset({
      lottoCat: currentRaffleNumbers.lottoCat,
      inputDate: new Date(currentRaffleNumbers.inputDate),
      raffleNumbers: currentRaffleNumbers.raffleNumbers,
    });
  }, [currentRaffleNumbers, reset]);

  const [state, formAction] = useActionState<
        UpdateRaffleNumbersState,
        { inputDate: string; lottoCatId: number; raffleRows: unknown[] }
    >(updateRaffleNumbersAction, {
        success: false,
        error: null,
    });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: RaffleNumbersFormValues) {
    const revData = normalizeRaffleEntry(data);
    startTransition(() => {
      formAction(revData);
    });
  }

  useEffect(() => {
    if (state.success) {
      toast.success(`Saved! ${state.affectedCount} raffle number(s) updated`);
      router.refresh();
    }
    if (!state.success && state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <div className="space-y-4">
      <Card className="w-full sm:mx-w-md">
        <CardHeader>
          <CardTitle>{`Update Raffle Numbers: ${LottoCategoryName[currentRaffleNumbers.lottoCat]}`}</CardTitle>
          <CardDescription>Update the raffle numbers for this draw</CardDescription>
        </CardHeader>

        <CardContent>
          <form id="updateraffle-form-id" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 items-center">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Controller
                    name={`raffleNumbers.${index}.raffleNumber`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input {...field} placeholder={`Raffle Number ${index + 1}`} className="no-spinner" />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  {fields.length > 1 && (
                    <button type="button" onClick={() => remove(index)} className="text-red-600 text-sm">
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => append({ raffleNumber: "" })} className="text-indigo-600 text-sm font-medium">
                + Add Raffle Number
              </button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <InputNumbersFormSubmit label={"Update Raffle Numbers"} isPending={isPending} formId="updateraffle-form-id" />
        </CardFooter>
      </Card>
    </div>
  );
}