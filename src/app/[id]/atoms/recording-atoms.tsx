import { atom } from "jotai";

export type Recording = {
    audioURL: string;
    blob: Blob;
    id: string;
    start: number | null;
    end: number | null;
    recDate: string;
};

export const micPermissionAtom = atom(false);

export const isRecordingAtom = atom(false);

export const recordingsAtom = atom<Recording[]>([]);

export const autoRecordOptionAtom = atom<autoRecordOption>('none')

export type autoRecordOption = 'none' | 'asStart' | 'asEnd';