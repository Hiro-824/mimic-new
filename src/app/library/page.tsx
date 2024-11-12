import { Box } from "@chakra-ui/react";
import { Library } from "./library";
import { Background } from "@/components/background";

export default async function LibraryPage() {
  
    return (
      <Box>
        <Library />
        <Background />
      </Box>
    )
  }