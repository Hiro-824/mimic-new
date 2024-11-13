import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Recording } from "../atoms/recording-atoms";
import { FaPlay } from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react";
import { useAtom } from "jotai";
import { audioPlayingAtomFamily } from "../atoms/audio-atoms";
import { selectedAreaAtomFamily } from "../atoms/word-atoms";

export const MimicPlayerSimultaneous = ({ id, recording, mimicPlaying, setMimicPlaying }: { id: string, recording: Recording, mimicPlaying: boolean, setMimicPlaying: Dispatch<SetStateAction<boolean>>}) => {

    const [audioPlaying, setAudioPlaying] = useAtom(audioPlayingAtomFamily(id));

    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtomFamily(id));

    return (
        <Flex alignItems={"center"} gap={4}>
            <IconButton
                variant={"ghost"} rounded="full" size={"sm"}
                onClick={() => {
                    if (recording.start !== null && recording.end !== null) {
                        setSelectedArea({ start: recording.start, end: recording.end });
                    }
                    if(selectedArea) {
                        setTimeout(() => {
                            setAudioPlaying(true);
                            setMimicPlaying(true);
                        }, 0);
                    } else {
                        setMimicPlaying(true);
                    }
                }}
            >
                <FaPlay />
            </IconButton>
            <Text>
                重ねて再生
            </Text>
        </Flex>
    )
}