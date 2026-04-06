/**
 * OpenArabicConjugation
 * Copyright (C) 2026 Amir Czwink (amir130@hotmail.de)
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

import { TashkilToVowel, ConjugatedWord, ConjugationElement, FinalVowel, Vowel } from "./Conjugation";
import { Letter } from "./Definitions";
import { DisplayVocalized } from "./Vocalization";

export enum PatternSymbol
{
    R1 = -1,
    R2 = -2,
    R3 = -3,
}

interface PatternElement
{
    consonant: Letter | PatternSymbol;
    followingVowel: Vowel;
}

export interface WordPattern
{
    elements: PatternElement[];
    ending?: {
        consonant: Letter | PatternSymbol;
        finalVowel: FinalVowel | Vowel;
    };
}

interface MatchResult
{
    r1?: Letter;
    r2?: Letter;
    r3?: Letter;
}

export function ApplyPattern(pattern: WordPattern, matched: MatchResult): ConjugatedWord
{
    function MapConsonant(consonant: Letter | PatternSymbol)
    {
        switch(consonant)
        {
            case PatternSymbol.R1:
                if(matched.r1 === undefined)
                    throw new Error("R1 is not defined");
                return matched.r1;
            case PatternSymbol.R2:
                if(matched.r2 === undefined)
                    throw new Error("R2 is not defined");
                return matched.r2;
            case PatternSymbol.R3:
                if(matched.r3 === undefined)
                    throw new Error("R3 is not defined");
                return matched.r3;
        }
        return consonant;
    }

    function MapElement(element: PatternElement): ConjugationElement
    {
        return {
            consonant: MapConsonant(element.consonant),
            followingVowel: element.followingVowel,
        };
    }

    return {
        elements: pattern.elements.map(MapElement),
        ending: (pattern.ending === undefined) ? undefined : {
            consonant: MapConsonant(pattern.ending.consonant),
            finalVowel: pattern.ending.finalVowel
        }
    };
}

export function MatchPatternAgainstWord(pattern: WordPattern, word: DisplayVocalized[]): MatchResult | null
{
    if(pattern.ending !== undefined)
    {
        if((pattern.elements.length+1) !== word.length)
            return null;
    }
    else if(pattern.elements.length !== word.length)
        return null;

    let r1: Letter | undefined, r2: Letter | undefined, r3: Letter | undefined;
    function MatchSymbol(symbol: PatternSymbol, value: Letter)
    {
        switch(symbol)
        {
            case PatternSymbol.R1:
                if((r1 === undefined) || (r1 === value))
                {
                    r1 = value;
                    return true;
                }
            case PatternSymbol.R2:
                if((r2 === undefined) || (r2 === value))
                {
                    r2 = value;
                    return true;
                }
            case PatternSymbol.R3:
                if((r3 === undefined) || (r3 === value))
                {
                    r3 = value;
                    return true;
                }
        }

        return false;
    }

    for(let i = 0; i < pattern.elements.length; i++)
    {
        const a = pattern.elements[i];
        const b = word[i];

        switch(a.consonant)
        {
            case PatternSymbol.R1:
            case PatternSymbol.R2:
            case PatternSymbol.R3:
                if(!MatchSymbol(a.consonant, b.letter))
                    return null;
                break;
            default:
                if(a.consonant !== b.letter)
                    return null;
        }

        if(a.followingVowel !== TashkilToVowel(b.tashkil!))
            return null;
    }

    if(pattern.ending !== undefined)
    {
        const b = word.Last();
        switch(pattern.ending.consonant)
        {
            case PatternSymbol.R1:
            case PatternSymbol.R2:
            case PatternSymbol.R3:
                if(!MatchSymbol(pattern.ending.consonant, b.letter))
                    return null;
                break;
            default:
                if(pattern.ending.consonant !== b.letter)
                    return null;
        }

        switch(pattern.ending.finalVowel)
        {
            case FinalVowel.None:
                if(b.tashkil !== undefined)
                    return null;
                break;
                default:
                    if(pattern.ending.finalVowel !== TashkilToVowel(b.tashkil!))
                        return null;
        }
    }

    return {
        r1,
        r2,
        r3
    };
}