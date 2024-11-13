"use client"

import { AbsoluteCenter, Box, Button, Center, Heading, Input, Link, Stack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useForm } from "react-hook-form"
import { login } from "./actions"
import { useState } from "react"
import {
    ProgressCircleRing,
    ProgressCircleRoot,
} from "@/components/ui/progress-circle"
import {
    PasswordInput,
    PasswordStrengthMeter,
} from "@/components/ui/password-input"

interface FormValues {
    email: string
    password: string
}

export const LoginForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const onSubmit = handleSubmit((data) => {
        setHasSubmitted(true);
        const formData = new FormData()
        formData.append("email", data.email);
        formData.append("password", data.password);
        login(formData);
    })

    const [hasSubmitted, setHasSubmitted] = useState(false);

    if (!hasSubmitted) {
        return (
            <>
                <Heading size="3xl" mb={8} textAlign="left">
                    ログイン
                </Heading>
                <Box
                    bg="white"
                    p={8}
                    rounded="md"
                    as={"form"}
                    onSubmit={onSubmit}
                >
                    <Stack gap="4" maxW="sm">
                        <Field
                            label="メールアドレス"
                            invalid={!!errors.email}
                            errorText={errors.email?.message}
                        >
                            <Input
                                {...register("email", { required: "メールアドレスは必須です" })}
                            />
                        </Field>
                        <Field
                            label="パスワード"
                            invalid={!!errors.password}
                            errorText={errors.password?.message}
                        >
                            <PasswordInput
                                {...register("password", { required: "パスワードは必須です" })}
                            />
                        </Field>
                        <Button
                            type="submit"
                            backgroundColor="blue.100"
                            color="black"
                            borderRadius="full"
                            _hover={{ backgroundColor: 'blue.200' }}
                            _active={{ backgroundColor: 'blue.300' }}
                            fontWeight="bold"
                            //h={"32px"}
                            px={6}
                            width={"100%"}
                        >
                            Log in
                        </Button>
                        <Center>
                            <Link href="/signup" color="blue.500">
                                まだアカウントをお持ちではありませんか？
                            </Link>
                        </Center>
                    </Stack>
                </Box>
            </>
        )
    } else {
        return (
            <AbsoluteCenter>
                <ProgressCircleRoot value={null}>
                    <ProgressCircleRing colorPalette={"cyan"} cap="round" />
                </ProgressCircleRoot>
            </AbsoluteCenter>
        )
    }
}