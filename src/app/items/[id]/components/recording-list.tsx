import { Box, Text, Center, Stack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { RecordingItem } from "./recording-item";
import {
    AccordionRoot,
} from "@/components/ui/accordion"
import { Recording, recordingsAtom } from "../atoms/recording-atoms";

export const RecordingList = ({ id }: { id: string }) => {

    const [recordings, setRecordings] = useAtom(recordingsAtom);

    const handleRecordingChange = (updatedRecording: Recording) => {
        setRecordings((prevRecordings) =>
            prevRecordings.map((recording) =>
                recording.id === updatedRecording.id ? updatedRecording : recording
            )
        );
    };    

    return (
        <Box p={4} borderRadius={"sm"} maxH={"calc(100vh - 435px)"} overflow={"auto"} width={"100%"} backgroundColor={"white"}>
            {recordings.filter(recording => recording.itemId === id).length > 0 ? (
                <Stack gap="4">
                    <AccordionRoot variant={"outline"} collapsible>
                        {[...recordings].reverse().filter(recording => recording.itemId === id).map((recording, index) => (
                            <RecordingItem
                                id={id}
                                key={index}
                                index={index}
                                recording={recording}
                                onChange={(updatedRecording: Recording) => handleRecordingChange(updatedRecording)}
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