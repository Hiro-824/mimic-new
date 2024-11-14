"use client"

import { Button } from "@chakra-ui/react"
import NextLink from "next/link";
//import { useRouter } from "next/navigation"

export const DemoButton = () => {

    //const router = useRouter();

    const link = "/items/798b371e-4ac5-4d54-9548-a426344d937e";

    return (
        <NextLink href={link} passHref>
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
            //onClick={() => router.push("/items/798b371e-4ac5-4d54-9548-a426344d937e")}
            >
                ログイン不要で試す
            </Button>
        </NextLink>
    )
}