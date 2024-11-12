import { BasicLayout } from "@/components/basic-layout";
import { createClient } from "@/utils/supabase/server";

export default async function LibraryPage() {

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <BasicLayout user={user}>
      <></>
    </BasicLayout>
  )
}