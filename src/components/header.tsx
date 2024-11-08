import { Box, Flex, Button, Link, Image, Spacer } from "@chakra-ui/react"

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
                <Button
                    backgroundColor="blue.100"
                    color="black"
                    borderRadius="full"
                    _hover={{ backgroundColor: 'blue.200' }}
                    _active={{ backgroundColor: 'blue.300' }}
                    fontWeight="bold"
                    h={"32px"}
                    px={6}
                >
                    Log out
                </Button>
            </Flex>
        </Box>
    )
}