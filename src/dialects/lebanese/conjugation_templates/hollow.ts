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
import { ConjugationParams, Letter, Person, Tense } from "../../../Definitions";
import { VerbRoot } from "../../../VerbRoot";
import { Stem8AssimilateTa } from "../../msa/conjugation/stem8";
import { LebaneseStem1Context } from "../LebaneseDialectMetadata";

export function HollowConjugationTemplate(root: VerbRoot, params: ConjugationParams): ConjugationRule[] | undefined
{
    const stem8r1 = Stem8AssimilateTa(root.r1);
    
    return [
        {
            conditions: { stem: 1 },
            symbols: [root.r1, root.r3],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    vowels: [(params.person === Person.Third) ? Vowel.LongA : Vowel.ShortI]
                },
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.Sukun,
                    children: [
                        {
                            conditions: { stemParameters: LebaneseStem1Context.PastI_PresentA },
                            vowels: [Vowel.LongA],
                        },
                        {
                            conditions: { stemParameters: LebaneseStem1Context.PastI_PresentI },
                            vowels: [Vowel.LongI],
                        },
                        {
                            conditions: { stemParameters: LebaneseStem1Context.PastI_PresentU },
                            vowels: [Vowel.LongU],
                        },
                    ]
                }
            ]
        },
        {
            conditions: { stem: 3 },
            symbols: [root.r1, root.r2, root.r3],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    emphasize: (params.person === Person.Third) ? undefined : 1,
                    vowels: [Vowel.LongA, Vowel.ShortA]
                },
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.Sukun,
                    vowels: [Vowel.LongA, Vowel.ShortI],
                    children: [
                        {
                            conditions: { hasPresentVowelSuffix: true },
                            vowels: [Vowel.LongA, Vowel.Sukun]
                        },
                    ]
                },
            ]
        },
        {
            conditions: { stem: 7 },
            symbols: [Letter.Nun, root.r1, root.r3],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    vowels: [Vowel.Sukun, (params.person === Person.Third) ? Vowel.LongA : Vowel.ShortI]
                },
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.ShortI,
                    vowels: [Vowel.Sukun, Vowel.LongA]
                },
            ]
        },
        {
            conditions: { stem: 8 },
            symbols: [stem8r1.r1, stem8r1.ta, root.r3],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    vowels: [Vowel.Sukun, (params.person === Person.Third) ? Vowel.LongA : Vowel.ShortA]
                },
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.ShortI,
                    vowels: [Vowel.Sukun, Vowel.LongA]
                },
            ]
        },
    ];
}