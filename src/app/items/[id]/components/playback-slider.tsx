import { Slider } from "@/components/ui/slider"
import { useAtom } from "jotai";
import { audioAtomFamily, audioCurrentTimeAtomFamily, audioPlayingAtomFamily } from "../atoms/audio-atoms";

export const PlaybackSlider = ({ id }: { id: string }) => {

    const [audio] = useAtom(audioAtomFamily(id))

    const [audioCurrentTime] = useAtom(audioCurrentTimeAtomFamily(id));

    const audioJump = (targetSecond: number) => {
        if (!isNaN(targetSecond) && isFinite(targetSecond) && audio) {
            audio.currentTime = targetSecond;
        }
    };

    return (
        <Slider
            max={audio?.duration} 
            value={[audioCurrentTime]} 
            size={"sm"} 
            variant={"solid"} 
            colorPalette={"cyan"}
            onValueChange={(e) => audioJump(e.value[0])}
        />
    )
}