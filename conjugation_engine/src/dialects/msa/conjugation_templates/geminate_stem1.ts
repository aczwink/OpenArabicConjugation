/**
 * OpenArabicConjugation
 * Copyright (C) 2025 Amir Czwink (amir130@hotmail.de)
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

import { ConjugationRule, Vowel } from "../../../Conjugation";
import { Gender, Mood, Numerus, Person, Tense, Voice } from "../../../Definitions";
import { VerbStem1Data } from "../../../Verb";
import { VerbRoot } from "../../../VerbRoot";
import { ExtractMiddleRadicalTashkilVowel, ExtractPresentMiddleRadicalVowel, ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

export function GeminateStem1Template(root: VerbRoot, stemData: VerbStem1Data<ModernStandardArabicStem1ParametersType>, voice: Voice): ConjugationRule[] | undefined
{
    const perfectVowelR1 = (voice === Voice.Active) ? Vowel.ShortA : Vowel.ShortU;
    const perfectVowelR2 = (voice === Voice.Active) ? ExtractMiddleRadicalTashkilVowel(stemData.stemParameterization) : Vowel.ShortI;
    const presentVowel = (voice === Voice.Active) ? ExtractPresentMiddleRadicalVowel(stemData.stemParameterization) : Vowel.ShortA;
    return [
        {
            conditions: { mood: Mood.Imperative },
            symbols: [root.r1, root.r2, root.r3],
            vowels: [Vowel.Sukun, presentVowel],
            children: [
                {
                    conditions: { hasPresentVowelSuffix: true },
                    vowels: [presentVowel, Vowel.Sukun],
                }
            ]
        },
        {
            conditions: { mood: Mood.Jussive },
            symbols: [root.r1, root.r2, root.r3],
            vowels: [Vowel.Sukun, presentVowel],
            children: [
                {
                    conditions: { hasPresentVowelSuffix: true },
                    vowels: [presentVowel, Vowel.Sukun],
                }
            ]
        },
        {
            conditions: { tense: Tense.Present },
            symbols: [root.r1, root.r2, root.r3],
            vowels: [presentVowel, Vowel.Sukun],
            children: [
                {
                    conditions: { doesSuffixBeginWithSukun: true },
                    vowels: [Vowel.Sukun, presentVowel],
                },
            ],
        },
        {
            conditions: { tense: Tense.Perfect },
            symbols: [root.r1, root.r2, root.r3],
            children: [
                {
                    conditions: { doesSuffixBeginWithSukun: true },
                    vowels: [perfectVowelR1, perfectVowelR2],
                },
                {
                    conditions: { person: Person.Third },
                    vowels: [perfectVowelR1, Vowel.Sukun],
                },
            ]
        },
        
    ];
}