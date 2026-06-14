/**
 * OpenArabicConjugation
 * Copyright (C) 2023-2026 Amir Czwink (amir130@hotmail.de)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * */

import { ConjugatedWord, ConjugationVocalizedToConjugatedWord, SpecialInitial, Vowel } from "./Conjugation";
import { BaseTashkil, ExtraTashkil, Letter, SpecialSymbols, Tashkil } from "./Definitions";

export type DisplayTashkil = BaseTashkil | Tashkil.Dhammatan | Tashkil.Fathatan | Tashkil.Kasratan;
export interface DisplayVocalized
{
    letter: Letter;
    tashkil?: DisplayTashkil;
    shadda: boolean;
    emphasis: boolean;
}

export interface ConjugationVocalized
{
    letter: Letter;
    tashkil: Tashkil;
    emphasis?: boolean;
}

export function MapLetterToComparisonEquivalenceClass(letter: Letter)
{
    switch(letter)
    {
        case Letter.AlefHamza:
        case Letter.AlefHamzaBelow:
        case Letter.AlefMadda:
            return Letter.Alef;
        case Letter.WawHamza:
            return Letter.Waw;
        case Letter.YaHamza:
            return Letter.Ya;
    }
    return letter;

    /*
            private MapWordToSearchVariant(word: string)
    {
        //map all chars to their basic form
        const ya = waw.replace(/[\u0649]/g, "\u064A");

        return ya;
    }
            */
}

function cmp(a: DisplayVocalized, b: DisplayVocalized)
{
    if(MapLetterToComparisonEquivalenceClass(a.letter) !== MapLetterToComparisonEquivalenceClass(b.letter))
        return 0;

    let match = 1;    
    if(a.letter !== b.letter)
        match -= 0.1;
    
    if(a.letter === b.letter)
    {
        const tashkilMatches = (a.tashkil === b.tashkil) || ( (a.tashkil === undefined) && (b.tashkil !== undefined) ) || ( (b.tashkil === undefined) && (a.tashkil !== undefined) );
        if(tashkilMatches)
        {
            if(a.shadda !== b.shadda)
                match -= 0.25;
        }
        else
            match = 0;
    }

    return match;
}

export function CompareVocalized(a: DisplayVocalized[], b: DisplayVocalized[])
{
    if(a.length !== b.length)
        return -1;
    if(a.length === 0)
        return 1;

    let sum = 0;
    for(let i = 0; i < a.length; i++)
    {
        const res = cmp(a[i], b[i]);
        if(res === 0)
            return 0;
        sum += res;
    }
    return sum / a.length;
}

export function ConvertFullyVocalized(vocalized: DisplayVocalized[])
{
    const result: ConjugationVocalized[] = [];

    for(let i = 0; i < vocalized.length; i++)
    {
        const prev = vocalized[i-1] as DisplayVocalized | undefined;
        const v = vocalized[i];

        if(v.tashkil === undefined)
        {
            if((v.letter === Letter.Alef) && (prev?.tashkil === Tashkil.Fatha))
            {
                result.push({
                    letter: Letter.Alef,
                    tashkil: Tashkil.LongVowelMarker,
                    emphasis: v.emphasis
                });
                continue;
            }
            else if((v.letter === Letter.Waw) && (prev?.tashkil === Tashkil.Dhamma))
            {
                result.push({
                    letter: Letter.Waw,
                    tashkil: Tashkil.LongVowelMarker,
                    emphasis: v.emphasis
                });
                continue;
            }
            else if((v.letter === Letter.Ya) && (prev?.tashkil === Tashkil.Kasra))
            {
                result.push({
                    letter: Letter.Ya,
                    tashkil: Tashkil.LongVowelMarker,
                    emphasis: v.emphasis
                });
                continue;
            }
            else if((i+1) === vocalized.length)
            {
                result.push({
                    letter: v.letter,
                    tashkil: Tashkil.EndOfWordMarker,
                    emphasis: v.emphasis
                });
                break;
            }
            
            throw new Error("Must be fully vocalized! Got: " + VocalizedWordTostring(vocalized));
        }
        
        if(v.shadda)
        {
            result.push({
                letter: v.letter,
                tashkil: Tashkil.Sukun,
                emphasis: v.emphasis
            });
        }

        result.push({
            letter: v.letter,
            tashkil: v.tashkil,
            emphasis: v.emphasis
        });
    }

    return result;
}

export function EqualsVocalized(a: DisplayVocalized[], b: DisplayVocalized[])
{
    //comparison is of strings is non trivial because the position of the shadda can be before or after the primary tashkil, also we have the emphasis optional field
    if(a.length !== b.length)
        return false;

    for (let i = 0; i < a.length; i++)
    {
        if(a[i].letter !== b[i].letter)
            return false;
        if(a[i].shadda !== b[i].shadda)
            return false;
        if(a[i].tashkil !== b[i].tashkil)
            return false;
    }

    return true;
}

export function ParseVocalizedPhrase(text: string)
{
    return text.split(" ").map(ParseVocalizedText);
}

export function ParseVocalizedText(text: string)
{
    const result: DisplayVocalized[] = [];

    for(let i = 0; i < text.length;)
    {
        while(text[i] === SpecialSymbols.Tatwiil)
            i++; //skip

        const letter = text[i++];
        let tashkil: Tashkil | undefined = undefined;
        let shadda = false;

        let parseTashkil = true;
        while(parseTashkil)
        {
            switch(text[i])
            {
                case Tashkil.Dhamma:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = Tashkil.Dhamma;
                    i++;
                    break;
                case Tashkil.Dhammatan:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = Tashkil.Dhammatan;
                    i++;
                    break;
                case Tashkil.Fatha:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = Tashkil.Fatha;
                    i++;
                    break;
                case Tashkil.Fathatan:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = Tashkil.Fathatan;
                    i++;
                    break;
                case Tashkil.Kasra:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = Tashkil.Kasra;
                    i++;
                    break;
                case Tashkil.Kasratan:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = Tashkil.Kasratan;
                    i++;
                    break;
                case ExtraTashkil.Shadda:
                    if(shadda)
                        throw new Error("Multiple shaddas are not allowed");
                    shadda = true;
                    i++;
                    break;
                case Tashkil.Sukun:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = Tashkil.Sukun;
                    i++;
                    break;
                case ExtraTashkil.DaggerAlef:
                    i++; //just skip
                    break;
                default:
                    parseTashkil = false;
            }
        }
        
        result.push({
            letter: letter as any,
            tashkil,
            shadda,
            emphasis: false,
        });
    }

    return result;
}

export function ReconstructFullyVocalizedWord(text: string, isDefinite: boolean): ConjugatedWord
{
    const baseParsed = ParseVocalizedText(text);

    if(isDefinite)
    {
        baseParsed.shift(); //remove alef
        const lam = baseParsed.shift();

        const fullyVocalized = ConvertFullyVocalized(baseParsed);
        const reconstructed = ConjugationVocalizedToConjugatedWord(fullyVocalized);

        if(lam?.tashkil === Tashkil.Sukun)
        {
            return {
                elements: [
                    { consonant: Letter.Lam, followingVowel: Vowel.Sukun, },
                    ...reconstructed.elements
                ],
                ending: reconstructed.ending,
                initial: SpecialInitial.Alef
            };
        }

        return {
            elements: reconstructed.elements,
            ending: reconstructed.ending,
            initial: SpecialInitial.AlefLam
        };
    }

    const fullyVocalized = ConvertFullyVocalized(baseParsed);
    const reconstructed = ConjugationVocalizedToConjugatedWord(fullyVocalized);

    return reconstructed;
}

interface VocalizedDiff
{
    diff: boolean;
    char: string;
    emphasis: boolean;
}
export function ToDiffStream(vocalized: DisplayVocalized[], reference: DisplayVocalized[]): VocalizedDiff[]
{
    function Convert(v: DisplayVocalized, diff: boolean)
    {
        const result: VocalizedDiff[] = [
            { char: v.letter, diff, emphasis: v.emphasis },
        ];
        if(v.shadda)
            result.push({ char: ExtraTashkil.Shadda, diff, emphasis: false });
        if(v.tashkil !== undefined)
            result.push({ char: v.tashkil, diff, emphasis: false });

        return result;
    }
    function ConvertCheckTashkil(v: DisplayVocalized, r: DisplayVocalized)
    {
        const result: VocalizedDiff[] = [
            { char: v.letter, diff: false, emphasis: v.emphasis },
        ];
        if(v.shadda)
        {
            const isEqual = (v.shadda === r.shadda) && (v.tashkil === r.tashkil);
            result.push({ char: ExtraTashkil.Shadda, diff: !isEqual, emphasis: false });
            if(v.tashkil !== undefined)
                result.push({ char: v.tashkil, diff: !isEqual, emphasis: false });
        }
        else if(v.tashkil !== undefined)
            result.push({ char: v.tashkil, diff: !(v.tashkil === r.tashkil), emphasis: false });

        return result;
    }
    function ToDiffStreamInner(vocalized: DisplayVocalized[], reference: DisplayVocalized[]): VocalizedDiff[]
    {
        //empty cases
        if(vocalized.length === 0)
        {
            if(reference.length > 0)
            {
                return [
                    { char: "\u2610", diff: true, emphasis: false }
                ];
            }
            return [];
        }
        else if(reference.length === 0)
            return vocalized.Values().Map(x => Convert(x, true).Values()).Flatten().ToArray();

        //check for lam-alef
        if( (vocalized.length > 1) && (vocalized[0].letter === Letter.Lam) && (vocalized[1].letter === Letter.Alef) )
        {
            if( (reference.length > 1) && (reference[0].letter === Letter.Lam) && (reference[1].letter === Letter.Alef) )
                return ConvertCheckTashkil(vocalized[0], reference[0]).concat(ConvertCheckTashkil(vocalized[1], reference[1]), ToDiffStreamInner(vocalized.slice(2), reference.slice(2)));
            return Convert(vocalized[0], true).concat(Convert(vocalized[1], true), ToDiffStreamInner(vocalized.slice(2), reference.slice(2)));
        }

        //default cases
        if(vocalized[0].letter === reference[0].letter)
            return ConvertCheckTashkil(vocalized[0], reference[0]).concat(ToDiffStreamInner(vocalized.slice(1), reference.slice(1)));
        else if(vocalized.length > reference.length)
            return Convert(vocalized[0], true).concat(ToDiffStreamInner(vocalized.slice(1), reference));
        else
            return ToDiffStreamInner(vocalized, reference.slice(1));
    }

    const missingAtBeginning = (vocalized[0].letter !== reference[0].letter) && (reference.length > vocalized.length);
    if(missingAtBeginning)
    {
        const result: VocalizedDiff[] = [
            { char: "\u2610", diff: true, emphasis: false }
        ];
        return result.concat(ToDiffStreamInner(vocalized, reference));
    }
    return ToDiffStreamInner(vocalized, reference);
}

export function VocalizedToString(v: DisplayVocalized)
{
    return v.letter + (v.shadda ? ExtraTashkil.Shadda : "") + (v.tashkil ? v.tashkil : "");
}

export function VocalizedWordTostring(vocalized: DisplayVocalized[])
{
    const str = vocalized.Values().Map(VocalizedToString).Join("");
    return str;
}