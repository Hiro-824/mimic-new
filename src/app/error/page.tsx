import { BasicLayout } from "@/components/basic-layout";
import { createClient } from "@/utils/supabase/server";
import { AbsoluteCenter, Text } from "@chakra-ui/react";

export default async function ErrorPage() {

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <BasicLayout user={user}>
      <AbsoluteCenter>
        <Text>申し訳ありません、エラーが発生しました</Text>
      </AbsoluteCenter>
    </BasicLayout>
  )
}