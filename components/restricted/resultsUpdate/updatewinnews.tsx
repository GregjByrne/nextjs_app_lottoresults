'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import InputNumbersFormSubmit from "@/components/restricted/resultsinput/form/formButton";
import { dasboardformatDate, normalizeNewsEntry } from "@/utils/admin/adminAction-functions";
import { useActionState, useEffect, useTransition } from "react";
import { adminUpdateNewsWrapper, UpdateWinNewsState } from "@/utils/adminUpdates/updatewinNews";
import { WinNewsFormValues, winningNewsSchema } from "@/types/adminTypes/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LottoCategoryName } from "@/constants/lottoCategories";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CurrentWinNews = {
  lottoCatId: number;
  inputDate: Date;
  winNews: string;
};

export default function UpdateWinNewsPage({ currentWinNews }: { currentWinNews: CurrentWinNews }) {
  const formatted = dasboardformatDate(currentWinNews.inputDate);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<WinNewsFormValues>({
    resolver: zodResolver(winningNewsSchema),
    defaultValues: {
      lottoCat: currentWinNews.lottoCatId,
      inputDate: new Date(currentWinNews.inputDate),
      winNews: currentWinNews.winNews,
    }
  });
  const { reset } = form;

  useEffect(() => {
    if (!currentWinNews) return;

    reset({
      lottoCat: currentWinNews.lottoCatId,
      inputDate: new Date(currentWinNews.inputDate),
      winNews: currentWinNews.winNews,
    });
  }, [currentWinNews, reset]);

  const [state, formAction] = useActionState<
    UpdateWinNewsState,
        unknown
    >(adminUpdateNewsWrapper, {
        success: false,
        error: null,
    });

  function onSubmit(data: WinNewsFormValues) {
    const revData = normalizeNewsEntry(data);
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
          <CardTitle>Lottery Winning News</CardTitle>
          <CardDescription>Update the latest Lottery Winning News</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="updatewinnews-form-id" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center gap-6">
              <div>
                <Controller
                  name='lottoCat'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="font-bold text-indigo-500 underline underline-offset-8 decoration-indigo-500 text-lg" htmlFor='lottoCat'>
                        {`Lottery Draw: ${LottoCategoryName[currentWinNews.lottoCatId]}`}
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
                name="winNews"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="winNews">Update Lottery News:</FieldLabel>
                    <Textarea
                      {...field}
                      placeholder="Insert Lottery News."
                      className="no-spinner"
                      id="winNews"
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
          <InputNumbersFormSubmit label={"Update News"} isPending={isPending} formId="updatewinnews-form-id" />
        </CardFooter>
      </Card>
    </div>
  );
}