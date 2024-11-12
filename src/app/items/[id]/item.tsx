"use client"

import { Box } from "@chakra-ui/react";
import { Main } from "./components/main";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { audioAtomFamily } from "./atoms/audio-atoms";
import { wordsAtomFamily } from "./atoms/word-atoms";
import { createClient } from '@/utils/supabase/client'
import { getURL } from "next/dist/shared/lib/utils";

export const Item = ({ uid, id, item }: { uid: string | null, id: string, item: any, }) => {

    const isPublic = (item["user_id"] == null);

    const supabase = createClient()

    //const audioUrl = "https://ggqoevksoazxxcijctks.supabase.co/storage/v1/object/public/items/1b929165-e504-4af6-9fb0-8760f362f43e/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb/audio"
    //const scriptUrl = "https://ggqoevksoazxxcijctks.supabase.co/storage/v1/object/public/items/1b929165-e504-4af6-9fb0-8760f362f43e/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb.json"

    const [audio, setAudio] = useAtom(audioAtomFamily(id))

    const [words, setWords] = useAtom(wordsAtomFamily(id));

    const getAudio = async () => {
        const audioName = item["audio_name"];
        console.log(`audioName: ${audioName}`);
        console.log(`isPublic: ${isPublic}`);
        const path = isPublic ? `public/${id}/${audioName}` : `${uid}/${id}/${audioName}`;
        console.log(`path: ${path}`);
        const { data, error } = await supabase.storage.from('items').createSignedUrl(path, 600);
        if (!data || error) return;
        const audioUrl = data.signedUrl;
        setAudio(new Audio(audioUrl));
    }

    const getWords = async () => {
        const wordName = item["text_name"];
        console.log(`wordName: ${wordName}`);
        console.log(`isPublic: ${isPublic}`);
        const path = isPublic ? `public/${id}/${wordName}` : `${uid}/${id}/${wordName}`;
        console.log(`path: ${path}`);
        const { data, error } = await supabase.storage.from('items').createSignedUrl(path, 600);
        if (!data || error) return;
        const wordURL = data.signedUrl;
        const res = await fetch(wordURL);
        setWords(await res.json());
    }

    useEffect(() => {

        if (!audio) {
            getAudio();
        }

        if(words.length === 0) {
            getWords();
        }

    });

    return (
        <>
            <Box zIndex={-1} bg={"#F0F8FF"} position={"fixed"} top={0} bottom={0} right={0} left={0} />
            <Main id={id} />
        </>
    );
}