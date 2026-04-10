"use client";
import { useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";

import { ArrowRight } from "lucide-react";
import CreateGroupModal from "@/components/CreateGroupModal";
import useGroups from "@/hooks/useGroups";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

export default function Home() {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const { groups } = useGroups();

  const uniqueMembers = new Set(groups?.flatMap((group) => group.expenses.map((e: { paid_by: string }) => e.paid_by))).size

  return (
    <div className="flex flex-col justify-center gap-20 lg:gap-40 py-10 md:py-20 mx-4 sm:mx-8 md:mx-12 lg:mx-20">
      <section className="flex flex-col gap-10 md:gap-16 items-center">
        <div className="flex flex-col gap-4">
          <h1 className="font-manrope font-extrabold text-4xl sm:text-5xl md:text-6xl text-center max-w-xl">
            Split expenses. <span className="text-[#3525CD]">No drama.</span>
          </h1>
          <span className="font-inter font-normal text-lg text-[#475569] text-center max-w-xl">
            Create a group, add expenses, and watch balances update in real
            time. The editorial workspace for your group finances.
          </span>
        </div>
        <button
          className="bg-[#3525CD] font-inter font-medium text-white px-10 py-5 rounded-lg shadow-xl shadow-[#3525CD]/30 hover:shadow-[#3525CD]/50 hover:scale-101 transition-all cursor-pointer"
          onClick={() => setIsGroupModalOpen(true)}
        >
          Create a group
        </button>
        <CreateGroupModal
          isOpen={isGroupModalOpen}
          onClose={() => setIsGroupModalOpen(false)}
        />
      </section>

      <section className="flex flex-col gap-8">
        <span className="font-manrope font-semibold text-2xl">
          Active groups
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {groups?.map((group) => (
            <div
              key={group.id}
              className="w-full bg-white flex flex-col gap-8 p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-manrope font-bold text-2xl text-[#3525CD]">
                  {group.name}
                </span>
                <AvatarGroup className="scale-90">
                  <AvatarGroupCount className="font-manrope font-bold text-[#3525CD]">
                    {uniqueMembers}
                  </AvatarGroupCount>
                </AvatarGroup>
              </div>
              <span className="flex flex-col gap-1">
                <p className="font-inter font-normal text-xs text-[#64748B]">
                  Total group spent
                </p>
                <p className="font-manrope font-extrabold text-2xl text-[#3525CD] tracking-tight">
                  $
                  {group.expenses.reduce((sum: number, e: { amount: string | number; }) => sum + Number(e.amount), 0)}
                </p>
              </span>
              <span className="flex flex-col gap-2">
                <Separator className="bg-gray-50" />
                <div className="flex gap-8 justify-between items-center">
                  <div className="flex gap-8">
                    <span className="flex flex-col">
                      <p className="font-inter font-base text-xs text-[#94A3B8] tracking-widest">
                        ACTIVITY
                      </p>
                      <p className="font-inter font-medium text-sm text-[#1A1A2E]">
                        {
                          group.expenses.sort(
                            (a: { created_at: string }, b: { created_at: string }) =>
                              new Date(b.created_at).getTime() -
                              new Date(a.created_at).getTime(),
                          )[0]?.created_at && formatDate(group.expenses[0].created_at)
                        }
                      </p>
                    </span>
                    <span className="flex flex-col">
                      <p className="font-inter font-base text-xs text-[#94A3B8] tracking-widest">
                        TRANSACTIONS
                      </p>
                      <p className="font-inter font-medium text-sm text-[#1A1A2E]">
                        {group.expenses.length} expenses
                      </p>
                    </span>
                  </div>
                  <Link href={`/group/${group.id}`}>
                    <div className="bg-[#F5F2FF] text-[#3525CD] p-2 rounded-lg">
                      <ArrowRight />
                    </div>
                  </Link>
                </div>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
