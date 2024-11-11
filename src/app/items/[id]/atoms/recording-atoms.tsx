import { atom } from "jotai";
import { atomFamily } from 'jotai/utils'

export type Recording = {
    audioURL: string;
    blob: Blob;
    id: string;
    start: number | null;
    end: number | null;
    recDate: string;
};

/*

export const micPermissionAtom = atom(false);

export const isRecordingAtom = atom(false);

export const recordingsAtom = atom<Recording[]>([]);

export const autoRecordOptionAtom = atom<autoRecordOption>('none')

*/

export const micPermissionAtomFamily = atomFamily((id: string) => atom(false));

export const isRecordingAtomFamily = atomFamily((id: string) => atom(false));

export const recordingsAtomFamily = atomFamily((id: string) => atom<Recording[]>([]));

export const autoRecordOptionAtomFamily = atomFamily((id: string) => atom<autoRecordOption>('none'));

export type autoRecordOption = 'none' | 'asStart' | 'asEnd';