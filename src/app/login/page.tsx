import { Box, Heading } from "@chakra-ui/react";
import { login, signup } from "./actions";
import { LoginForm } from "./login-form";

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
            ログイン
          </Heading>
          <LoginForm />
        </Box>
      </Box>
    </Box>
  )
}