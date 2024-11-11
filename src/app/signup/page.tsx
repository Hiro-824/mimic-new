import { Box, Heading } from "@chakra-ui/react";
import { SignUpForm } from "./sign-up-form";

export default function LoginPage() {
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
          <Heading size="3xl" mb={8} textAlign="left">
            アカウント作成
          </Heading>
          <SignUpForm />
        </Box>
      </Box>
    </Box>
  )
}
