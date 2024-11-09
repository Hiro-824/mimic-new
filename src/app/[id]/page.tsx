import { Box } from "@chakra-ui/react";
import { Main } from "./components/main";

export default function Id({params}: {params: {id: string}}) {

  const { id } = params

  const audioUrl = "https://ggqoevksoazxxcijctks.supabase.co/storage/v1/object/public/items/1b929165-e504-4af6-9fb0-8760f362f43e/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb/audio"
  const scriptUrl = "https://ggqoevksoazxxcijctks.supabase.co/storage/v1/object/public/items/1b929165-e504-4af6-9fb0-8760f362f43e/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb.json"

  return (
    <>
      <Box zIndex={-1} bg={"#F0F8FF"} position={"fixed"} top={0} bottom={0} right={0} left={0} />
      <Main audioUrl={audioUrl} scriptUrl={scriptUrl} id={id} />
    </>
  );
}