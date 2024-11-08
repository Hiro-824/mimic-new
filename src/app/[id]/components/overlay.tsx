import { Box, Flex } from "@chakra-ui/react";
import { OverlayMain } from "./overlay-main";
import { OverlaySide } from "./overlay-side";

export const Overlay = () => {
    return (
        <Box
            position="fixed"
            top="55px"
            left="0"
            right="0"
            bottom="0"
            pointerEvents={"none"}
        >
            <Flex alignItems="center" maxW="1080px" mx="auto" height="100vh">
                <OverlayMain />
                <OverlaySide />
            </Flex>
        </Box>
    )
}