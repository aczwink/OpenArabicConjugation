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
import { Letter, Mood, Tense, VerbType, Voice } from "../../../Definitions";
import { VerbStem1Data } from "../../../Verb";
import { VerbRoot } from "../../../VerbRoot";
import { ExtractPresentMiddleRadicalVowel, ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

export function AssimilatedStem1Template(root: VerbRoot, stemData: VerbStem1Data<ModernStandardArabicStem1ParametersType>): ConjugationRule[] | undefined
{
    const r2tashkil = ExtractPresentMiddleRadicalVowel(stemData.stemParameterization);
    const prefixVowel = (r2tashkil === Vowel.ShortU) ? Vowel.LongU : Vowel.LongI;

    if(root.r1 === Letter.Waw)
    {
        return [
            {
                conditions: { tense: Tense.Present },
                symbols: [root.r2, root.r3],
                vowels: [r2tashkil],
                children: [
                    {
                        conditions: { voice: Voice.Passive },
                        prefixVowel: Vowel.LongU,
                        symbols: [root.r2, root.r3],
                        vowels: [Vowel.ShortA],
                    }
                ]
            },
            {
                conditions: {},
                base: { verbType: VerbType.Sound }
            }
        ];
    }

    return [
        {
            conditions: { mood: Mood.Imperative },
            prefixVowel,
            symbols: [root.r2, root.r3],
            vowels: [r2tashkil],
        },
        {
            conditions: { voice: Voice.Passive, tense: Tense.Present },
            prefixVowel: Vowel.LongU,
            symbols: [root.r2, root.r3],
            vowels: [Vowel.ShortA],
        },
        {
            conditions: {},
            base: { verbType: VerbType.Sound }
        }
    ];
}