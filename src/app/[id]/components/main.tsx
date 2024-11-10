"use client"

import { useEffect, useState } from "react";
import { Header } from "../../../components/header";
import { Overlay } from "./overlay";
import { useAtom } from "jotai";
import { audioAtomFamily, audioCurrentTimeAtomFamily, audioPlayingAtomFamily } from "../atoms/audio-atoms";
import { selectedAreaAtomFamily, wordsAtomFamily } from "../atoms/word-atoms";
import { Content } from "./content";
import { autoRecordOptionAtomFamily, isRecordingAtomFamily, micPermissionAtomFamily } from "../atoms/recording-atoms";

export const Main = ({ audioUrl, scriptUrl, id }: { audioUrl: string, scriptUrl: string, id: string }) => {

    const [audio, setAudio] = useAtom(audioAtomFamily(id))

    const [audioPlaying, setAudioPlaying] = useAtom(audioPlayingAtomFamily(id));

    const [audioCurrentTime, setAudioCurrentTime] = useAtom(audioCurrentTimeAtomFamily(id));

    const [words, setWords] = useAtom(wordsAtomFamily(id));

    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtomFamily(id));

    const [isRecording, setIsRecording] = useAtom(isRecordingAtomFamily(id));

    const [micPermission, setMicPermission] = useAtom(micPermissionAtomFamily(id))

    const [option, setOption] = useAtom(autoRecordOptionAtomFamily(id));

    useEffect(() => {
        async function checkMicPermission() {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                setMicPermission(true);
            } catch (error) {
                setMicPermission(false);
            }
        }

        checkMicPermission();
    }, []);

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
            if (option === "asStart") setIsRecording(true);
            if (option === "asEnd") setIsRecording(false);
            audio?.play().catch(() => {
                throw new Error("音声ファイルが見つかりません");
            });
        } else {
            if (option === "asEnd") setIsRecording(true);
            if (option === "asStart") setIsRecording(false);
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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === ' ') {
                event.preventDefault();
                setAudioPlaying((prev) => !prev);
            } else if (event.metaKey && event.key === 'r') {
                event.preventDefault();
                setIsRecording((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const updateAudioTime = () => {
            if (selectedArea && audio?.currentTime) {
                if (audio.currentTime >= words[selectedArea.end].end / 1000000 - 0.1) {
                    audio.pause();
                    setAudioPlaying(false);
                    audio.currentTime = words[selectedArea.start].start / 1000000
                }
                if (audio.currentTime <= words[selectedArea.start].start / 1000000 - 0.1) {
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
            <Overlay id={id} />
            <Content id={id} />
        </>
    );
}