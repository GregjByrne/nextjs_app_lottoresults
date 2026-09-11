'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import InputNumbersCatSelect from "@/components/restricted/resultsinput/form/formSelCat";
import DatePickerInput from "@/components/restricted/resultsinput/form/datepicker";
import InputNumbersFormSubmit from "@/components/restricted/resultsinput/form/formButton";
import { SelectCategory } from "@/types/adminTypes/admin-db-select";
import { Controller, useForm } from "react-hook-form";
import { WinNewsFormValues, winningNewsSchema } from "@/types/adminTypes/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { normalizeNewsEntry } from "@/utils/admin/adminAction-functions";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useTransition } from "react";
import { adminInsertNewsWrapper, InsertLottoNewsState } from "@/utils/admin/prismaInsertAction";
import { toast } from "sonner";
import { Prisma } from "@/app/generated/prisma/client";


export default function WinNewsTable({ lottoCategorys }: { lottoCategorys: SelectCategory[] }) {

  const [isPending, startTransition] = useTransition();  // Set for Controls

                      /* Display Settings*/
//****************************************************************************************************
    // Form Action settings call database update query
    const [state, formAction] = useActionState<
        InsertLottoNewsState,
        Prisma.winnewsUncheckedCreateInput
        >(adminInsertNewsWrapper, {
        success: false,
        error: null,
    });
 //****************************************************************************************************
 
 //****************************************************************************************************
    // Set Form Types / Schema
    const form = useForm<WinNewsFormValues>({
    resolver: zodResolver(winningNewsSchema),
    defaultValues: {
        lottoCat: undefined,
        inputDate: undefined,
        winNews: "Testing New Inputs",
        },
    });

    const { reset } = form;

    useEffect(() => {
    form.setValue("inputDate", new Date());
    }, [form]);
//****************************************************************************************************
    

                             // Database Update Settings //
//****************************************************************************************************
    // On Submit Update -> Update DataBase
    function onSubmit(data: WinNewsFormValues) {
        const revData = normalizeNewsEntry(data);
        startTransition(() => {
            formAction(revData);
        });
    }
//****************************************************************************************************

// ******************************************************************************************************
    // onSbmit Notification of Successful update
    useEffect(() => {
        if (state.success && state) {
           toast.success(`Saved! Entry ID: ${state.insertedId}`);
                reset(); // optional
            }
        if (!state.success && state.error) {
            toast.error("Failed to save entry");
        }
    }, [state, reset]);
  // ******************************************************************************************************

    // console.log(form.formState.errors);
  return (
    <div className="space-y-4">
      <Card className="w-full sm:mx-w-md">
        <CardHeader>
          <CardTitle>Lottery Winning News</CardTitle>
          <CardDescription>
            Insert the latest Lottery Winning News
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="winnews-form-id" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-start lg:flex-row gap-4 mb-10">
              <div className="max-w-64 p-2">
                <InputNumbersCatSelect<WinNewsFormValues>
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
            <div className="flex justify-center max-w-4xl">
            <Controller
                name="winNews"
                control={form.control}
                render={({field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="winNews">
                            Insert Lottery News:
                        </FieldLabel>
                        <Textarea
                            {...field}
                            placeholder="Insert Lottrey News."
                            className="no-spinner"
                            id="winNews"
                            value={field.value  ?? ""}
                            aria-invalid={fieldState.invalid}
                        />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}

                    </Field>
            )} />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <InputNumbersFormSubmit label={"Submit Results"} isPending={isPending} formId="winnews-form-id" />
        </CardFooter>
      </Card>
    </div>
  );
};