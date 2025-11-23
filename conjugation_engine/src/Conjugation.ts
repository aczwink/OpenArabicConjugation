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

import { Gender, Letter, Mood, Numerus, Person, Tashkil, Tense, VerbType, Voice } from "./Definitions";
import { ConjugationVocalized } from "./Vocalization";

export enum Vowel
{
    BrokenA,
    DiphtongAj,
    DiphtongAw,
    LongA,
    LongI,
    LongU,
    ShortA,
    ShortI,
    ShortU,
    Sukun
}

export interface ConjugationElement
{
    consonant: Letter;
    emphasis?: boolean;
    followingVowel: Vowel;
}

interface ConjugationRuleConditions
{
    doesSuffixBeginWithSukun?: boolean;
    gender?: Gender;
    hasPresentVowelSuffix?: true;
    mood?: Mood | Mood[];
    numerus?: Numerus;
    person?: Person;
    stemParameters?: string;
    tense?: Tense;
    voice?: Voice;
}

interface ConjugationRuleFull
{
    children?: ConjugationRule[];
    conditions: ConjugationRuleConditions;
    emphasize?: number;
    prefixVowel?: Vowel;
    symbols?: Letter[];
    vowels?: Vowel[];
}

interface BaseData
{
    verbType: VerbType;
}

interface ConjugationRuleBase
{
    conditions: ConjugationRuleConditions;
    base: BaseData;
}

export type ConjugationRule = ConjugationRuleBase | ConjugationRuleFull;

export interface ConjugationRuleMatchResult
{
    base?: BaseData;
    emphasize?: number;
    prefixVowel?: Vowel;
    symbols: Letter[];
    vowels: Vowel[];
}

export enum FinalVowel
{
    AlefMaksuraWithFathatan = -1,
    Kasratan = -2,
    None = -3,
}

export interface ConjugatedWord
{
    elements: ConjugationElement[];
    ending?: {
        consonant: Letter;
        finalVowel: FinalVowel | Vowel;
    };
}

export interface SuffixResult
{
    final?: Letter | ConjugationElement;
    prefinal?: ConjugationElement;
    previousVowel: Vowel;
}

export function ToLongVowel(vowel: Vowel.ShortA | Vowel.ShortI | Vowel.ShortU)
{
    switch(vowel)
    {
        case Vowel.ShortA:
            return Vowel.LongA;
        case Vowel.ShortI:
            return Vowel.LongI;
        case Vowel.ShortU:
            return Vowel.LongU;
    }
}

export function ToConjugationVocalized(element: ConjugationElement)
{
    function _TODO_VowelToTashkil(vowel: Vowel)
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

    const result: ConjugationVocalized[] = [];

    switch(element.followingVowel)
    {
        case Vowel.BrokenA:
            result.push({
                letter: element.consonant,
                tashkil: Tashkil.Fatha
            });
            result.push({
                letter: Letter.AlefMaksura,
                tashkil: Tashkil.AlefMaksuraMarker,
            });
            break;

        case Vowel.DiphtongAj:
            result.push({
                letter: element.consonant,
                tashkil: Tashkil.Fatha
            });
            result.push({
                letter: Letter.Ya,
                tashkil: Tashkil.Sukun,
            });
            break;

        case Vowel.DiphtongAw:
            result.push({
                letter: element.consonant,
                tashkil: Tashkil.Fatha
            });
            result.push({
                letter: Letter.Waw,
                tashkil: Tashkil.Sukun,
            });
            break;

        case Vowel.LongA:
            result.push({
                letter: element.consonant,
                tashkil: Tashkil.Fatha
            });
            result.push({
                letter: Letter.Alef,
                tashkil: Tashkil.LongVowelMarker,
            });
            break;

        case Vowel.LongI:
            result.push({
                letter: element.consonant,
                tashkil: Tashkil.Kasra
            });
            result.push({
                letter: Letter.Ya,
                tashkil: Tashkil.LongVowelMarker,
            });
            break;

        case Vowel.LongU:
            result.push({
                letter: element.consonant,
                tashkil: Tashkil.Dhamma
            });
            result.push({
                letter: Letter.Waw,
                tashkil: Tashkil.LongVowelMarker,
            });
            break;

        default:
            result.push({
                emphasis: element.emphasis,
                letter: element.consonant,
                tashkil: _TODO_VowelToTashkil(element.followingVowel),
            });
            break;
    }

    return result;
}

//TODO: these are there for integration into current conjugtion pipeline. They should be removed as soon as code is migrated
export function _TODO_ToConjugationVocalized(word: ConjugatedWord)
{
    const result: ConjugationVocalized[] = [];
    for (const element of word.elements)
        result.push(...ToConjugationVocalized(element));

    if(word.ending !== undefined)
    {
        throw new Error("TODO HJERE");
        /*result.push({
            letter: word.final,
            tashkil: Tashkil.EndOfWordMarker,
        });*/
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

export function _TODO_ConjugationVocalizedToConjugatedWord(vocalized: ConjugationVocalized[])
{
    function IsDiphtong(v: ConjugationVocalized | undefined, predecessor: ConjugationVocalized | undefined)
    {
        //diphtongs are /aj/ or /aw/, i.e. a ya or waw with sukun above it, while the predecessor needs to have a fatha
        return (
            (predecessor?.tashkil === Tashkil.Fatha)
            &&
            (v?.tashkil === Tashkil.Sukun)
            &&
            ( (v.letter === Letter.Waw) || (v.letter === Letter.Ya) )
        );
    }
    function IsLongVowel(vocalized: ConjugationVocalized, predecessor?: ConjugationVocalized)
    {
        const isLongAlef = (vocalized.letter === Letter.Alef) && (vocalized.tashkil === Tashkil.LongVowelMarker) && (predecessor?.tashkil === Tashkil.Fatha);
        const isLongYa = (vocalized.letter === Letter.Ya) && (vocalized.tashkil === Tashkil.LongVowelMarker) && (predecessor?.tashkil === Tashkil.Kasra);
        const isLongWaw = (vocalized.letter === Letter.Waw) && (vocalized.tashkil === Tashkil.LongVowelMarker) && (predecessor?.tashkil === Tashkil.Dhamma);

        return isLongAlef || isLongYa || isLongWaw;
    }

    const word: ConjugatedWord = {
        elements: []
    };

    for(let i = 0; i < vocalized.length; i++)
    {
        const entry = vocalized[i];
        const next: ConjugationVocalized | undefined = vocalized[i+1];

        if(entry.tashkil === Tashkil.EndOfWordMarker)
        {
            word.ending = {
                consonant: entry.letter,
                finalVowel: FinalVowel.None
            };
        }
        else if(entry.tashkil === Tashkil.Fathatan)
        {
            if((i === (vocalized.length - 2)) && (vocalized[vocalized.length - 1].letter === Letter.AlefMaksura) && ((vocalized[vocalized.length - 1].tashkil === Tashkil.EndOfWordMarker) || (vocalized[vocalized.length - 1].tashkil === Tashkil.AlefMaksuraMarker)))
            {
                word.ending = {
                    consonant: entry.letter,
                    finalVowel: FinalVowel.AlefMaksuraWithFathatan
                };
                return word;
            }
            else
            {
                vocalized.forEach(console.log);
                throw new Error("TODO: implement me");
            }
            /*word.ending = {
                consonant: entry.letter,
                finalVowel: FinalVowel.Fathatan
            };*/
        }
        else if(entry.tashkil === Tashkil.Kasratan)
        {
            word.ending = {
                consonant: entry.letter,
                finalVowel: FinalVowel.Kasratan,
            };
        }
        else if((next !== undefined) && IsLongVowel(next, entry))
        {
            switch(next.letter)
            {
                case Letter.Alef:
                    word.elements.push({
                        consonant: entry.letter,
                        followingVowel: Vowel.LongA,
                        emphasis: entry.emphasis,
                    });
                    i++;
                    break;
                case Letter.Waw:
                    word.elements.push({
                        consonant: entry.letter,
                        followingVowel: Vowel.LongU,
                        emphasis: entry.emphasis,
                    });
                    i++;
                    break;
                case Letter.Ya:
                    word.elements.push({
                        consonant: entry.letter,
                        followingVowel: Vowel.LongI,
                        emphasis: entry.emphasis,
                    });
                    i++;
                    break;
                default:
                    throw new Error(next.letter);
            }
        }
        else if((next !== undefined) && IsDiphtong(next, entry))
        {
            switch(next.letter)
            {
                case Letter.Waw:
                    word.elements.push({
                        consonant: entry.letter,
                        followingVowel: Vowel.DiphtongAw,
                        emphasis: entry.emphasis,
                    });
                    i++;
                    break;
                case Letter.Ya:
                    word.elements.push({
                        consonant: entry.letter,
                        followingVowel: Vowel.DiphtongAj,
                        emphasis: entry.emphasis,
                    });
                    i++;
                    break;
            }
        }
        else if(next?.tashkil === Tashkil.AlefMaksuraMarker)
        {
            word.elements.push({
                consonant: entry.letter,
                followingVowel: Vowel.BrokenA,
                emphasis: entry.emphasis
            });
            i++;
        }
        else
        {
            word.elements.push({
                consonant: entry.letter,
                followingVowel: _TODO_TashkilToVowel(entry.tashkil),
                emphasis: entry.emphasis
            });
        }
    }

    return word;
}