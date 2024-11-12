import { Background } from "@/components/background";
import { createClient } from "@/utils/supabase/server";
import { Box, Center } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { Items } from "./items";

export default async function ItemPage() {

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login");
  }

  return (
    <Box>
      <Items />
      <Background />
    </Box>
  )
}