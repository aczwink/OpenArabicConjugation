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
import { Gender, Numerus, Person } from "../../../Definitions";
import { Verb } from "../../../Verb";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

export function IrregularLaysaTemplate(stemData: Verb<ModernStandardArabicStem1ParametersType>): ConjugationRule[] | undefined
{
    const root = stemData.root;

    return [
        {
            conditions: { person: Person.Third, gender: Gender.Female, numerus: Numerus.Plural },
            symbols: [root.r1, root.r3],
            vowels: [Vowel.ShortA]
        },
        {
            conditions: { person: Person.Third },
            symbols: [root.r1, root.r3],
            vowels: [Vowel.DiphtongAj]
        },
        {
            conditions: {},
            symbols: [root.r1, root.r3],
            vowels: [Vowel.ShortA]
        },
    ];
}