import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HomeButton } from "@/components/home-button";
import { AbsoluteCenter, Box, Text, Button, VStack } from "@chakra-ui/react";

export default function ErrorPage() {
    return (
        <Box>
            <Background />
            <Header />
            <Box pt={240} px={4} maxW="1080px" mx="auto" minH={"calc(100vh - 84px)"}>
                <AbsoluteCenter>
                    <VStack gap={8}>
                        <Text>申し訳ありません、エラーが発生しました</Text>
                        <HomeButton />
                    </VStack>
                </AbsoluteCenter>
            </Box>
            <Footer />
        </Box>
    )
}