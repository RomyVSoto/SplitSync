import { useState } from "react";
import { Link } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import  useGroups  from "@/hooks/useGroups";
import { sileo } from "sileo";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGroupModal({
  isOpen,
  onClose,
}: CreateGroupModalProps) {
  const { createGroupAsync, isPending } = useGroups();
  const [form, setForm] = useState({name: ""})
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md flex flex-col gap-4 bg-white rounded-xl shadow-xl py-5">
        <DialogHeader className="px-6">
          <DialogTitle className="font-manrope font-semibold text-lg text-[#1A1A2E]">
            Create a Group
          </DialogTitle>
          <DialogDescription className="font-inter font-medium text-xs text-[#464555]">
            Give your group a name to get started.
          </DialogDescription>
        </DialogHeader>

        <section className="bg-gray-400/20 p-20 mx-4 rounded-lg" />

        <section className="w-full px-5">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1">
              <label className="font-manrope font-semibold text-xs tracking-widest text-[#3525CD]">
                GROUP NAME
              </label>
              <input
                type="text"
                placeholder="e.g. Juan Dolio Roadtrip"
                className="font-inter bg-[#E2E0FC] text-sm text-[#777587] px-2 py-3 rounded-md focus:outline-none focus:text-[#464555] focus:ring-1 focus:ring-[#4F46E5]"
                onChange={(e) => setForm({...form, name: e.target.value})}
              />
            </div>

            <div className="flex gap-4 items-center bg-[#F5F2FF] p-4 rounded-xl">
              <Link className="w-5 h-5 text-[#4F46E5]" />
              <p className="font-inter text-xs text-[#464555]">
                An invite link will be generated automatically so others can join.
              </p>
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
                  sileo.promise(() => createGroupAsync(form.name), {
                    loading: { title: "Creating group..." },
                    success: { title: "Group created!" },
                    error: (err) => ({
                      title: "Failed to create group",
                      description: err instanceof Error ? err.message : undefined,
                    })
                  }).then(onClose).catch(() => {})
                }}
              >
                {isPending ? "Creating..." : "Create Group"}
              </button>
            </div>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}