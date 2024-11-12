import { Box, Center, HStack, VStack, Text } from "@chakra-ui/react"
import Link from "next/link"

export const Footer = () => {
    return (
        <Box backgroundColor={"white"} p={4}>
            <Center gap={4}>
                <VStack>
                    <HStack gap={4}>
                        <Link href="/signup">
                            利用規約
                        </Link>
                        <Link href="/signup">
                            プライバシーポリシー
                        </Link>
                    </HStack>
                    <Text>©︎ 2024 Mimic</Text>
                </VStack>
            </Center>
        </Box>
    )
}