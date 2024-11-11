import { Box } from "@chakra-ui/react";
import { Main } from "./components/main";
import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";

export default async function Id({ params, }: { params: Promise<{ id: string }> }) {

  const id = (await params).id;

  const supabase = await createClient();

  const { data: item, error } = await supabase.from("items").select().eq('id', id).single();

  if (!item || error) {
    redirect('/items');
  }

  const audioUrl = "https://ggqoevksoazxxcijctks.supabase.co/storage/v1/object/public/items/1b929165-e504-4af6-9fb0-8760f362f43e/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb/audio"
  const scriptUrl = "https://ggqoevksoazxxcijctks.supabase.co/storage/v1/object/public/items/1b929165-e504-4af6-9fb0-8760f362f43e/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb.json"

  //const audioUrl = `https://gccpvkvlopkohnmgdrgy.supabase.co/storage/v1/object/public/audio/public/${id}.wav`;
  //const scriptUrl = `https://gccpvkvlopkohnmgdrgy.supabase.co/storage/v1/object/public/text/public/${id}.json`;

  return (
    <>
      <Box zIndex={-1} bg={"#F0F8FF"} position={"fixed"} top={0} bottom={0} right={0} left={0} />
      <Main audioUrl={audioUrl} scriptUrl={scriptUrl} id={id} />
    </>
  );
}