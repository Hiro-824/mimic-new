import { Box, Text, Center, Stack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { RecordingItem } from "./recording-item";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion"
import { recordingsAtom } from "../atoms/recording-atoms";

export const RecordingList = ({ id }: { id: string }) => {

    const [recordings] = useAtom(recordingsAtom);

    return (
        <Box p={4} borderRadius={"sm"} maxH={"calc(100vh - 375px)"} overflow={"auto"} width={"100%"} backgroundColor={"white"}>
            {recordings.filter(recording => recording.itemId === id).length > 0 ? (
                <Stack gap="4">
                    <AccordionRoot variant={"subtle"}>
                        {[...recordings].reverse().filter(recording => recording.itemId === id).map((recording, index) => (
                            <RecordingItem
                                id={id}
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