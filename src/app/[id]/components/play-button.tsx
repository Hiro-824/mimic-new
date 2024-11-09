import { IconButton } from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useAtom } from "jotai";
import { audioPlayingAtomFamily } from "../atoms/audio-atoms";

export const PlayButton = ({id}: {id: string}) => {

    const [audioPlaying, setAudioPlaying] = useAtom(audioPlayingAtomFamily(id));

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