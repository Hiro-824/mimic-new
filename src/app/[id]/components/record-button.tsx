"use client"

import { Button, Icon } from "@chakra-ui/react";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import { useAtom } from "jotai";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { autoRecordOptionAtomFamily, isRecordingAtomFamily, recordingsAtomFamily } from "../atoms/recording-atoms";
import { Recording } from "../atoms/recording-atoms";
import { audioPlayingAtomFamily } from "../atoms/audio-atoms";
import { selectedAreaAtomFamily } from "../atoms/word-atoms";

export const RecordButton = ({ id }: { id: string }) => {

    const [recorder, setRecorder] = useState<RecordRTC | null>(null);

    const [isRecording, setIsRecording] = useAtom(isRecordingAtomFamily(id));

    const [recordings, setRecordings] = useAtom(recordingsAtomFamily(id));

    const [audioPlaying, setAudioPlaying] = useAtom(audioPlayingAtomFamily(id));

    const [option, setOption] = useAtom(autoRecordOptionAtomFamily(id));

    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtomFamily(id));
    
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const seconds = now.getSeconds();
        return `${year}/${month}/${date} ${hour}:${minute}:${seconds}`;
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });
            const newRecorder = new RecordRTC(stream, { type: "audio" });
            newRecorder.startRecording();
            setRecorder(newRecorder);
            setIsRecording(true);

        } catch (err) {
            console.log(err);
        }
    };

    const stopRecording = () => {
        if (recorder) {
            recorder.stopRecording(() => {
                const blob = recorder.getBlob();
                setIsRecording(false);
                setOption("none");

                const id =
                    Math.random().toString(32).substring(2) +
                    new Date().getTime().toString(32);

                const newRecording: Recording = {
                    audioURL: URL.createObjectURL(blob),
                    blob,
                    id,
                    start: selectedArea ? selectedArea.start : null,
                    end: selectedArea ? selectedArea.end : null,
                    recDate: getCurrentDate(),
                };

                setRecordings([...recordings, newRecording]);
            });
        }
    };

    useEffect(() => {
        return () => {
            if (recorder) {
                recorder.destroy();
            }
        };
    }, [recorder]);

    useEffect(() => {
        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    }, [isRecording]);

    useEffect(() => {
        if (audioPlaying) {
            if (option === "asStart") setIsRecording(true);
            if (option === "asEnd") setIsRecording(false);
        } else {
            if (option === "asEnd") setIsRecording(true);
            if (option === "asStart") setIsRecording(false);
        }
    }, [audioPlaying]);

    return (
        <Button
            backgroundColor="blue.100"
            color="black"
            borderRadius="full"
            _hover={{ backgroundColor: 'blue.200' }}
            _active={{ backgroundColor: 'blue.300' }}
            fontWeight="bold"
            h={"32px"}
            px={6}
            width={"100%"}
            onClick={() => {
                setIsRecording((prev) => !prev);
            }}
        >
            <Icon size={"sm"}>
                {isRecording ? <FaStop /> : <FaMicrophone />}
            </Icon>
        </Button>
    )
}