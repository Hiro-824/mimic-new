import { Box, Flex, Link, Image, Spacer } from "@chakra-ui/react"
import { LogoutButton } from "./logout-button"

export const Header = () => {
    return (
        <Box
            as="header"
            position="fixed"
            top="0"
            left="0"
            right="0"
            width="100%"
            backgroundColor="white"
            borderBottom="0.5px solid"
            borderBottomColor="gray.200"
            zIndex="1000"
        >
            <Flex alignItems="center" p={2} maxW="1080px" mx="auto">
                <Link>
                    <Image
                        src="/logo-pale.svg"
                        alt="Home"
                        height={"40px"}
                        objectFit="contain"
                    />
                </Link>
                <Spacer/>
                <LogoutButton/>
            </Flex>
        </Box>
    )
}