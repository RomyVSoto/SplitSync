import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useGroups from "@/hooks/useGroups";

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinGroupModal({
  isOpen,
  onClose,
}: JoinGroupModalProps) {
  const { joinGroup, isJoining, joinError } = useGroups();
  const [form, setForm] = useState({
    invite_code: "",
    name: "",
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md flex flex-col gap-10 bg-white rounded-xl shadow-xl py-5">
        <DialogHeader className="px-2 items-center">
          <DialogTitle className="font-manrope font-semibold text-xl text-[#3525CD]">
            Split Sync
          </DialogTitle>
          <DialogDescription className="font-manrope font-medium text-sm text-[#6B6B7C]">
            Enter the invite code to join a group
          </DialogDescription>
        </DialogHeader>

        <section className="w-full px-2">
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              joinGroup({ invite_code: form.invite_code, name: form.name });
            }}
          >
            <div className="flex flex-col gap-1 text-center">
              {joinError && (
                <p className="text-red-500 text-xs">{joinError.message}</p>
              )}
              <label className="font-manrope font-semibold text-xs tracking-widest text-[#3525CD]">
                INVITE CODE
              </label>
              <input
                type="text"
                placeholder="e.g. ABC123"
                className="font-inter bg-[#F5F2FF] text-sm text-[#777587] px-2 py-3 rounded-md focus:outline-none focus:text-[#464555] focus:ring-1 focus:ring-[#4F46E5]"
                onChange={(e) =>
                  setForm({ ...form, invite_code: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-manrope font-semibold text-xs tracking-widest text-[#3525CD]">
                NAME
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className="font-inter bg-[#F5F2FF] text-sm text-[#777587] px-2 py-3 rounded-md focus:outline-none focus:text-[#464555] focus:ring-1 focus:ring-[#4F46E5]"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
              >
                {isJoining ? "Joining..." : "Join Group"}
              </button>
            </div>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
