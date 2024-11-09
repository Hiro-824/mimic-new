import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Recording } from "../atoms/recording-atoms";
import { FaPlay } from "react-icons/fa";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { audioPlayingAtom } from "../atoms/audio-atoms";
import { selectedAreaAtom } from "../atoms/word-atoms";

export const MimicPlayerMimicToOriginal = ({ recording, mimicPlaying, setMimicPlaying }: { recording: Recording, mimicPlaying: boolean, setMimicPlaying: Dispatch<SetStateAction<boolean>> }) => {

    const [audioPlaying, setAudioPlaying] = useAtom(audioPlayingAtom);

    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtom);

    const [shouldToggleAudio, setShouldToggleAudio] = useState(false);

    useEffect(() => {
        if (!mimicPlaying && shouldToggleAudio) {
            setAudioPlaying(true);
            setShouldToggleAudio(false);
        }
    }, [mimicPlaying, shouldToggleAudio]);

    return (
        <Flex alignItems={"center"} gap={4}>
            <IconButton
                variant={"ghost"} rounded="full" size={"sm"}
                onClick={() => {
                    if (recording.start && recording.end) {
                        setSelectedArea({ start: recording.start, end: recording.end });
                    }
                    if (selectedArea) {
                        setTimeout(() => {
                            setAudioPlaying(false);
                            setMimicPlaying(true);
                            setShouldToggleAudio(true); // Set flag to toggle mimicPlaying after audioPlaying becomes false
                        }, 0);
                    } else {
                        setMimicPlaying(true);
                    }
                }}
            >
                <FaPlay />
            </IconButton>
            <Text>
                録音 → オリジナルの順で再生
            </Text>
        </Flex>
    )
}