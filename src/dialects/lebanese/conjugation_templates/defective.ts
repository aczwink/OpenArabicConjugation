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
import { Tense, Person, Gender, Numerus, Letter, Mood } from "../../../Definitions";
import { VerbRoot } from "../../../VerbRoot";
import { Stem8AssimilateTa } from "../../msa/conjugation/stem8";
import { LebaneseStem1Context } from "../LebaneseDialectMetadata";

export function DefectiveStemConjugationTemplate(root: VerbRoot): ConjugationRule[] | undefined
{
    const stem8r1 = Stem8AssimilateTa(root.r1);
    
    return [
        {
            conditions: { stem: 1 },
            symbols: [root.r1, root.r2],
            children: [
                {
                    conditions: { tense: Tense.Perfect, stemParameters: [LebaneseStem1Context.DefectiveType1WithPrefixA, LebaneseStem1Context.PastA_PresentA, LebaneseStem1Context.PastA_PresentI] },
                    vowels: [Vowel.ShortA]
                },
                {
                    conditions: { tense: Tense.Perfect, person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
                    vowels: [Vowel.ShortI]
                },
                {
                    conditions: { tense: Tense.Perfect, person: Person.Third },
                    symbols: [root.r1, root.r2, Letter.Ya],
                    vowels: [Vowel.ShortI, Vowel.Sukun]
                },
                {
                    conditions: {},
                    vowels: [Vowel.Sukun],
                    children: [
                        {
                            conditions: { tense: Tense.Present },
                            prefixVowel: Vowel.ShortI,
                            children: [
                                {
                                    conditions: { stemParameters: LebaneseStem1Context.DefectiveType1WithPrefixA },
                                    prefixVowel: Vowel.ShortA
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            conditions: { stem: 2 },
            prefixVowel: Vowel.Sukun,
            symbols: [root.r1, root.r2, root.r2],
            vowels: [Vowel.ShortA, Vowel.Sukun]
        },
        {
            conditions: { stem: 3 },
            prefixVowel: Vowel.Sukun,
            symbols: [root.r1, root.r2],
            vowels: [Vowel.LongA]
        },
        {
            conditions: { stem: 5 },
            symbols: [Letter.Ta, root.r1, root.r2, root.r2],
            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun],
            children: [
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.ShortI,
                }
            ]
        },
        {
            conditions: { stem: 6 },
            symbols: [Letter.Ta, root.r1, root.r2],
            vowels: [Vowel.Sukun, Vowel.LongA],
            children: [
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.ShortI,
                }
            ]
        },
        {
            conditions: { stem: 7 },
            symbols: [Letter.Nun, root.r1, root.r2],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    vowels: [Vowel.Sukun, Vowel.ShortA]
                },
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.ShortI,
                    vowels: [Vowel.Sukun, Vowel.ShortI]
                },
            ]
        },
        {
            conditions: { stem: 8 },
            symbols: [stem8r1.r1, stem8r1.ta, root.r2],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    vowels: [Vowel.Sukun, Vowel.ShortA],
                },
                {
                    conditions: {},
                    prefixVowel: Vowel.ShortI,
                    vowels: [Vowel.Sukun, Vowel.Sukun],
                    children: [
                        {
                            conditions: { mood: Mood.Imperative },
                            vowels: [Vowel.Sukun, Vowel.ShortI],
                        },
                    ],
                },
            ]
        },
        {
            conditions: { stem: 10 },
            symbols: [Letter.Siin, Letter.Ta, root.r1, root.r2, root.r2],
            vowels: [Vowel.Sukun, Vowel.Sukun, Vowel.ShortA, Vowel.Sukun],
            children: [
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.ShortI,
                },
            ]
        },
    ];
}