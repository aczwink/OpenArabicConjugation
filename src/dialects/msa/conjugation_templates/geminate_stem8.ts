/**
 * OpenArabicConjugation
 * Copyright (C) 2025-2026 Amir Czwink (amir130@hotmail.de)
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
import { Verb } from "../../../Verb";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";
import { Stem8AssimilateTa } from "../conjugation/stem8";

export function GeminateStem8Template(stemData: Verb<ModernStandardArabicStem1ParametersType>, voice: Voice): ConjugationRule[] | undefined
{
    const root = stemData.root;

    const taVowel = (voice === Voice.Active) ? Vowel.ShortA : Vowel.ShortU;
    const perfectR2Vowel = (voice === Voice.Active) ? Vowel.ShortA : Vowel.ShortI;
    const presentR2Vowel = (voice === Voice.Active) ? Vowel.ShortI : Vowel.ShortA;

    const r1assim = Stem8AssimilateTa(root.r1);

    return [
        {
            conditions: { mood: Mood.Imperative },
            symbols: [r1assim.r1, r1assim.ta, root.r2, root.r3],
            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.ShortI],
            children: [
                {
                    conditions: { hasPresentVowelSuffix: true },
                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun],
                }
            ]
        },
        {
            conditions: { mood: Mood.Jussive },
            symbols: [r1assim.r1, r1assim.ta, root.r2, root.r3],
            vowels: [Vowel.Sukun, Vowel.ShortA, presentR2Vowel],
            children: [
                {
                    conditions: { hasPresentVowelSuffix: true },
                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun],
                }
            ]
        },
        {
            conditions: { tense: Tense.Present },
            symbols: [r1assim.r1, r1assim.ta, root.r2, root.r3],
            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun],
            children: [
                {
                    conditions: { numerus: Numerus.Plural, gender: Gender.Female },
                    vowels: [Vowel.Sukun, Vowel.ShortA, presentR2Vowel],
                },
            ],
        },
        {
            conditions: { tense: Tense.Perfect },
            symbols: [r1assim.r1, r1assim.ta, root.r2, root.r3],
            vowels: [Vowel.Sukun, taVowel, perfectR2Vowel],
            children: [
                {
                    conditions: { person: Person.Third, numerus: Numerus.Plural, gender: Gender.Female },
                },
                {
                    conditions: { person: Person.Third },
                    vowels: [Vowel.Sukun, taVowel, Vowel.Sukun]
                },
            ]
        },
        
    ];
}