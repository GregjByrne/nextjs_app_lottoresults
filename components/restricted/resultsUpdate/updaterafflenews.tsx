'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import InputNumbersFormSubmit from "@/components/restricted/resultsinput/form/formButton";
import { dasboardformatDate, normalizeRaffleNewsEntry } from "@/utils/admin/adminAction-functions";
import { useActionState, useEffect, useTransition } from "react";
import { updateRaffleNewsAction, UpdateRaffleNewsState } from "@/utils/adminUpdates/updateraffleNews";
import { RaffleNewsFormValues, raffleNewsSchema } from "@/types/adminTypes/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LottoCategoryName } from "@/constants/lottoCategories";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CurrentRaffleNews = {
  lottoCatId: number;
  inputDate: Date;
  raffleNews: string;
};

export default function UpdateRaffleNewsPage({ currentRaffleNews }: { currentRaffleNews: CurrentRaffleNews }) {
  const formatted = dasboardformatDate(currentRaffleNews.inputDate);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<RaffleNewsFormValues>({
    resolver: zodResolver(raffleNewsSchema),
    defaultValues: {
      lottoCat: currentRaffleNews.lottoCatId,
      inputDate: new Date(currentRaffleNews.inputDate),
      raffleNews: currentRaffleNews.raffleNews,
    }
  });
  const { reset } = form;

  useEffect(() => {
    if (!currentRaffleNews) return;

    reset({
      lottoCat: currentRaffleNews.lottoCatId,
      inputDate: new Date(currentRaffleNews.inputDate),
      raffleNews: currentRaffleNews.raffleNews,
    });
  }, [currentRaffleNews, reset]);

  const [state, formAction] = useActionState<
        UpdateRaffleNewsState,
        unknown
    >(updateRaffleNewsAction, {
        success: false,
        error: null,
    });

  function onSubmit(data: RaffleNewsFormValues) {
    const revData = normalizeRaffleNewsEntry(data);
    startTransition(() => {
      formAction(revData);
    });
  }

  useEffect(() => {
    if (state.success) {
      toast.success(`Saved! Rows affected: ${state.affectedRows}`);
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
          <CardTitle>Raffle News</CardTitle>
          <CardDescription>Update the latest Raffle News</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="updaterafflenews-form-id" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center gap-6">
              <div>
                <Controller
                  name='lottoCat'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="font-bold text-indigo-500 underline underline-offset-8 decoration-indigo-500 text-lg" htmlFor='lottoCat'>
                        {`Lottery Draw: ${LottoCategoryName[currentRaffleNews.lottoCatId]}`}
                      </FieldLabel>
                      <Input {...field} className="no-spinner max-w-2" hidden type="number" value={field.value ?? ""} />
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
            <div className="relative mx-auto flex flex-col items-center justify-center max-w-4xl">
              <Controller
                name="raffleNews"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="raffleNews">Update Raffle News:</FieldLabel>
                    <Textarea
                      {...field}
                      placeholder="Insert Raffle News."
                      className="no-spinner"
                      id="raffleNews"
                      value={field.value ?? ""}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <InputNumbersFormSubmit label={"Update News"} isPending={isPending} formId="updaterafflenews-form-id" />
        </CardFooter>
      </Card>
    </div>
  );
}