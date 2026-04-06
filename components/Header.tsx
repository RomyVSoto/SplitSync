import { Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#FCF8FF]/80 flex items-center justify-between px-20 py-4 shadow-md/2">
      <span className="font-manrope font-semibold text-xl tracking-tight text-[#4F46E5]">
        SplitSync
      </span>
      <span className="flex items-center gap-4">
        <div className="flex items-center gap-1 font-inter font-medium text-sm text-[#4F46E5] hover:px-4 hover:py-2 hover:rounded-lg hover:text-white hover:bg-[#4338CA] transition-all cursor-pointer">
          <Plus className="w-4 h-4" /> New group
        </div>
        <div>
          <button className="bg-[#4F46E5] hover:bg-[#4338CA] font-inter font-medium text-sm text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
            Add Expense
          </button>
        </div>
      </span>
    </header>
  );
}
