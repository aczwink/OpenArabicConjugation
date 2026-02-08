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

import { ConjugationRule, ToLongVowel, Vowel } from "../../../Conjugation";
import { Tense, Voice } from "../../../Definitions";
import { VerbStem1Data } from "../../../Verb";
import { VerbRoot } from "../../../VerbRoot";
import { ExtractMiddleRadicalTashkilVowel, ExtractPresentMiddleRadicalVowel, ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

export function HollowStem1Template(root: VerbRoot, stemData: VerbStem1Data<ModernStandardArabicStem1ParametersType>, voice: Voice): ConjugationRule[] | undefined
{
    const perfectLongVowel = (voice === Voice.Active) ? Vowel.LongA : Vowel.LongI;
    const perfectShortVowel = (voice === Voice.Active) ? ExtractMiddleRadicalTashkilVowel(stemData.stemParameterization) : Vowel.ShortI;

    const presentShortVowel = (voice === Voice.Active) ? ExtractPresentMiddleRadicalVowel(stemData.stemParameterization) : Vowel.ShortA;
    const presentLongVowel = (voice === Voice.Active) ? ToLongVowel(presentShortVowel as any) : Vowel.LongA;

    return [
        {
            conditions: { tense: Tense.Present },
            symbols: [root.r1, root.r3],
            children: [
                {
                    conditions: { doesSuffixBeginWithSukun: false },
                    vowels: [presentLongVowel],
                },
                {
                    conditions: { doesSuffixBeginWithSukun: true },
                    vowels: [presentShortVowel],
                }
            ]
        },
        {
            conditions: { tense: Tense.Perfect },
            symbols: [root.r1, root.r3],
            children: [
                {
                    conditions: { doesSuffixBeginWithSukun: false },
                    vowels: [perfectLongVowel],
                },
                {
                    conditions: { doesSuffixBeginWithSukun: true },
                    vowels: [perfectShortVowel],
                }
            ]
        }
    ];
}