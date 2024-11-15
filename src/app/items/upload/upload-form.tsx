"use client"

import {
    FileUploadDropzone,
    FileUploadList,
    FileUploadRoot,
} from "@/components/ui/file-button"
import { createClient } from "@/utils/supabase/client"
import { insertData } from "./actions";

export const UploadForm = () => {

    const supabase = createClient();

    const handleFileUpload = async (file: File) => {
        const inserted = await insertData({ title: file.name });
        console.log(inserted["id"]);
        //supabase.storage.from("items").upload("filePath", file);
    }

    return (
        <FileUploadRoot maxFiles={1} onFileAccept={(details) => handleFileUpload(details.files[0])} maxW="xl" alignItems="stretch">
            <FileUploadDropzone
                label="Drag and drop here to upload"
                description=".png, .jpg up to 5MB"
            />
            <FileUploadList />
        </FileUploadRoot>
    )
}