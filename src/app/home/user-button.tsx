"use client"

import { Button } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export const UserButton = () => {

    const router = useRouter();

    return (
        <Button
            backgroundColor="blue.100"
            color="black"
            //borderRadius="full"
            borderRadius={"md"}
            _hover={{ backgroundColor: 'blue.200' }}
            _active={{ backgroundColor: 'blue.300' }}
            fontWeight="bold"
            //h="32px"
            px={6}
            onClick={() => router.push("/items")}
        >
            学習を始める
        </Button>
    )
}