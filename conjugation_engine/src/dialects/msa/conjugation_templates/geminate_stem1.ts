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
import { Letter, Mood, Person, Tense, VerbType, Voice } from "../../../Definitions";
import { VerbStem1Data } from "../../../Verb";
import { VerbRoot } from "../../../VerbRoot";
import { ExtractPresentMiddleRadicalVowel, ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

export function GeminateStem1Template(root: VerbRoot, stemData: VerbStem1Data<ModernStandardArabicStem1ParametersType>, voice: Voice): ConjugationRule[] | undefined
{
    const perfectVowel = (voice === Voice.Active) ? Vowel.ShortA : Vowel.ShortU;
    const presentVowel = (voice === Voice.Active) ? ExtractPresentMiddleRadicalVowel(stemData.stemParameterization) : Vowel.ShortA;

    if(root.r1 === Letter.Waw)
    {
        return [
            {
                conditions: { mood: Mood.Imperative, doesSuffixBeginWithSukun: true },
                prefixVowel: Vowel.LongI,
                symbols: [root.r2, root.r3],
                vowels: [presentVowel],
            },
            {
                conditions: { tense: Tense.Present, doesSuffixBeginWithSukun: false },
                symbols: [root.r1, root.r2, root.r3],
                vowels: [presentVowel, Vowel.Sukun],
            },
            {
                conditions: { tense: Tense.Present, voice: Voice.Passive, doesSuffixBeginWithSukun: true },
                prefixVowel: Vowel.LongU,
                symbols: [root.r2, root.r3],
                vowels: [presentVowel],
            },
            {
                conditions: { tense: Tense.Perfect, doesSuffixBeginWithSukun: false, person: Person.Third },
                symbols: [root.r1, root.r2, root.r3],
                vowels: [perfectVowel, Vowel.Sukun],
            },
            {
                conditions: {},
                base: { verbType: VerbType.Sound },
            }
        ];
    }

    return [
        {
            conditions: { tense: Tense.Present, doesSuffixBeginWithSukun: false },
            symbols: [root.r1, root.r2, root.r3],
            vowels: [presentVowel, Vowel.Sukun],
        },
        {
            conditions: { tense: Tense.Perfect, doesSuffixBeginWithSukun: false, person: Person.Third },
            symbols: [root.r1, root.r2, root.r3],
            vowels: [perfectVowel, Vowel.Sukun],
        },
        {
            conditions: {},
            base: { verbType: VerbType.Sound },
        }
    ];
}