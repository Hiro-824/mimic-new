import { Box, Flex } from "@chakra-ui/react";
import { RecordingMenu } from "./recording-menu";
import { RecordingSearchBar } from "./recording-search-bar";
import { RecordingList } from "./recording-list";

export const OverlaySide = ({ id }: { id: string }) => {
    return (
        <Box pointerEvents={"all"} pt={8} pb={24} px={4} flex={1} height={"100%"}>
            <Flex direction={"column"} gap={4}>
                <RecordingMenu id={id} />
                {<RecordingSearchBar />}
                <RecordingList id={id} />
            </Flex>
        </Box>
    )
}