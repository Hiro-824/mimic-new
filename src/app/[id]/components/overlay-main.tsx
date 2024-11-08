import { Box, Flex } from "@chakra-ui/react";
import { SearchBar } from "./search-bar";
import { PlaybackBar } from "./playback-bar";

export const OverlayMain = () => {
    return (
        <Box pt={8} pb={24} px={0} flex={2} height={"100%"} pointerEvents={"none"}>
            <Flex height={"100%"} direction={"column"} justifyContent={"space-between"}>
                <SearchBar />
                <PlaybackBar />
            </Flex>
        </Box>
    )
}