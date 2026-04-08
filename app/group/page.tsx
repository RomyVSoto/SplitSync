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

const pieData = [
  { name: "Food", value: 240 },
  { name: "Transport", value: 120 },
  { name: "Entertainment", value: 80 },
  { name: "Shopping", value: 60 },
  { name: "Other", value: 40 },
];

const pieColors = {
  Food: "#4F46E5",
  Transport: "#06B6D4",
  Entertainment: "#8B5CF6",
  Shopping: "#EC4899",
  Other: "#94A3B8",
};

const total = pieData.reduce((sum, item) => sum + item.value, 0);

const dailyData = [
  { day: "Mon", total: 120 },
  { day: "Tue", total: 240 },
  { day: "Wed", total: 80 },
  { day: "Thu", total: 320 },
  { day: "Fri", total: 150 },
  { day: "Sat", total: 90 },
  { day: "Sun", total: 200 },
];

export default function Home() {
  return (
    <div className="flex gap-5 px-20 py-10">
      <div className="w-full space-y-3">
        <section className="flex gap-2 items-center">
          <h1 className="font-manrope font-extrabold text-2xl">Expenses</h1>
          <p className="font-inter font-semibold text-xs text-[#3525CD] text-center rounded-xl bg-[#3525CD]/10 px-2 py-1">
            24 Total
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <div className="w-full flex justify-between gap-20 items-center p-5 rounded-lg bg-white">
            <div className="flex gap-5">
              <div className="p-3 rounded-lg bg-[#3525CD]/10">
                <Utensils className="font-extrabold w-5 h-5 text-[#3525CD]" />
              </div>
              <div>
                <span className="font-manrope font-semibold text-lg text-[#1A1A2E]">
                  Dinner at SBG Santo Domingo
                </span>
                <span className="flex gap-2">
                  <p className="font-inter font-medium text-xs text-[#3525CD] bg-[#E8E5FF] px-1 rounded-full">
                    FOOD
                  </p>
                  <p className="font-inter font-normal text-xs text-[#94A3B8]">
                    Paid by Romy • Yesterday, 8:45 PM
                  </p>
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-manrope font-extrabold text-xl text-[#4F46E5]">
                $248.50
              </span>
              <span className="font-inter font-normal text-xs text-[#94A3B8] tracking-tight">
                Split equally (4)
              </span>
            </div>
          </div>
        </section>
      </div>
      <div className="w-1/2 space-y-5">
        <section className="flex flex-col gap-5 p-4 bg-white rounded-lg">
          <div className="flex justify-between">
            <span className="font-manrope font-extrabold text-lg text-[#1A1A2E]">
              Total Expenses
            </span>
            <span className="font-inter font-bold text-xl text-[#4F46E5]">
              $1,242.50
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-manrope font-semibold text-md text-[#1A1A2E]">
                Top Spender
              </span>
              <span className="font-inter font-semibold text-md text-[#94A3B8]">
                Juan
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-manrope font-semibold text-md text-[#1A1A2E]">
                Members
              </span>
              <span className="font-inter font-semibold text-md text-[#4F46E5] bg-[#F8F9FA] px-3 rounded-lg">
                4
              </span>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-4 p-4 bg-white rounded-lg">
          <span className="font-manrope font-bold text-lg text-[#1A1A2E]">
            Spending by Category
          </span>
          <span className="flex justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
              >
                <Label
                  value={`$${total}`}
                  position="center"
                  className="font-bold text-lg"
                />
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={pieColors[entry.name as keyof typeof pieColors]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
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
