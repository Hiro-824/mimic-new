import { atom } from "jotai";

export type Recording = {
    audioURL: string;
    blob: Blob;
    id: string;
    recDate: string;
};

export const isRecordingAtom = atom(false);

export const recordingsAtom = atom<Recording[]>([]);