import { createClient } from "@/utils/supabase/server";
import { Box, Center } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function Items() {

    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    if (!user) {
      return redirect("/login");
    }

    return (
        <Box>
            <Center>
                アイテムページ
            </Center>
        </Box>
    )
}