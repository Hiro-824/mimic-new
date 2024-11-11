import { Button } from "@chakra-ui/react"

export const LogoutButton = () => {
    return (
        <Button
            backgroundColor="blue.100"
            color="black"
            borderRadius="full"
            _hover={{ backgroundColor: 'blue.200' }}
            _active={{ backgroundColor: 'blue.300' }}
            fontWeight="bold"
            h="32px"
            px={6}
            onClick={async () => {
                await fetch('/auth/signout', { method: 'POST' });
                window.location.href = '/';
            }}
        >
            Log out
        </Button>
    )
}