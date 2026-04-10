import { createClient } from "@/lib/supabase/client";
import * as z from "zod";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useGroups() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const router = useRouter();

  const groupSchema = z.object({
    name: z.string().min(1, "Group name is required"),
  });

  async function fetchGroups() {
    const { data, error } = await supabase.from("groups").select("*, expenses(*)");
    if (error) throw error;
    return data;
  }

  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  const { mutate: createGroup, mutateAsync: createGroupAsync, isPending, error: createGroupError } = useMutation({
    mutationFn: async (name: string) => {
      const invite_code = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      const result = groupSchema.safeParse({ name });
      if (!result.success) throw new Error(result.error.issues[0].message);

      const { error } = await supabase
        .from("groups")
        .insert({ name, invite_code });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const { mutate: joinGroup, mutateAsync: joinGroupAsync, error: joinError, isPending: isJoining } = useMutation({
    mutationFn: async ({
      invite_code,
      name,
    }: {
      invite_code: string;
      name: string;
    }) => {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("invite_code", invite_code)
        .single();

      if (error || !data) throw new Error("Group not found");
      localStorage.setItem("userName", name);
      return data;
    },
    onSuccess: (data) => {
      router.push(`/group/${data.id}`);
    },
  });

  return {
    groupSchema,
    groups,
    joinGroup,
    joinGroupAsync,
    isLoading,
    createGroup,
    createGroupAsync,
    isPending,
    isJoining,
    joinError,
    createGroupError,
  };
}
