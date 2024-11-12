import { Box } from "@chakra-ui/react"

export const Background = () => {
    return (
        <Box zIndex={-1} bg={"#F0F8FF"} position={"fixed"} top={0} bottom={0} right={0} left={0} />
    )
}