"use client"

import { ItemType } from "@/types/item";
import { HStack, VStack, Text, IconButton, Spacer, Link } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

export const ItemTile = ({ item, index }: { item: ItemType, index: number }) => {

    const formattedDate = new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(item.created_at));

    return (
        <HStack
            key={index}
            align="center"
            width="100%"
            borderRadius="md"
            _hover={{ bg: "gray.50" }} // Change this to your desired hover color
        >
            <Link width={"100%"} padding={4} href={`/items/${item.id}`} style={{ textDecoration: 'none', width: '100%' }}>
                <VStack align="start" gap={0}>
                    <Text fontWeight="bold">{item.title}</Text>
                    <Text fontSize="sm" color="gray.500">{formattedDate}</Text>
                </VStack>
            </Link>
            <Spacer />
            <IconButton
                aria-label="Delete note"
                variant="ghost"
                colorScheme="gray"
                mx={4}
            >
                <MdDelete />
            </IconButton>
        </HStack>
    )
}