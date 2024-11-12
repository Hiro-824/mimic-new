"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Heading, Box, Flex, Text } from "@chakra-ui/react"

export const Home = () => {

    return (
        <>
            <Header />
            <Box pt={240} px={4} maxW="1080px" mx="auto" minH={"100vh"}>
                <Heading size={"5xl"} fontWeight="normal" lineHeight="2">
                    <Text as="span" fontWeight="bold" fontSize={"6xl"}>音声</Text>を使った
                    <Text as="span" fontWeight="bold" fontSize={"6xl"} backgroundColor={"blue.100"} pt={4} pb={8}>英語学習</Text><br />
                    を<Text as="span" fontWeight="bold" fontSize={"6xl"}>サポート</Text><br />
                </Heading>
                <Text lineHeight={""} as="span" fontSize={"xl"}>Mimicは、ユーザーの音声を自動でテキスト化し、<br />インタラクティブに英語を学べる英語学習サービスです。</Text>
            </Box>
            <Footer />
        </>
    )
}