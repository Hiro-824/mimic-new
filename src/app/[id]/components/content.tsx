import { Box, Text, Flex, Span, } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { hoveredWordIndexAtom, selectionAreaAtom, wordsAtom } from "../atoms/word-atoms";
import { audioAtom, audioCurrentTimeAtom, audioPlayingAtom } from "../atoms/audio-atoms";

export default function Content() {

    const [words, setWords] = useAtom(wordsAtom);

    const [audio] = useAtom(audioAtom)

    const [audioPlaying, setAudioPlaying] = useAtom(audioPlayingAtom)

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(
                'https://ggqoevksoazxxcijctks.supabase.co/storage/v1/object/public/items/1b929165-e504-4af6-9fb0-8760f362f43e/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb/b7f6b34e-3ad3-44bd-a0b8-f76f50afafeb.json'
            );
            setWords(await res.json());
        }
        fetchData();
    }, []);

    useEffect(() => {
        const updateMouseState = (e: { type: string; }) => setIsMouseDown(e.type === 'mousedown');

        window.addEventListener('mousedown', updateMouseState);
        window.addEventListener('mouseup', updateMouseState);

        return () => {
            window.removeEventListener('mousedown', updateMouseState);
            window.removeEventListener('mouseup', updateMouseState);
        };
    }, []);

    return (
        <Box maxW="1080px" mx="auto">
            <Box width={"64%"} pt={"200px"} pb={"400px"} px={"16px"}>
                <Text
                    textAlign={"justify"}
                    fontSize={'md'}
                    lineHeight={{ base: '1.7', md: '1.8' }}
                    color="gray.700"
                    maxW="100%"
                    mb={4}
                    lineBreak={"auto"}
                    //userSelect={"none"}
                    cursor={"pointer"}
                >
                    {words.map((word, index) => {
                        const text = word.text;
                        const start = word.start / 1000000 - 0.1;
                        const end = word.end / 1000000 - 0.1;
                        const isBeingPlayed = (start <= audio!.currentTime && audio!.currentTime <= end);
                        const isHovered = (index === hoveredIndex)

                        const handleWordClick = () => {
                            if (!audio) return;
                            audio.currentTime = start + 0.1;
                            setAudioPlaying(true);
                        }

                        return (
                            <Span
                                key={index}
                                onClick={handleWordClick}
                                onPointerEnter={() => { setHoveredIndex(index) }}
                            >
                                <Span
                                    py={"5px"}
                                    backgroundColor={isBeingPlayed ? "blue.200" : "transparent"}
                                    _hover={!isBeingPlayed ? { backgroundColor: "blue.100" } : {}}
                                >
                                    {text}
                                </Span>
                                <Span py={"5px"}>
                                    {" "}
                                </Span>
                            </Span>
                        );
                    })}
                </Text>
            </Box>
        </Box>
    )
}