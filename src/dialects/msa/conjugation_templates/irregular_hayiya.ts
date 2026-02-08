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
import { Gender, Letter, Mood, Numerus, Person, Tense, Voice } from "../../../Definitions";
import { Verb } from "../../../Verb";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

export function IrregularHayiyaTemplate(stemData: Verb<ModernStandardArabicStem1ParametersType>, voice: Voice): ConjugationRule[] | undefined
{
    const root = stemData.root;
    const r1vowel = (voice === Voice.Active) ? Vowel.ShortA : Vowel.ShortU;

    return [
        {
            conditions: { tense: Tense.Present },
            children: [
                {
                    conditions: { numerus: Numerus.Dual },
                    symbols: [root.r1, root.r2, Letter.Ya],
                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.ShortA],
                },
                {
                    conditions: { numerus: Numerus.Plural, gender: Gender.Female },
                    symbols: [root.r1, root.r2],
                    vowels: [Vowel.Sukun, Vowel.DiphtongAj],
                },
                {
                    conditions: { mood: Mood.Imperative },
                    symbols: [root.r1, root.r2],
                    vowels: [Vowel.Sukun, Vowel.ShortA],
                },
                {
                    conditions: { hasPresentVowelSuffix: true },
                    symbols: [root.r1, root.r2],
                    vowels: [Vowel.Sukun, Vowel.ShortA],
                },
                {
                    conditions: { mood: Mood.Jussive },
                    symbols: [root.r1, root.r2],
                    vowels: [Vowel.Sukun, Vowel.ShortA],
                },
                {
                    conditions: {},
                    symbols: [root.r1, root.r2],
                    vowels: [Vowel.Sukun, Vowel.LongA],
                }
            ]
        },
        {
            conditions: { person: Person.Third, numerus: Numerus.Plural, gender: Gender.Male },
            symbols: [root.r1, root.r2, Letter.Ya],
            vowels: [r1vowel, Vowel.Sukun]
        },
        {
            conditions: { person: Person.Third, numerus: Numerus.Plural, gender: Gender.Female },
            symbols: [root.r1, root.r2],
            vowels: [r1vowel, Vowel.LongI]
        },
        {
            conditions: { person: Person.Third },
            symbols: [root.r1, root.r2, Letter.Ya],
            vowels: [r1vowel, Vowel.ShortI]
        },
        {
            conditions: {},
            symbols: [root.r1, root.r2],
            vowels: [r1vowel, Vowel.LongI]
        },
    ];
}