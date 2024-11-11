import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Slider } from "@/components/ui/slider"
import { PlayButton } from "./play-button";
import { PlaybackSlider } from "./playback-slider";

export const PlaybackBar = ({ id }: { id: string }) => {
    return (
        <Box pointerEvents={"all"} px={4} py={8} borderRadius={"sm"} width={"100%"} backgroundColor={"white"}>
            <Flex direction={"column"} gap={4}>
                <PlaybackSlider id={id} />
                <Flex justifyContent={"space-around"}>
                    <PlayButton id={id} />
                </Flex>
            </Flex>
        </Box>
    )
}