import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useExpense from "@/hooks/useExpense";
import { useParams } from "next/navigation";
import { sileo } from "sileo";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpenseModal({ isOpen, onClose }: ExpenseModalProps) {
  const params = useParams();
  const groupId = params.id as string;
  const { createExpenseAsync, isPending, expenseError } = useExpense(groupId);
  const [form, setForm] = useState({
    description: "",
    amount: 0,
    category: "",
    paid_by: localStorage.getItem("userName") || "",
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md flex flex-col gap-4 bg-white rounded-xl shadow-xl py-5">
        <DialogHeader className="px-2">
          <DialogTitle className="font-manrope font-semibold text-lg text-[#1A1A2E]">
            Add a Expense
          </DialogTitle>
        </DialogHeader>

        <section className="w-full px-2">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1">
              <label className="font-manrope font-semibold text-xs tracking-widest text-[#3525CD]">
                DESCRIPTION
              </label>
              <input
                type="text"
                placeholder="e.g. Dinner at SBG"
                className="font-inter bg-[#F5F2FF] text-sm text-[#777587] px-2 py-3 rounded-md focus:outline-none focus:text-[#464555] focus:ring-1 focus:ring-[#4F46E5]"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-manrope font-semibold text-xs tracking-widest text-[#3525CD]">
                AMOUNT
              </label>
              <input
                type="text"
                placeholder="$ 0.00"
                className="font-inter bg-[#F5F2FF] text-sm text-[#777587] px-2 py-3 rounded-md focus:outline-none focus:text-[#464555] focus:ring-1 focus:ring-[#4F46E5]"
                onChange={(e) =>
                  setForm({ ...form, amount: Number(e.target.value) })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-manrope font-semibold text-xs tracking-widest text-[#3525CD]">
                CATEGORY
              </label>
              <select
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="font-inter bg-[#F5F2FF] text-sm text-[#777587] px-2 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              >
                <option value="">Select a category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-manrope font-semibold text-xs tracking-widest text-[#3525CD]">
                PAID BY
              </label>
              <input
                type="text"
                placeholder="You"
                disabled
                className="font-inter bg-[#F5F2FF] text-sm text-[#777587] px-2 py-3 rounded-md focus:outline-none focus:text-[#464555] focus:ring-1 focus:ring-[#4F46E5]"
                value={form.paid_by}
              />
            </div>

            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={onClose}
                className="font-inter font-medium text-sm text-[#3525CD] border border-[#C7C4D8]/30 rounded-md px-10 py-3 underline underline-offset-5 decoration-transparent hover:decoration-[#3525CD] hover:underline-offset-2 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full font-inter font-medium text-sm text-white bg-[#3525CD] rounded-md px-10 py-3 shadow-lg shadow-[#3525CD]/30 hover:shadow-[#3525CD]/50 transition-all cursor-pointer"
                onClick={() => {
                  sileo.promise(
                    () => createExpenseAsync({
                      category: form.category,
                      description: form.description,
                      amount: form.amount,
                      paid_by: form.paid_by,
                    }),
                    {
                      loading: { title: "Adding expense..." },
                      success: { title: "Expense added!" },
                      error: { title: "Failed to add expense", description: expenseError?.message },
                    }
                  ).then(onClose).catch(() => {});
                }}
              >
                {isPending ? "Adding..." : "Add Expense"}
              </button>
            </div>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
