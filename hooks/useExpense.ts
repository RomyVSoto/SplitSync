import { createClient } from "@/lib/supabase/client";
import * as z from "zod";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export default function useExpense(groupId: string) {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const expenseSchema = z.object({
    description: z.string().min(1, "Description is required"),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    category: z.string().min(1, "Category is required"),
    paid_by: z.string().min(1, "Paid by is required"),
  });

  async function fetchExpenses() {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("group_id", groupId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  const { data: expenses, isLoading: isExpensesLoading } = useQuery({
    queryKey: ["expenses", groupId],
    queryFn: fetchExpenses,
    enabled: !!groupId,
  });

  const { mutate: createExpense, isPending } = useMutation({
    mutationFn: async ({
      description,
      amount,
      category,
      paid_by,
    }: {
      description: string;
      amount: number;
      category: string;
      paid_by: string;
    }) => {
      const result = expenseSchema.safeParse({
        description,
        amount,
        category,
        paid_by,
      });
      if (!result.success) throw new Error(result.error.issues[0].message);

      const { error } = await supabase
        .from("expenses")
        .insert({
          description,
          amount,
          category,
          paid_by,
        })
        .eq("group_id", groupId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  return {
    expenseSchema,
    expenses,
    isExpensesLoading,
    isPending,
    createExpense,
  };
}
