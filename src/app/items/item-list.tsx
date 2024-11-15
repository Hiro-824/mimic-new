"use client"

import { ItemType } from "@/types/item";
import { Box, Heading, Flex, IconButton, VStack } from "@chakra-ui/react"
import { ItemTile } from "./item-tile";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

export const ItemList = ({ items }: { items: ItemType[] }) => {

    return (
        <Box
            maxW={"720px"}
            width={"100%"}
        >
            <Flex align="center" justify="space-between" mb={8}>
                <Heading size="3xl" textAlign="left">
                    Home
                </Heading>
                <IconButton
                    variant={"surface"}
                    aria-label="Add"
                    onClick={() => console.log("Add button clicked")}
                >
                    <FaPlus/>
                </IconButton>
            </Flex>
            <Box
                bg="white"
                p={2}
                rounded="md"
            >
                <VStack gap={4}>
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