import { Box, Text, Span, } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { selectedAreaAtom, wordsAtom } from "../atoms/word-atoms";
import { audioAtom, audioPlayingAtom } from "../atoms/audio-atoms";

export const Content = () => {

    const [words, setWords] = useAtom(wordsAtom);

    const [audio] = useAtom(audioAtom)

    const [audioPlaying, setAudioPlaying] = useAtom(audioPlayingAtom)

    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtom)

    const spanRefs = useRef<HTMLSpanElement[]>([]);

    const handleMouseUp = () => {
        const selection = window.getSelection();
        const selectedText = selection?.toString();

        console.log("handleMouseUp")

        if (selection && selectedText) {
            let startIndex: number | null = null;
            let endIndex: number | null = null;

            spanRefs.current.forEach((spanRef, index) => {
                if (spanRef && selection.containsNode(spanRef, true)) {
                    if (startIndex === null) startIndex = index; // First selected span
                    endIndex = index; // Keep updating to get the last selected span
                }
            });

            if (startIndex !== null && endIndex !== null) {
                setSelectedArea({ start: startIndex, end: endIndex });
                if (audio) {
                    audio.currentTime = words[startIndex].start / 1000000;
                    setAudioPlaying(true);
                }
            } else {
                setSelectedArea(null); // Reset if no spans are selected
            }
        } else {
            setSelectedArea(null); // Reset if there's no selection
        }
    };

    useEffect(() => {
        if (selectedArea !== null && spanRefs.current) {
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();

                const range = document.createRange();
                const startSpan = spanRefs.current[selectedArea.start];
                const endSpan = spanRefs.current[selectedArea.end];

                if (startSpan && endSpan) {
                    range.setStartBefore(startSpan);
                    range.setEndAfter(endSpan);

                    selection.addRange(range);
                }
            }
        } else {
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
            }
        }
    }, [selectedArea, spanRefs]);

    return (
        <Box width={"100%"} onMouseUp={handleMouseUp}>
            <Box maxW="1080px" mx="auto">
                <Box width={"64%"} pt={"200px"} pb={"400px"} px={"16px"}>
                    <Text
                        textAlign={"justify"}
                        fontSize={'md'}
                        lineHeight={'1.8'}
                        color="gray.700"
                        maxW="100%"
                        mb={4}
                        lineBreak={"auto"}
                        cursor={"pointer"}
                    >
                        {words.map((word, index) => {
                            const text = word.text;
                            const start = word.start / 1000000 - 0.1;
                            const end = word.end / 1000000 - 0.1;
                            const isBeingPlayed = (start <= audio!.currentTime && audio!.currentTime <= end);
                            const isSelected = (selectedArea && selectedArea.start <= index && index <= selectedArea.end)
                            const isLastSelected = (selectedArea?.end === index)

                            const handleWordClick = () => {
                                if (!audio) return;
                                audio.currentTime = start + 0.1;
                                setAudioPlaying(true);
                            }

                            const handleMouseDown = (event: { preventDefault: () => void; }) => {
                                event.preventDefault(); // Prevents clearing of text selection
                            };

                            return (
                                <Span
                                    key={index}
                                    onClick={handleWordClick}
                                    onMouseDown={isSelected && (selectedArea.end  - selectedArea.start >= 20) ? handleMouseDown : () => {}}
                                    ref={(el: HTMLSpanElement) => spanRefs.current[index] = el}
                                >
                                    <Span
                                        pt={"4.5px"}
                                        pb={"5.5px"}
                                        backgroundColor={isBeingPlayed ? "blue.200" : isSelected ? "blue.100" : "transparent"}
                                        _hover={!isBeingPlayed ? { backgroundColor: "blue.100" } : {}}
                                        _selection={!isBeingPlayed ? { backgroundColor: "blue.100" } : { backgroundColor: "blue.200" }}
                                    >
                                        {text}
                                    </Span>
                                    <Span
                                        pt={"4.5px"}
                                        pb={"5.5px"}
                                        backgroundColor={isSelected && !isLastSelected ? "blue.100" : "transparent"}
                                        _selection={isLastSelected ? { backgroundColor: "transparent" } : { backgroundColor: "blue.100" }}
                                    >
                                        {" "}
                                    </Span>
                                </Span>
                            );
                        })}
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}