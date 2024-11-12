import { Box, Flex, Link, Image, Spacer } from "@chakra-ui/react"
import { LogoutButton } from "./logout-button"
import { User } from "@supabase/supabase-js"
import { LoginButton } from "./login-button"

export const Header = ({ user }: { user: User | null}) => {
    return (
        <Box
            as="header"
            position="fixed"
            top="0"
            left="0"
            right="0"
            width="100%"
            backgroundColor="white"
            //borderBottom="0.5px solid"
            //borderBottomColor="gray.200"
            zIndex="1000"
        >
            <Flex alignItems="center" p={4} maxW="1080px" mx="auto">
                <Link href="/items">
                    <Image
                        src="/logo-pale.svg"
                        alt="Home"
                        height={"40px"}
                        objectFit="contain"
                    />
                </Link>
                <Spacer />
                {user === null ? <LoginButton /> : <LogoutButton /> }
            </Flex>
        </Box>
    )
}