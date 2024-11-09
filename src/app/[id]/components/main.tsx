"use client"

import { useEffect, useState } from "react";
import { Header } from "../../../components/header";
import { Overlay } from "./overlay";
import { useAtom } from "jotai";
import { audioAtom, audioCurrentTimeAtom, audioPlayingAtom } from "../atoms/audio-atoms";
import { selectedAreaAtom, wordsAtom } from "../atoms/word-atoms";
import { Content } from "./content";
//import { useHotkeys } from 'react-hotkeys-hook';
import { isRecordingAtom } from "../atoms/recording-atoms";

export const Main = ({ audioUrl, scriptUrl }: { audioUrl: string, scriptUrl: string }) => {

    const [audio, setAudio] = useAtom(audioAtom)

    const [audioPlaying, setAudioPlaying] = useAtom(audioPlayingAtom);

    const [audioCurrentTime, setAudioCurrentTime] = useAtom(audioCurrentTimeAtom);

    const [words, setWords] = useAtom(wordsAtom);
    
    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtom);

    const [isRecording, setIsRecording] = useAtom(isRecordingAtom);
    
    /*
    useHotkeys(' ', (event) => {
        event.preventDefault();
        setAudioPlaying((prev) => !prev);
    });

    useHotkeys('meta+r', (event) => {
        setIsRecording((prev) => !prev);
        event.preventDefault();
    });
*/

    useEffect(() => {
        if (!audio || audio.currentSrc != audioUrl) {
            setAudio(new Audio(audioUrl))
        }
    })

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(
                scriptUrl
            );
            setWords(await res.json());
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (audioPlaying) {
            audio?.play().catch(() => {
                throw new Error("音声ファイルが見つかりません");
            });
        } else {
            audio?.pause();
        }
        return () => {
            audio?.pause();
        };
    }, [audio, audioPlaying]);

    useEffect(() => {
        const onEnded = () => {
            setAudioPlaying(false);
            audio?.pause();
        };

        audio?.addEventListener("ended", onEnded);
        return () => {
            audio?.removeEventListener("ended", onEnded);
        };
    }, [audio, setAudioPlaying]);

    /*
    useEffect(() => {
        const onTimeupdate = () => {
            setAudioCurrentTime(audio?.currentTime ?? 0);
        };

        audio?.addEventListener("timeupdate", onTimeupdate);
        return () => {
            audio?.removeEventListener("timeupdate", onTimeupdate);
        };
    }, [audio, setAudioCurrentTime]);*/

    useEffect(() => {
        let animationFrameId: number;

        const updateAudioTime = () => {
            if(selectedArea && audio?.currentTime) {
                if(audio.currentTime >= words[selectedArea.end].end / 1000000 - 0.1) {
                    audio.pause();
                    setAudioPlaying(false);
                    audio.currentTime = words[selectedArea.start].start / 1000000
                }
                if(audio.currentTime <= words[selectedArea.start].start / 1000000 - 0.1) {
                    audio.pause();
                    setAudioPlaying(false);
                    audio.currentTime = words[selectedArea.start].start / 1000000
                }
            }
            setAudioCurrentTime(audio?.currentTime ?? 0);
            animationFrameId = requestAnimationFrame(updateAudioTime);
        };

        // Start the loop
        if (audio) {
            animationFrameId = requestAnimationFrame(updateAudioTime);
        }

        // Cleanup on unmount
        return () => cancelAnimationFrame(animationFrameId);
    }, [audio, selectedArea]);

    return (
        <>
            <Header />
            <Overlay />
            <Content />
        </>
    );
}