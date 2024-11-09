import { Box, IconButton, Flex, Stack, Text, Button, Spacer } from "@chakra-ui/react";
import { Key, useEffect, useRef, useState } from "react";
import { Recording } from "../atoms/recording-atoms";
import { FaPause, FaPlay } from "react-icons/fa";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
} from "@/components/ui/accordion"
import { useAtom } from "jotai";
import { selectedAreaAtom, wordsAtom } from "../atoms/word-atoms";
import { audioPlayingAtom } from "../atoms/audio-atoms";
import { MimicPlayerSimultaneous } from "./mimic-player-simultaneous";
import { MimicPlayerOriginalToMimic } from "./mimic-player-original-to-mimic";
import { MimicPlayerMimicToOriginal } from "./mimic-player-mimic-to-original";

export const RecordingItem = ({ index, recording }: { index: number, recording: Recording }) => {

    const [mimicPlaying, setMimicPlaying] = useState(false);

    const [audioPlaying, setAudioPlaying] = useAtom(audioPlayingAtom);

    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtom);

    const audioRef = useRef<HTMLAudioElement>(null);

    const [words] = useAtom(wordsAtom);

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

    const text = (recording.start && recording.end) ? words.slice(recording.start, recording.end + 1).map(word => word.text).join(" ") : null;

    return (
        <AccordionItem key={index} value={recording.id}>
            <AccordionItemTrigger>
                <audio ref={audioRef} src={recording.audioURL}></audio>
                <IconButton as={"a"}
                    variant={"ghost"} rounded="full" size={"xl"}
                    onClick={() => {
                        setMimicPlaying((prev) => !prev);
                    }}
                >
                    {mimicPlaying ? <FaPause /> : <FaPlay />}
                </IconButton>
                <Stack gap={1}>
                    <Text lineClamp="2">{text ?? "..."}</Text>
                    <Text fontSize="sm" color="fg.muted">
                        {recording.recDate}
                    </Text>
                </Stack>
            </AccordionItemTrigger>
            <AccordionItemContent>
                <Stack gap={4}>
                    <Flex justifyContent={"space-between"} alignItems={"center"} gap={4}>
                        <Text lineClamp="2">{text}</Text>
                        <Button variant={"subtle"}>
                            選択部分を指定
                        </Button>
                    </Flex>
                    <Spacer />
                    <MimicPlayerOriginalToMimic recording={recording} mimicPlaying={mimicPlaying} setMimicPlaying={setMimicPlaying}/>
                    <MimicPlayerMimicToOriginal recording={recording} mimicPlaying={mimicPlaying} setMimicPlaying={setMimicPlaying}/>
                    <MimicPlayerSimultaneous recording={recording} mimicPlaying={mimicPlaying} setMimicPlaying={setMimicPlaying}/>
                </Stack>
            </AccordionItemContent>
        </AccordionItem>
    );
};