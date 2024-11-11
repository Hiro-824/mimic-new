import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils'

/*
export const audioAtom = atom<HTMLAudioElement | null>(null)

export const audioPlayingAtom = atom(false);

export const audioCurrentTimeAtom = atom(0);
*/

export const audioAtomFamily = atomFamily((id: string) => atom<HTMLAudioElement | null>(null));

export const audioPlayingAtomFamily = atomFamily((id: string) => atom(false));

export const audioCurrentTimeAtomFamily = atomFamily((id: string) => atom(0));