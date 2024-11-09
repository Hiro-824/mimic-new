import { Box, Stack, Button, Flex, Icon } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components/ui/radio"
import { FaMicrophone } from "react-icons/fa";
import { RecordButton } from "./record-button";
import { useAtom } from "jotai";
import { autoRecordOption, autoRecordOptionAtomFamily } from "../atoms/recording-atoms";

export const RecordingMenu = ({ id }: { id: string }) => {

    const [option, setOption] = useAtom(autoRecordOptionAtomFamily(id));

    return (
        <Box p={4} borderRadius={"sm"} width={"100%"} backgroundColor={"white"}>
            <Flex direction={"column"} gap={4}>
                <RadioGroup value={option} onValueChange={(e) => setOption(e.value as autoRecordOption)} size={"lg"} colorPalette={"cyan"} p={4}>
                    <Stack gap="6">
                        <Radio value="asStart">再生開始とともに録音</Radio>
                        <Radio value="asEnd">再生停止とともに録音</Radio>
                        <Radio value="none">自動録音しない</Radio>
                    </Stack>
                </RadioGroup>
                <RecordButton id={id} />
            </Flex>
        </Box>
    )
}