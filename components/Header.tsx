"use client";

import { Copy, MoveLeft, Plus } from "lucide-react";
import { useState } from "react";
import ExpenseModal from "./ExpenseModal";
import JoinGroupModal from "./JoinGroupModal";
import { usePathname, useParams } from "next/navigation";
import useGroups from "@/hooks/useGroups";
import Link from "next/link";
import { sileo } from "sileo";

export default function Header() {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
  const [isJoinGroupModalOpen, setIsJoinGroupModalOpen] =
    useState<boolean>(false);

  const [copied, setCopied] = useState(false);

  const pathName = usePathname();
  const isGroupPage = pathName.startsWith("/group");
  const { groups } = useGroups();
  const params = useParams();
  const group = groups?.find((g) => g.id === params.id);

  const userName =
    typeof window !== "undefined" ? localStorage.getItem("userName") : null;

  function handleCopy() {
    navigator.clipboard.writeText(group?.invite_code ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    sileo.success({ title: "Copied!" });
  }

  return (
    <header className="bg-[#FCF8FF]/80 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-4 shadow-md/2">
      <Link href="/">
        <span
          className="font-manrope font-semibold text-xl tracking-tight text-[#4F46E5]"
        >
          SplitSync
        </span>
      </Link>
      {isGroupPage && groups && (
        <span className="flex gap-2 items-center min-w-0">
          <Link href="/">
            <MoveLeft className="w-5 h-5 shrink-0 hover:text-[#4338CA] hover:scale-110 transition-all cursor-pointer" />
          </Link>
          <span className="truncate max-w-30 sm:max-w-xs">{group?.name}</span>
          <span className="hidden sm:inline">-</span>
          <button
            onClick={handleCopy}
            className="hidden sm:flex items-center"
          >
            <span className="flex gap-1 items-center p-1 font-manrope text-xs text-[#94A3B8] hover:text-[#3525CD] transition cursor-pointer">
              {group?.invite_code} <Copy className="w-4 h-4" />
            </span>
          </button>
          <button
            onClick={handleCopy}
            className="flex sm:hidden items-center"
            aria-label="Copy invite code"
          >
            <Copy className="w-4 h-4 text-[#94A3B8] hover:text-[#3525CD] transition cursor-pointer" />
          </button>
        </span>
      )}

      <span className="flex items-center gap-4">
        {isGroupPage ? (
          <div>
            <button
              disabled={!userName}
              className="flex items-center gap-1 bg-[#4F46E5] hover:bg-[#4338CA] font-inter font-medium text-sm text-white px-4 py-2 rounded-lg cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setIsExpenseModalOpen(true)}
            >
              <Plus className="w-4 h-4" /> Add Expense
            </button>
            <ExpenseModal
              isOpen={isExpenseModalOpen}
              onClose={() => setIsExpenseModalOpen(false)}
            />
          </div>
        ) : (
          <div>
            <button
              className="flex items-center gap-1 font-inter font-medium text-sm text-[#4F46E5] px-2 py-2 rounded-lg hover:text-white bg-[#4338CA]/5 hover:bg-[#4338CA] hover:scale-110 transition-all cursor-pointer"
              onClick={() => setIsJoinGroupModalOpen(true)}
            >
              <Plus className="w-4 h-4" /> Join group
            </button>
            <JoinGroupModal
              isOpen={isJoinGroupModalOpen}
              onClose={() => setIsJoinGroupModalOpen(false)}
            />
          </div>
        )}
      </span>
    </header>
  );
}
