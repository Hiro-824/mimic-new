import { atom } from "jotai";
import { atomFamily, atomWithStorage } from 'jotai/utils'

export type Recording = {
    audioURL: string;
    blob: Blob;
    id: string;
    itemId: string;
    start: number | null;
    end: number | null;
    recDate: string;
};

export const micPermissionAtomFamily = atomFamily((id: string) => atom(false));

export const isRecordingAtomFamily = atomFamily((id: string) => atom(false));

export const autoRecordOptionAtomFamily = atomFamily((id: string) => atom<autoRecordOption>('none'));

export type autoRecordOption = 'none' | 'asStart' | 'asEnd';

export const recordingsAtom = atomWithStorage<Recording[]>("recordings", []);