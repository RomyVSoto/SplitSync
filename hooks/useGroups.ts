import { createClient } from "@/lib/supabase/client";
import * as z from "zod";
import { useQuery, useQueryClient, useMutation, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function useGroups() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "" });

  const groupSchema = z.object({
    name: z.string().min(1, "Group name is required"),
  });

  async function fetchGroups() {
    const { data, error } = await supabase.from("groups").select("*");
    if (error) throw error;
    return data;
  }

  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });


    const { mutate: createGroup, isPending } = useMutation({
      mutationFn: async (name: string) => {
        const invite_code = Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();
          const { error } = await supabase
          .from("groups")
          .insert({name: form.name, invite_code})

          if(error) throw error
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"]})
      }
    });

  return {
    form,
    setForm,
    groupSchema,
    groups,
    isLoading,
    createGroup,
    isPending,
  };
}
