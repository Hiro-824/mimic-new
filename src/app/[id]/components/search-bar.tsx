import { InputGroup } from "@/components/ui/input-group";
import { Flex, Input, IconButton } from "@chakra-ui/react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

export const SearchBar = () => {
    return (
        <InputGroup
            pointerEvents={"all"}
            endElement={
                <Flex>
                    <IconButton variant={"ghost"}>
                        <MdArrowUpward />
                    </IconButton>
                    <IconButton variant={"ghost"}>
                        <MdArrowDownward />
                    </IconButton>
                </Flex>
            }
        >
            <Input size={"lg"} backgroundColor={"white"} placeholder="検索" variant="subtle" />
        </InputGroup>
    )
}