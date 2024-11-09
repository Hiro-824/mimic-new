"use client"

import { useEffect, useState } from "react";
import { Header } from "../../../components/header";
import Content from "./content";
import { Overlay } from "./overlay";
import { useAtom } from "jotai";
import { audioAtom, audioCurrentTimeAtom, audioPlayingAtom } from "../atoms/audio-atoms";
import { selectedAreaAtom, wordsAtom } from "../atoms/word-atoms";
import { Box, Text } from "@chakra-ui/react";

export default function Layout({ audioUrl, scriptUrl }: { audioUrl: string, scriptUrl: string }) {

    const [audio, setAudio] = useAtom(audioAtom)

    const [audioPlaying, setAudioPlaying] = useAtom(audioPlayingAtom);

    const [audioCurrentTime, setAudioCurrentTime] = useAtom(audioCurrentTimeAtom);

    const [words] = useAtom(wordsAtom);
    
    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtom);

    useEffect(() => {
        if (!audio || audio.currentSrc != audioUrl) {
            setAudio(new Audio(audioUrl))
        }
    })

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
            <Content
                onSelected={function (selection: { start: number; end: number; }): void {
                    setSelectedArea(selection);
                }}
            />
        </>
    );
}