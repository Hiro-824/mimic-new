"use client"

import { ItemType } from "@/types/item";
import { Box, Heading, Flex, IconButton, VStack, Spacer, FileUploadFileAcceptDetails } from "@chakra-ui/react"
import { ItemTile } from "./item-tile";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NewItemButton } from "./new-item-button";

export const ItemList = ({ items }: { items: ItemType[] }) => {

    const router = useRouter();

    return (
        <Box
            maxW={"720px"}
            width={"100%"}
        >
            <Flex align="center" justify="space-between" mb={8}>
                <Heading size="3xl" textAlign="left">
                    Home
                </Heading>
                <NewItemButton />
            </Flex>
            <Box
                bg="white"
                p={2}
                rounded="md"
            >
                <VStack gap={0}>
                    {items.map((item, index) => {
                        return (
                            <ItemTile key={index} item={item} index={index} />
                        )
                    })}
                </VStack>
            </Box>
        </Box>
    )
}