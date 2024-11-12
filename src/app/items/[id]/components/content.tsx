import { Box, Text, Span, } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { selectedAreaAtomFamily, wordsAtomFamily } from "../atoms/word-atoms";
import { audioAtomFamily, audioPlayingAtomFamily } from "../atoms/audio-atoms";

export const Content = ({ id }: {id: string}) => {

    const [words, setWords] = useAtom(wordsAtomFamily(id));

    const [audio] = useAtom(audioAtomFamily(id))

    const [audioPlaying, setAudioPlaying] = useAtom(audioPlayingAtomFamily(id))

    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtomFamily(id))

    const spanRefs = useRef<HTMLSpanElement[]>([]);

    const handleMouseUp = () => {
        const selection = window.getSelection();
        const selectedText = selection?.toString();

        console.log("handleMouseUp")

        if (selection && selectedText) {
            let startIndex: number | null = null;
            let endIndex: number | null = null;

            let selectionOffset = 0;
            if(selectedText[0] === " ") selectionOffset = 1;

            spanRefs.current.forEach((spanRef, index) => {
                if (spanRef && selection.containsNode(spanRef, true)) {
                    if (startIndex === null) startIndex = index; // First selected span
                    endIndex = index; // Keep updating to get the last selected span
                }
            });

            if (startIndex !== null && endIndex !== null) {
                setSelectedArea({ start: startIndex + selectionOffset, end: endIndex });
                if (audio) {
                    audio.currentTime = words[startIndex + selectionOffset].start / 1000000;
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
        if (!audio) return;
    
        const interval = setInterval(() => {
            if(!audioPlaying) return;

            const currentTime = audio.currentTime;
    
            // Find the word currently being played based on the current time
            const currentIndex = words.findIndex(word => {
                const start = word.start / 1000000 - 0.1;
                const end = word.end / 1000000 - 0.1;
                return currentTime >= start && currentTime <= end;
            });
    
            if (currentIndex !== -1 && spanRefs.current[currentIndex]) {
                // Scroll the currently played word into view
                spanRefs.current[currentIndex].scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                });
            }
        }, 100); // Adjust interval as needed
    
        return () => clearInterval(interval);
    }, [audio, words, audioPlaying]);

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
                    if (range.endOffset > 0) {
                        range.setEnd(range.endContainer, range.endOffset - 1);
                    }
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
                <Box width={"64%"} pb={"200px"} px={"16px"}>
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
                                    onMouseDown={isSelected && (selectedArea.end  - selectedArea.start >= 100) ? handleMouseDown : () => {}}
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
                                        _selection={{ backgroundColor: "blue.100" }}
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