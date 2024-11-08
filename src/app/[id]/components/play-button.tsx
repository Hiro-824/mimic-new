import { IconButton } from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useAtom } from "jotai";
import { audioPlayingAtom } from "../atoms/audio-atoms";

export const PlayButton = () => {

    const [audioPlaying, setAudioPlaying] = useAtom(audioPlayingAtom);

    return (
        <IconButton
            variant={"ghost"} rounded="full" size={"xl"}
            onClick={() => {
                setAudioPlaying((prev) => !prev);
            }}
        >
            {audioPlaying ? <FaPause /> : <FaPlay />}
        </IconButton>
    )
}