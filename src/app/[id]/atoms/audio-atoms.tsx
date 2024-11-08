import { atom } from 'jotai';

export const audioAtom = atom<HTMLAudioElement | null>(null)

export const audioPlayingAtom = atom(false);

export const audioCurrentTimeAtom = atom(0);