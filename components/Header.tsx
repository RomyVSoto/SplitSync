"use client";

import { MoveLeft, Plus } from "lucide-react";
import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";
import { usePathname, useParams } from "next/navigation";
import useGroups from "@/hooks/useGroups";
import Link from "next/link";

export default function Header() {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const pathName = usePathname();
  const isGroupPage = pathName.startsWith("/group");
  const { groups } = useGroups();
  const params = useParams();
  const group = groups?.find((g) => g.id === params.id);
  return (
    <header className="bg-[#FCF8FF]/80 flex items-center justify-between px-20 py-4 shadow-md/2">
      <span className="font-manrope font-semibold text-xl tracking-tight text-[#4F46E5]">
        SplitSync
      </span>
      {isGroupPage && groups && (
        <span className="flex gap-2 items-center">
          <Link href="/">
            <MoveLeft className="w-5 h-5 hover:text-[#4338CA] hover:scale-110 transition-all cursor-pointer" />
          </Link>
          {group?.name}
        </span>
      )}

      <span className="flex items-center gap-4">
        <button
          className="flex items-center gap-1 font-inter font-medium text-sm text-[#4F46E5] px-2 py-2 rounded-lg hover:text-white bg-[#4338CA]/5 hover:bg-[#4338CA] hover:scale-110 transition-all cursor-pointer"
          onClick={() => setIsGroupModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> New group
        </button>
        <CreateGroupModal
          isOpen={isGroupModalOpen}
          onClose={() => setIsGroupModalOpen(false)}
        />
        {isGroupPage && (
          <div>
            <button className="bg-[#4F46E5] hover:bg-[#4338CA] font-inter font-medium text-sm text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
              Add Expense
            </button>
          </div>
        )}
      </span>
    </header>
  );
}
