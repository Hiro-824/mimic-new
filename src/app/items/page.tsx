import { BasicLayout } from "@/components/basic-layout";
import { createClient } from "@/utils/supabase/server";
import { ItemList } from "./item-list";
import { Box, Center, Heading } from "@chakra-ui/react";

export default async function ItemsPage() {

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <BasicLayout user={user}>
        <></>
      </BasicLayout>
    )
  }

  const { data: items, error } = await supabase.from("items").select().eq('user_id', user.id);

  if (!items || error) {
    return (
      <BasicLayout user={user}>
        <></>
      </BasicLayout>
    )
  }

  return (
    <BasicLayout user={user}>
      <Center pt={120}>
        <ItemList items={items} />
      </Center>
    </BasicLayout>
  )
}