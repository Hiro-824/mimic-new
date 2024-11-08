import { Slider } from "@/components/ui/slider"
import { useAtom } from "jotai";
import { audioAtom, audioCurrentTimeAtom, audioPlayingAtom } from "../atoms/audio-atoms";

export const PlaybackSlider = () => {

    const [audio] = useAtom(audioAtom)

    const [audioCurrentTime] = useAtom(audioCurrentTimeAtom);

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