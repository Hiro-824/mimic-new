import { BasicLayout } from "@/components/basic-layout";
import { createClient } from "@/utils/supabase/server";
import { Heading, Text, VStack, Box } from "@chakra-ui/react";
import { DemoButton } from "./demo-button";

export default async function HomePage() {

    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <BasicLayout user={user}>
            <VStack pb={"240px"} alignItems={"start"} gap={8}>
                <Box pt={"240px"}>
                    <Heading size={"5xl"} fontWeight="normal" lineHeight="2">
                        <Text as="span" fontWeight="bold" fontSize={"6xl"}>音声</Text>を使った
                        <Text as="span" fontWeight="bold" fontSize={"6xl"} backgroundColor={"blue.100"} pt={4} pb={8}>英語学習</Text><br />
                        を<Text as="span" fontWeight="bold" fontSize={"6xl"}>サポート</Text><br />
                    </Heading>
                    <Text lineHeight={""} as="span" fontSize={"xl"}>Mimicは、テキストと音声を組み合わせたUIで、<br />インタラクティブに英語を学べる英語学習サービスです。</Text>
                </Box>
                <DemoButton />
            </VStack>
        </BasicLayout>
    )
}