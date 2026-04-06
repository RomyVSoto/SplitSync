import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarGroup,
  AvatarGroupCount,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col justify-center gap-40 py-20 mx-20">
      <section className="flex flex-col gap-16 items-center">
        <div className="flex flex-col gap-4">
          <h1 className="font-manrope font-extrabold text-6xl text-center max-w-xl">
            Split expenses. <span className="text-[#3525CD]">No drama.</span>
          </h1>
          <span className="font-inter font-normal text-lg text-[#475569] text-center max-w-xl">
            Create a group, add expenses, and watch balances update in real
            time. The editorial workspace for your group finances.
          </span>
        </div>
        <span>
          <button className="bg-[#3525CD] font-inter font-medium text-white px-10 py-5 rounded-lg shadow-xl shadow-[#3525CD]/30 hover:shadow-[#3525CD]/50 hover:scale-101 transition-all cursor-pointer">
            Create a group
          </button>
        </span>
      </section>

      <section className="flex flex-col gap-8">
        <div>
          <span className="font-manrope font-semibold text-2xl">
            Active groups
          </span>
        </div>
        <div className="flex justify-between gap-6">
          <div className="w-full bg-white flex flex-col gap-8 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="font-manrope font-bold text-2xl text-[#1A1A2E]">
                European Summer &#39;24
              </span>
              <AvatarGroup className="scale-80">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+2</AvatarGroupCount>
              </AvatarGroup>
            </div>
            <span className="flex flex-col gap-1">
              <p className="font-inter font-normal text-xs text-[#64748B]">
                Total group spent
              </p>
              <p className="font-manrope font-extrabold text-2xl tracking-tight">
                $1,450.00
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
                      2 hours ago
                    </p>
                  </span>
                  <span className="flex flex-col">
                    <p className="font-inter font-base text-xs text-[#94A3B8] tracking-widest">
                      TRANSACTIONS
                    </p>
                    <p className="font-inter font-medium text-sm text-[#1A1A2E]">
                      12 expenses
                    </p>
                  </span>
                </div>
                <div className="bg-[#F5F2FF] text-[#3525CD] p-2 rounded-lg">
                  <ArrowRight />
                </div>
              </div>
            </span>
          </div>
          <div className="w-full bg-white flex flex-col gap-8 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="font-manrope font-bold text-2xl text-[#1A1A2E]">
                742 Evergreen Terrace
              </span>
              <AvatarGroup className="scale-80">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+1</AvatarGroupCount>
              </AvatarGroup>
            </div>
            <span className="flex flex-col gap-1">
              <p className="font-inter font-normal text-xs text-[#64748B]">
                Total group spent
              </p>
              <p className="font-manrope font-extrabold text-2xl tracking-tight">
                $2,840.40
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
                      5 mins ago
                    </p>
                  </span>
                  <span className="flex flex-col">
                    <p className="font-inter font-base text-xs text-[#94A3B8] tracking-widest">
                      TRANSACTIONS
                    </p>
                    <p className="font-inter font-medium text-sm text-[#1A1A2E]">
                      8 expenses
                    </p>
                  </span>
                </div>
                <div className="bg-[#F5F2FF] text-[#3525CD] p-2 rounded-lg">
                  <ArrowRight />
                </div>
              </div>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
