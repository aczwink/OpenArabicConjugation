/**
 * OpenArabicConjugation
 * Copyright (C) 2024-2025 Amir Czwink (amir130@hotmail.de)
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

import { Gender, Letter, Mood, Numerus, Person, Tashkil, Tense } from "./Definitions";
import { ConjugationVocalized } from "./Vocalization";

export enum Vowel
{
    BrokenA,
    DiphtongAj,
    LongA,
    LongI,
    LongU,
    ShortA,
    ShortI,
    ShortU,
    Sukun
}

export interface ConjugationItem
{
    consonant: Letter;
    emphasis?: boolean;
    followingVowel: Vowel;
}

export interface ConjugationRule
{
    children?: ConjugationRule[];
    conditions: {
        doesSuffixBeginWithSukun?: true;
        gender?: Gender;
        hasPresentVowelSuffix?: true;
        mood?: Mood;
        numerus?: Numerus;
        person?: Person;
        stemParameters?: string;
        tense?: Tense;
    };
    emphasize?: number;
    prefixVowel?: Vowel;
    symbols?: Letter[];
    vowels?: Vowel[];
}

export interface ConjugationRuleMatchResult
{
    emphasize?: number;
    prefixVowel?: Vowel;
    symbols: Letter[];
    vowels: Vowel[];
}

export interface ConjugatedWord
{
    items: ConjugationItem[];
    final?: Letter;
}

export interface SuffixResult
{
    final?: Letter | ConjugationItem;
    prefinal?: ConjugationItem;
    previousVowel: Vowel;
}

//TODO: these are there for integration into current conjugtion pipeline. They should be removed as soon as code is migrated
export function _TODO_ToConjugationVocalized(word: ConjugatedWord)
{
    const result: ConjugationVocalized[] = [];
    for (const item of word.items)
    {
        switch(item.followingVowel)
        {
            case Vowel.BrokenA:
                result.push({
                    letter: item.consonant,
                    tashkil: Tashkil.Fatha
                });
                result.push({
                    letter: Letter.AlefMaksura,
                    tashkil: Tashkil.AlefMaksuraMarker,
                });
                break;

            case Vowel.DiphtongAj:
                result.push({
                    letter: item.consonant,
                    tashkil: Tashkil.Fatha
                });
                result.push({
                    letter: Letter.Ya,
                    tashkil: Tashkil.Sukun,
                });
                break;

            case Vowel.LongA:
                result.push({
                    letter: item.consonant,
                    tashkil: Tashkil.Fatha
                });
                result.push({
                    letter: Letter.Alef,
                    tashkil: Tashkil.LongVowelMarker,
                });
                break;

            case Vowel.LongI:
                result.push({
                    letter: item.consonant,
                    tashkil: Tashkil.Kasra
                });
                result.push({
                    letter: Letter.Ya,
                    tashkil: Tashkil.LongVowelMarker,
                });
                break;

            case Vowel.LongU:
                result.push({
                    letter: item.consonant,
                    tashkil: Tashkil.Dhamma
                });
                result.push({
                    letter: Letter.Waw,
                    tashkil: Tashkil.LongVowelMarker,
                });
                break;

            default:
                result.push({
                    emphasis: item.emphasis,
                    letter: item.consonant,
                    tashkil: _TODO_VowelToTashkil(item.followingVowel),
                });
                break;
        }
    }

    if(word.final !== undefined)
    {
        result.push({
            letter: word.final,
            tashkil: Tashkil.EndOfWordMarker,
        });
    }

    return result;
}

export function _TODO_TashkilToVowel(taskil: Tashkil)
{
    switch(taskil)
    {
        case Tashkil.Dhamma:
            return Vowel.ShortU;
        case Tashkil.Fatha:
            return Vowel.ShortA;
        case Tashkil.Kasra:
            return Vowel.ShortI;
        case Tashkil.Sukun:
            return Vowel.Sukun;
    }
    throw new Error("_TODO_TashkilToVowel: " + taskil);
}

export function _TODO_VowelToTashkil(vowel: Vowel)
{
    switch(vowel)
    {
        case Vowel.ShortA:
            return Tashkil.Fatha;
        case Vowel.ShortI:
            return Tashkil.Kasra;
        case Vowel.ShortU:
            return Tashkil.Dhamma;
        case Vowel.Sukun:
            return Tashkil.Sukun;
    }
    throw new Error("_TODO_VowelToTashkil: " + vowel);
}