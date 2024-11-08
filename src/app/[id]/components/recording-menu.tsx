import { Box, Stack, Button, Flex, Icon } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components/ui/radio"
import { FaMicrophone } from "react-icons/fa";
import { RecordButton } from "./record-button";

export const RecordingMenu = () => {
    return (
        <Box p={4} borderRadius={"sm"} width={"100%"} backgroundColor={"white"}>
            <Flex direction={"column"} gap={4}>
                <RadioGroup defaultValue="1" size={"lg"} colorPalette={"cyan"} p={4}>
                    <Stack gap="6">
                        <Radio value="1">再生開始とともに録音</Radio>
                        <Radio value="2">再生停止とともに録音</Radio>
                        <Radio value="3">自動録音しない</Radio>
                    </Stack>
                </RadioGroup>
                <RecordButton />
            </Flex>
        </Box>
    )
}