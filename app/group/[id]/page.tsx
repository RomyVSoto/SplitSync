"use client";

import { Utensils } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  Label,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import useExpense from "@/hooks/useExpense";
import { useParams } from "next/navigation";
import { Key } from "react";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const pieColors = {
  Food: "#4F46E5",
  Transport: "#06B6D4",
  Entertainment: "#8B5CF6",
  Shopping: "#EC4899",
  Other: "#94A3B8",
};

export default function GroupPage() {
  const params = useParams();
  const groupId = params.id as string;
  const { expenses, isExpensesLoading } = useExpense(groupId);

  const topSpender = expenses?.reduce(
    (acc, expense) => {
      acc[expense.paid_by] = (acc[expense.paid_by] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const topSpenderName = topSpender
  ? Object.entries(topSpender).sort((a, b) => (b[1] as number) - (a[1] as number))[0]?.[0]
  : "—";

  const uniqueMembers = new Set(expenses?.map((expense) => expense.paid_by))
    .size;

  const categoryData =
    expenses?.reduce(
      (acc, expense) => {
        const existing = acc.find((item: { name: any; }) => item.name === expense.category);
        if (existing) {
          existing.value += Number(expense.amount);
        } else {
          acc.push({ name: expense.category, value: Number(expense.amount) });
        }
        return acc;
      },
      [] as { name: string; value: number }[],
    ) ?? [];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayName = days[date.getDay()];
    const total =
      expenses
        ?.filter(
          (e) => new Date(e.created_at).toDateString() === date.toDateString(),
        )
        .reduce((sum, e) => sum + Number(e.amount), 0) ?? 0;
    return { day: dayName, total };
  });

  return (
    <div className="flex flex-col lg:flex-row gap-5 px-4 sm:px-8 md:px-12 lg:px-20 py-10">
      <div className="w-full space-y-6">
        <section className="flex gap-2 items-center">
          <h1 className="font-manrope font-extrabold text-2xl">Expenses</h1>
          <p className="font-inter font-semibold text-xs text-[#3525CD] text-center rounded-xl bg-[#3525CD]/10 px-2 py-1">
            {expenses?.length} Total
          </p>
        </section>
        <section className="flex flex-col gap-4">
          {isExpensesLoading ? (
            <div>Loading...</div>
          ) : (
            expenses?.map((expense) => (
              <div
                key={expense.id}
                className="w-full flex justify-between gap-4 sm:gap-10 md:gap-20 items-center p-4 sm:p-6 rounded-lg bg-white"
              >
                <div className="flex gap-5">
                  <div className="p-3 rounded-lg bg-[#3525CD]/10">
                    <Utensils className="font-extrabold w-5 h-5 text-[#3525CD]" />
                  </div>
                  <div>
                    <span className="font-manrope font-semibold text-lg text-[#1A1A2E]">
                      {expense.description}
                    </span>
                    <span className="flex gap-2">
                      <p className="font-inter font-medium text-xs text-[#3525CD] bg-[#E8E5FF] px-1 rounded-full">
                        {expense.category}
                      </p>
                      <p className="font-inter font-normal text-xs text-[#94A3B8]">
                        Paid by{" "}
                        {expense.paid_by === localStorage.getItem("userName")
                          ? "You"
                          : expense.paid_by}{" "}
                        • {formatDate(expense.created_at)}
                      </p>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-manrope font-extrabold text-xl text-[#4F46E5]">
                    ${expense.amount}
                  </span>
                  <span className="font-inter font-normal text-xs text-[#94A3B8] text-right tracking-tight">
                    Value
                  </span>
                </div>
              </div>
            ))
          )}
        </section>
        <section className="flex justify-center items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-inter text-xs text-[#94A3B8]">
            Live updates enabled
          </span>
        </section>
      </div>
      <div className="w-full lg:w-1/2 space-y-5">
        <section className="flex flex-col gap-5 p-4 bg-white rounded-lg">
          <div className="flex justify-between">
            <span className="font-manrope font-extrabold text-lg text-[#1A1A2E]">
              Total Expenses
            </span>
            <span className="font-inter font-bold text-xl text-[#4F46E5]">
              ${expenses?.reduce((total, expense) => total + expense.amount, 0)}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-manrope font-semibold text-md text-[#1A1A2E]">
                Top Spender
              </span>
              <span className="font-inter font-medium text-md text-[#94A3B8]">
                {topSpenderName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-manrope font-semibold text-md text-[#1A1A2E]">
                Contributors
              </span>
              <span className="font-inter font-semibold text-md text-[#4F46E5] bg-[#F8F9FA] px-3 rounded-lg">
                {uniqueMembers}
              </span>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-4 p-4 bg-white rounded-lg">
          <span className="font-manrope font-bold text-lg text-[#1A1A2E]">
            Spending by Category
          </span>
          <span className="w-full">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                >
                  <Label
                    value="Total"
                    position="center"
                    className="font-bold text-lg"
                  />
                  {categoryData.map((entry: { name: string; }, index: Key | null | undefined) => (
                    <Cell
                      key={index}
                      fill={pieColors[entry.name as keyof typeof pieColors]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </span>
        </section>
        <section className="flex flex-col gap-6 p-4 bg-white rounded-lg">
          <span className="font-manrope font-bold text-lg text-[#1A1A2E]">
            Daily Spending
          </span>
          <span>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyData}>
                <XAxis dataKey="day" />
                <Tooltip />
                <Bar dataKey="total" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </span>
        </section>
      </div>
    </div>
  );
}
