/**
 * OpenArabicConjugation
 * Copyright (C) 2026 Amir Czwink (amir130@hotmail.de)
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
import { Gender, Letter, Mood, Numerus, Person, Tense, VerbType, Voice } from "../../../Definitions";

export function IrregularAhyaTemplate(): ConjugationRule[] | undefined
{
    return [
        {
            conditions: { tense: Tense.Perfect, voice: Voice.Active, person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
            symbols: [Letter.Hamza, Letter.Hha, Letter.Ya],
            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.LongA]
        },
        {
            conditions: { mood: [Mood.Indicative, Mood.Subjunctive], voice: Voice.Passive, doesSuffixBeginWithSukun: false, hasPresentVowelSuffix: false },
            symbols: [Letter.Hha, Letter.Ya],
            vowels: [Vowel.Sukun, Vowel.LongA]
        },
        {
            conditions: {},
            base: {
                verbType: VerbType.Defective
            }
        }
    ];
}