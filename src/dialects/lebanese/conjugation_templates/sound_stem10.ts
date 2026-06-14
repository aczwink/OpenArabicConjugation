/**
 * OpenArabicConjugation
 * Copyright (C) 2024-2026 Amir Czwink (amir130@hotmail.de)
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
import { Letter, Tense, Person, ConjugationParams } from "../../../Definitions";
import { VerbRoot } from "../../../VerbRoot";

export function SoundStem10ConjugationTemplate(root: VerbRoot, params: ConjugationParams): ConjugationRule[]
{
    return [
        {
            conditions: {},
            symbols: [Letter.Siin, Letter.Ta, root.r1, root.r2, root.r3],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    emphasize: (params.person === Person.Third) ? 1 : 3,
                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.ShortA]
                },
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.ShortI,
                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.ShortI],
                    children: [
                        {
                            conditions: { hasPresentVowelSuffix: true },
                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.Sukun]
                        }
                    ],
                },
            ]
        },
    ];
}