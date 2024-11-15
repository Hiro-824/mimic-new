import { Box, Heading } from "@chakra-ui/react";
import { SignUpForm } from "./sign-up-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignUpPage() {

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
        px={8}
      >
        <Box maxW="md" w="full">
          <Heading size="3xl" mb={8} textAlign="left">
            アカウント作成
          </Heading>
          <SignUpForm />
        </Box>
      </Box>
    </Box>
  )
}
