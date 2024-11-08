import { Box, Text, Center, Stack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { RecordingItem } from "./recording-item";
import { recordingsAtom } from "../atoms/recording-atoms";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion"

export const RecordingList = () => {

    const [recordings, setRecordings] = useAtom(recordingsAtom);

    return (
        <Box p={4} borderRadius={"sm"} maxH={"calc(100vh - 435px)"} overflow={"auto"} width={"100%"} backgroundColor={"white"}>
            {recordings.length > 0 ? (
                <Stack gap="4">
                    <AccordionRoot variant={"subtle"}>
                        {[...recordings].reverse().map((recording, index) => (
                            <RecordingItem
                                key={index}
                                index={index}
                                recording={recording}
                            />
                        ))}
                    </AccordionRoot>
                </Stack>
            ) : (
                <Center>
                    <Text>まだ録音がありません！</Text>
                </Center>
            )}
        </Box>
    )
}