import { IconButton } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa6"
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu"
import { useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export const NewItemButton = () => {

    const supabase = createClient();

    const [file, setFile] = useState<File | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleOpenFinder = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

        if (!event.target.files) return;
        const file = event.target.files[0];
        const fileName = file.name;

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (!userData || userError) {
            return;
        }
        const user = userData.user;
        const userId = user.id;

        const { data: inserted, error: insertError } = await supabase.from("items").insert({
            title: fileName,
            user_id: userId,
            audio_name: fileName,
            is_loading: true,
        }).select("*");
        if (insertError || !inserted) {
            console.log(insertError?.message ?? "Failed to insert another item.");
            return;
        }

        const itemId = inserted[0]["id"];
        const path = `${userId}/${itemId}/${fileName}`;
        const { error } = await supabase.storage.from("items").upload(path, file);
        if (insertError || !inserted) {
            console.log(error?.message ?? "Failed to upload the file.");
            return;
        }

        const functionUrl = process.env.NEXT_PUBLIC_TRANSCRIBE_FUNCTION_URL!;
        const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        const { data: data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !data.session) {
            console.log(error?.message ?? "Failed to get session.");
            return;
        }
        const userToken = data.session.access_token;
        const headers = {
            'Authorization': `Bearer ${userToken}`,
            'apikey': token,
            'Content-Type': 'application/json',
        };
        const body = JSON.stringify({ itemId: itemId });
        try {
            const res = await fetch(functionUrl, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <MenuRoot onSelect={(details) => {
            if (details.value === "upload audio") {
                handleOpenFinder();
            }
        }}>
            <input
                ref={inputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <MenuTrigger asChild>
                <IconButton
                    mx={4}
                    variant={"surface"}
                    aria-label="Add"
                >
                    <FaPlus />
                </IconButton>
            </MenuTrigger>
            <MenuContent>
                <MenuItem value="upload audio">端末から音声をアップロード</MenuItem>
                <MenuItem value="select from library">ライブラリから選ぶ</MenuItem>
            </MenuContent>
        </MenuRoot>
    )
}