"use client"

import { Box, Center, Link, Stack, Text } from "@chakra-ui/react"

export const SignUpForm = () => {

    return (
        <Box
            bg="white"
            p={8}
            rounded="md"
            as={"form"}
        >
            <Stack gap="4" maxW="sm">
                <Center>
                    <Text>新規アカウントの登録をサポートしておりません</Text>
                </Center>
                <Center>
                    <Link href="/login" color="blue.500">
                        すでにアカウントをお持ちですか？
                    </Link>
                </Center>
            </Stack>
        </Box>
    )
}