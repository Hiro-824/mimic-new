import { atom } from "jotai";
import { atomFamily } from 'jotai/utils'

export interface Word {
    text: string;
    start: number;
    end: number;
}

/*

export const wordsAtom = atom<Word[]>([])

export const hoveredWordIndexAtom = atom<number | null>();

export const selectedAreaAtom = atom<null | {start: number, end : number}>(null);

*/

export const wordsAtomFamily = atomFamily((id: string) => atom<Word[]>([]));

export const hoveredWordIndexAtomFamily = atomFamily((id: string) => atom<number | null>(null));

export const selectedAreaAtomFamily = atomFamily((id: string) => atom<null | { start: number; end: number }>(null));
