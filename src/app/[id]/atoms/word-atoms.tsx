import { atom } from "jotai";

export interface Word {
    text: string;
    start: number;
    end: number;
}

export const wordsAtom = atom<Word[]>([])

export const hoveredWordIndexAtom = atom<number | null>();

export const selectionAreaAtom = atom<null | {start: number, end : number}>(null);