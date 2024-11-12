import { Box, Heading } from "@chakra-ui/react";
import { LoginForm } from "./login-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return redirect("/items");
  }

  return (
    <Box bg={"#F0F8FF"}>
      <Box
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="top"
        pt={24}
      >
        <Box maxW="md" w="full">
          <LoginForm />
        </Box>
      </Box>
    </Box>
  )
}