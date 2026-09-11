'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NumsFieldGroup from "@/components/restricted/resultsinput/form/formFieldGroups";
import { formSchema, ResultFormValues } from "@/types/adminTypes/formSchema";
import InputNumbersFormSubmit from "@/components/restricted/resultsinput/form/formButton";
import { SelectCategory } from "@/types/adminTypes/admin-db-select";
import InputNumbersCatSelect from "@/components/restricted/resultsinput/form/formSelCat";
import DatePickerInput from "@/components/restricted/resultsinput/form/datepicker";
import { adminInsertActionWrapper, InsertLottoNumsState } from "@/utils/admin/prismaInsertAction";
import { useActionState , useEffect, useTransition } from "react";
import { toast } from "sonner";
import { normalizeLottoEntry } from "@/utils/admin/adminAction-functions";
import PublishButton from "@/components/restricted/resultsUpdate/publishButton";


import { Prisma } from "@/app/generated/prisma/client"; // adjust to your actual output path

export default function ResultForm({lottoCategorys}: {lottoCategorys: SelectCategory[]}){

 const [isPending, startTransition] = useTransition(); // Setting form transition controls

// **************************************************************************************************

    const [state, formAction] = useActionState<
        InsertLottoNumsState,
        Prisma.lottorecordsUncheckedCreateInput
        >(adminInsertActionWrapper, {
        success: false,
        error: null,
    });

// **************************************************************************************************

// **************************************************************************************************
    // Setting form defaults 
    const form = useForm<ResultFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            num_1: undefined,
            num_2: undefined,
            num_3: undefined,
            num_4: undefined,
            num_5: undefined,
            num_6: undefined,
            num_7: undefined,
            winValue: undefined,
            lottoCat: undefined,
            inputDate: undefined,
        }
    });
    const { reset } = form; // Import form reset function

    useEffect(() => {
        form.setValue("inputDate", new Date());
    }, [form]);
// **************************************************************************************************

// console.log(form.formState.errors);

// **************************************************************************************************
    // onSubmit function -> insert latest lotto results
    function onSubmit(data: z.infer<typeof formSchema>) {
        const revData: Prisma.lottorecordsUncheckedCreateInput = normalizeLottoEntry(data);
        startTransition(() => {
            formAction(revData);
        });
    }
// **************************************************************************************************

// **************************************************************************************************
    // Check lotto results insert query Success
    useEffect(() => {
        if (state.success && state) {
           toast.success(`Saved! Entry ID: ${state.insertedId}`);
                reset(); // optional
            }
        if (!state.success && state.error) {
            toast.error("Failed to save entry");
        }
    }, [state, reset]);
// **************************************************************************************************

    return(
        <div className="space-y-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            <Card className="w-full sm:mx-w-md">
                <CardHeader>
                    <CardTitle>Lottery Results</CardTitle>
                    <CardDescription>
                        Insert the latest Lottery Numbers
                     </CardDescription>
                </CardHeader>
                
                <CardContent>
                    <form id='results-form-id' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col justify-start lg:flex-row gap-4 mb-10">
                            <div className="max-w-64 p-2">
                            <InputNumbersCatSelect<ResultFormValues>
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
                        <div className="flex flex-col justify-center gap-2 md:flex-row md:items-center">
                            <NumsFieldGroup
                                label='Num_1'
                                labelInput='resultsFormNum_1'
                                name='num_1'
                                control={form.control}                                
                            />
                            <NumsFieldGroup
                                label='Num_2'
                                labelInput='resultsFormNum_2'
                                name='num_2'
                                control={form.control}                                
                            />
                            <NumsFieldGroup
                                label='Num_3'
                                labelInput='resultsFormNum_3'
                                name='num_3'
                                control={form.control}                                
                            />
                            <NumsFieldGroup
                                label='Num_4'
                                labelInput='resultsFormNum_4'
                                name='num_4'
                                control={form.control}                                
                            />
                            <NumsFieldGroup
                                label='Num_5'
                                labelInput='resultsFormNum_5'
                                name='num_5'
                                control={form.control}                                
                            />
                            <NumsFieldGroup
                                label='Num_6'
                                labelInput='resultsFormNum_6'
                                name='num_6'
                                control={form.control}                                
                            />
                            <NumsFieldGroup
                                label='Num_7'
                                labelInput='resultsFormNum_7'
                                name='num_7'
                                control={form.control}                                
                            />
                            <NumsFieldGroup
                                label='Amount'
                                labelInput='resultsFormwinValue'
                                name='winValue'
                                control={form.control}                                
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full justify-content">
                        <InputNumbersFormSubmit label={"Submit Results"} isPending={isPending} formId={'results-form-id'} />
                        <PublishButton />
                   </div>
                </CardFooter>
            </Card>
        </div>
    );
};