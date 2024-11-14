import { ProgressCircleRing } from "@/components/ui/progress-circle";
import { AbsoluteCenter, Box, ProgressCircleRoot } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Box bg={"#F0F8FF"}>
            <Box
                minH="100vh"
                display="flex"
                justifyContent="center"
                alignItems="top"
                pt={24}
                px={8}
            >
                <Box maxW="md" w="full">
                    <AbsoluteCenter>
                        <ProgressCircleRoot value={null}>
                            <ProgressCircleRing colorPalette={"cyan"} cap="round" />
                        </ProgressCircleRoot>
                    </AbsoluteCenter>
                </Box>
            </Box>
        </Box>
    );
}