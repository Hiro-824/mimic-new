import { BasicLayout } from "@/components/basic-layout";
import { createClient } from "@/utils/supabase/server";
import { UploadForm } from "./upload-form";
import { Center } from "@chakra-ui/react";

export default async function UploadPage() {

    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <BasicLayout user={user}>
            <Center pt={100}>
                <UploadForm />
            </Center>
        </BasicLayout>
    )
}