"use client"

import { Box } from "@chakra-ui/react";
import { Main } from "./components/main";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { audioAtomFamily } from "./atoms/audio-atoms";
import { wordsAtomFamily } from "./atoms/word-atoms";

export const Item = ({ id }: { id: string }) => {
    
    const audioUrl = "https://ggqoevksoazxxcijctks.supabase.co/storage/v1/object/public/items/1b929165-e504-4af6-9fb0-8760f362f43e/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb/audio"
    const scriptUrl = "https://ggqoevksoazxxcijctks.supabase.co/storage/v1/object/public/items/1b929165-e504-4af6-9fb0-8760f362f43e/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb.json"

    const [audio, setAudio] = useAtom(audioAtomFamily(id))

    const [words, setWords] = useAtom(wordsAtomFamily(id));

    useEffect(() => {
        if (!audio || audio.currentSrc != audioUrl) {
            setAudio(new Audio(audioUrl))
        }
    })

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(
                scriptUrl
            );
            setWords(await res.json());
        }
        fetchData();
    }, []);

    return (
        <>
            <Box zIndex={-1} bg={"#F0F8FF"} position={"fixed"} top={0} bottom={0} right={0} left={0} />
            <Main id={id} />
        </>
    );
}