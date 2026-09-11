'use client'
import { normalizeLottoEntry } from "@/utils/admin/adminAction-functions";
import DatePickerInput from "@/components/restricted/resultsinput/form/datepicker";
import { formSchema, ResultFormValues } from "@/types/adminTypes/formSchema";
import InputNumbersFormSubmit from "@/components/restricted/resultsinput/form/formButton";
import InputNumbersCatSelect from "@/components/restricted/resultsinput/form/formSelCat";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectCategory } from "@/types/adminTypes/admin-db-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import NumsFieldGroup from "@/components/restricted/resultsinput/form/formFieldGroups";
import { useActionState, useCallback, useEffect, useState, useTransition } from "react";
import {
  adminDeletSelResults,
  adminUpdateActionWrapper,
  getLatestDateUpdate,
  getResultsForUpdate,
  UpdateLottoRecordState,
} from "@/utils/adminUpdates/updateActions";
import { Prisma } from "@/app/generated/prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AdminUpdateButton from "@/components/restricted/resultsUpdate/adminupdatebutton";
import { RAFFLE_ELIGIBLE_CATEGORY_IDS } from "@/constants/lottoCategories";
import { useWatch } from "react-hook-form";


export default function ListResults({ lottoCategorys }: { lottoCategorys: SelectCategory[] }) {
  const [searchCatId] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  const router = useRouter();

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

  const selectedLottoCat = useWatch({
    control: form.control,
    name: "lottoCat",
  });

  const isRaffleEligible = RAFFLE_ELIGIBLE_CATEGORY_IDS.includes(selectedLottoCat);


  // Loads results on initial page load and reloads after delete
    const reloadLatestResults = useCallback(
    async () => {
        const newDate = await getLatestDateUpdate({ searchCatId });

        if (!newDate) {
        form.reset({
            num_1: 0, num_2: 0, num_3: 0, num_4: 0, num_5: 0, num_6: 0, num_7: 0,
            winValue: 0,
            lottoCat: undefined,
            inputDate: undefined,
        });
        return;
        }

        // setLatestDate(newDate);  ← removed, no longer needed

        const sqlDate = newDate.toISOString().split("T")[0];
        const row = await getResultsForUpdate({ categories: searchCatId, date: sqlDate });

        if (!row) return;

        form.reset({
        num_1: row.num_1,
        num_2: row.num_2,
        num_3: row.num_3,
        num_4: row.num_4,
        num_5: row.num_5,
        num_6: row.num_6,
        num_7: row.num_7,
        winValue: row.winValue,
        lottoCat: Number(row.lottoCatId),
        inputDate: newDate,
        });
      setIsInitialized(true); // mark ready only after this completes
    },
    [form, searchCatId]
    );

  useEffect(() => {
    (async () => {
      await reloadLatestResults();
    })();
  }, [reloadLatestResults]);

  // onChange of category/date -> reload matching row into form
  const loadResultsForSelection = useCallback(
    async (cat: number, date: Date) => {
      // console.log("loadResultsForSelection called:", { cat, date, isInitialized });
      if (!isInitialized) return; // skip if initial load hasn't finished yet
      if (!date || isNaN(date.getTime())) return;

      const sqlDate = date.toISOString().split("T")[0];
      const row = await getResultsForUpdate({ categories: Number(cat), date: sqlDate });

      if (!row) {
        form.setValue("num_1", 0);
        form.setValue("num_2", 0);
        form.setValue("num_3", 0);
        form.setValue("num_4", 0);
        form.setValue("num_5", 0);
        form.setValue("num_6", 0);
        form.setValue("num_7", 0);
        form.setValue("winValue", 0);
        toast.error("There are no Results for the Selected Lottery Category or Date");
        return; // fixed: prevent falling through to undefined row access
      }

      form.setValue("num_1", row.num_1);
      form.setValue("num_2", row.num_2);
      form.setValue("num_3", row.num_3);
      form.setValue("num_4", row.num_4);
      form.setValue("num_5", row.num_5);
      form.setValue("num_6", row.num_6);
      form.setValue("num_7", row.num_7);
      form.setValue("winValue", row.winValue);
    },
    [form, isInitialized]
  );

  function updateWinAmounts() {
    const lottoCatId = form.getValues("lottoCat");
    const sqlDate = form.getValues("inputDate");

    if (!lottoCatId || !sqlDate || isNaN(sqlDate.getTime())) {
      toast.error("Select a category and date first");
      return;
    }

    const inputDate = sqlDate.toISOString().split("T")[0];
    router.push(`/admin/updatewinamount/${lottoCatId}?inputDate=${inputDate}`);
  }

  function updateWinNews() {
    const lottoCatId = form.getValues("lottoCat");
    const sqlDate = form.getValues("inputDate");

    if (!lottoCatId || !sqlDate || isNaN(sqlDate.getTime())) {
      toast.error("Select a category and date first");
      return;
    }

    const inputDate = sqlDate.toISOString().split("T")[0];
    router.push(`/admin/updatewinnews/${lottoCatId}?inputDate=${inputDate}`);
  }

  function updateRaffleNumbers() {
    const lottoCatId = form.getValues("lottoCat");

    if (!RAFFLE_ELIGIBLE_CATEGORY_IDS.includes(lottoCatId)) {
      toast.error("This category doesn't have raffle numbers");
      return;
    }

    const sqlDate = form.getValues("inputDate");
    if (!sqlDate || isNaN(sqlDate.getTime())) {
      toast.error("Select a date first");
      return;
    }

    const inputDate = sqlDate.toISOString().split("T")[0];
    router.push(`/admin/updaterafflenums/${lottoCatId}?inputDate=${inputDate}`);
  }

  function updateRaffleNews() {
    const lottoCatId = form.getValues("lottoCat");

    if (!RAFFLE_ELIGIBLE_CATEGORY_IDS.includes(lottoCatId)) {
      toast.error("This category doesn't have raffle news");
      return;
    }

    const sqlDate = form.getValues("inputDate");
    if (!sqlDate || isNaN(sqlDate.getTime())) {
      toast.error("Select a date first");
      return;
    }

    const inputDate = sqlDate.toISOString().split("T")[0];
    router.push(`/admin/updaterafflenews/${lottoCatId}?inputDate=${inputDate}`);
  }

  async function deleteLottorecord() {
    const lottoCat = form.getValues("lottoCat");
    const sqlDate = form.getValues("inputDate");

    if (!lottoCat || !sqlDate || isNaN(sqlDate.getTime())) {
      toast.error("Missing or invalid values");
      return;
    }

    const lottoCatId = Number(lottoCat);
    const inputDate = sqlDate.toISOString().split("T")[0];

    const t = toast.loading("Deleting records...");

    try {
      await adminDeletSelResults({ lottoCatId, inputDate });
      toast.success("All records deleted successfully", { id: t });
      await reloadLatestResults();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete records", { id: t });
    }
  }

  const [reloadCatId, setReloadCatId] = useState<number | undefined>(undefined);
  const [reloadDate, setReloadDate] = useState<Date | null>(null);

  const [state, formAction] = useActionState<
        UpdateLottoRecordState,
        Prisma.lottorecordsUncheckedCreateInput
    >(adminUpdateActionWrapper, {
        success: false,
        error: null,
    });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: z.infer<typeof formSchema>) {
    setReloadCatId(data.lottoCat);
    setReloadDate(data.inputDate);
    const revData = normalizeLottoEntry(data);
    startTransition(() => {
      formAction(revData);
    });
  }

  useEffect(() => {
    if (state.success) {
        toast.success(`Saved! ${state.affectedRows} record updated`);
        if (reloadCatId && reloadDate) {
        loadResultsForSelection(reloadCatId, reloadDate); // now passing a number
        }
    }
    if (!state.success && state.error) {
        toast.error(state.error);
    }
    }, [state, reloadCatId, reloadDate, loadResultsForSelection]);

  return (
    <div className="space-y-4">
      <Card className="w-full sm:mx-w-md">
        <CardHeader>
          <CardTitle>Lottery Results</CardTitle>
          <CardDescription>Insert the latest Lottery Numbers</CardDescription>
        </CardHeader>

        <CardContent>
          <form id='updateresults-form-id' onSubmit={form.handleSubmit(onSubmit)}>
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
                  onChange={(value) => {
                    const numericValue = Number(value);
                    form.setValue("lottoCat", numericValue);
                    const date = form.getValues("inputDate");
                    if (date) loadResultsForSelection(numericValue, date);
                  }}
                />
              </div>
              <div className="p-2">
                <DatePickerInput
                  control={form.control}
                  name="inputDate"
                  label="Draw Date:"
                  placeholder="MM/DD/YYYY"
                  onDateChange={(date) => {
                    const cat = form.getValues("lottoCat");
                    if (cat && date) loadResultsForSelection(cat, date);
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center gap-2 ">
              <NumsFieldGroup label='Num_1' labelInput='resultsFormNum_1' name='num_1' control={form.control} />
              <NumsFieldGroup label='Num_2' labelInput='resultsFormNum_2' name='num_2' control={form.control} />
              <NumsFieldGroup label='Num_3' labelInput='resultsFormNum_3' name='num_3' control={form.control} />
              <NumsFieldGroup label='Num_4' labelInput='resultsFormNum_4' name='num_4' control={form.control} />
              <NumsFieldGroup label='Num_5' labelInput='resultsFormNum_5' name='num_5' control={form.control} />
              <NumsFieldGroup label='Num_6' labelInput='resultsFormNum_6' name='num_6' control={form.control} />
              <NumsFieldGroup label='Num_7' labelInput='resultsFormNum_7' name='num_7' control={form.control} />
              <NumsFieldGroup label='Amount' labelInput='resultsFormwinValue' name='winValue' control={form.control} />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between gap-2">
            <InputNumbersFormSubmit label={"Update Results"} isPending={isPending} formId={'updateresults-form-id'} />
            <AdminUpdateButton label="Edit Win Amount" variant="edit" onClick={updateWinAmounts} />
            <AdminUpdateButton label="Edit Win News" variant="edit" onClick={updateWinNews} />
            <AdminUpdateButton label="Edit Raffle Numbers" variant="edit" onClick={updateRaffleNumbers} disabled={!isRaffleEligible} />
            <AdminUpdateButton label="Edit Raffle News" variant="edit" onClick={updateRaffleNews} disabled={!isRaffleEligible} />
            <AdminUpdateButton label="Delete Results" variant="delete" onClick={deleteLottorecord}  />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}