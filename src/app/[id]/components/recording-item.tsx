import { Box, IconButton, Flex, Stack, Text } from "@chakra-ui/react";
import { Key, useEffect, useRef, useState } from "react";
import { Recording } from "../atoms/recording-atoms";
import { FaPause, FaPlay } from "react-icons/fa";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion"

export const RecordingItem = ({ index, recording }: { index: number, recording: Recording }) => {

    const [mimicPlaying, setMimicPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            if (mimicPlaying) {
                audioRef.current?.play().catch(() => {
                    throw new Error("音声ファイルが見つかりません");
                });
            } else {
                audioRef.current.pause();
            }
        }
        return () => {
            audioRef.current?.pause();
        };
    }, [audioRef.current, mimicPlaying]);

    useEffect(() => {
        const onEnded = () => {
            setMimicPlaying(false);
            audioRef.current?.pause();
        };

        audioRef.current?.addEventListener("ended", onEnded);
        return () => {
            audioRef.current?.removeEventListener("ended", onEnded);
        };
    }, [audioRef, setMimicPlaying]);

    return (
        <AccordionItem key={index} value={recording.id}>
            <AccordionItemTrigger>
                <audio ref={audioRef} src={recording.audioURL}></audio>
                <IconButton
                    variant={"ghost"} rounded="full" size={"xl"}
                    onClick={() => {
                        setMimicPlaying((prev) => !prev);
                    }}
                >
                    {mimicPlaying ? <FaPause /> : <FaPlay />}
                </IconButton>
                <Stack gap={1}>
                    <Text>...</Text>
                    <Text fontSize="sm" color="fg.muted">
                        {recording.recDate}
                    </Text>
                </Stack>
            </AccordionItemTrigger>
            <AccordionItemContent>
                <Stack gap={4}>
                    <Flex alignItems={"center"} gap={4}>
                        <IconButton
                            variant={"ghost"} rounded="full" size={"sm"}
                            onClick={() => {
                                setMimicPlaying((prev) => !prev);
                            }}
                        >
                            <FaPlay />
                        </IconButton>
                        <Text>
                            オリジナル → 録音の順に再生
                        </Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={4}>
                        <IconButton
                            variant={"ghost"} rounded="full" size={"sm"}
                            onClick={() => {
                                setMimicPlaying((prev) => !prev);
                            }}
                        >
                            <FaPlay />
                        </IconButton>
                        <Text>
                            録音 → オリジナルの順に再生
                        </Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={4}>
                        <IconButton
                            variant={"ghost"} rounded="full" size={"sm"}
                            onClick={() => {
                                setMimicPlaying((prev) => !prev);
                            }}
                        >
                            <FaPlay />
                        </IconButton>
                        <Text>
                            重ねて再生
                        </Text>
                    </Flex>
                </Stack>
            </AccordionItemContent>
        </AccordionItem>
    );
};