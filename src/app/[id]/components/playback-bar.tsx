import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Slider } from "@/components/ui/slider"
import { PlayButton } from "./play-button";
import { PlaybackSlider } from "./playback-slider";

export const PlaybackBar = () => {
    return (
        <Box pointerEvents={"all"} px={4} py={8} borderRadius={"sm"} width={"100%"} backgroundColor={"white"}>
            <Flex direction={"column"} gap={4}>
                <PlaybackSlider />
                <Flex justifyContent={"space-around"}>
                    <PlayButton />
                </Flex>
            </Flex>
        </Box>
    )
}