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
import { Tense, Person, Gender, Numerus, Letter } from "../../../Definitions";
import { VerbStem1Data } from "../../../Verb";
import { VerbRoot } from "../../../VerbRoot";
import { LebaneseStem1Context } from "../LebaneseDialectMetadata";

export function DefectiveStem1ConjugationTemplate(root: VerbRoot, stemData: VerbStem1Data<LebaneseStem1Context>): ConjugationRule[] | undefined
{
    return [
        {
            conditions: { tense: Tense.Perfect, stemParameters: [LebaneseStem1Context.DefectiveType1WithPrefixA, LebaneseStem1Context.PastA_PresentA, LebaneseStem1Context.PastA_PresentI] },
            symbols: [root.r1, root.r2],
            vowels: [Vowel.ShortA]
        },
        {
            conditions: { tense: Tense.Perfect, person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
            symbols: [root.r1, root.r2],
            vowels: [Vowel.ShortI]
        },
        {
            conditions: { tense: Tense.Perfect, person: Person.Third },
            symbols: [root.r1, root.r2, Letter.Ya],
            vowels: [Vowel.ShortI, Vowel.Sukun]
        },
        {
            conditions: {},
            symbols: [root.r1, root.r2],
            vowels: [Vowel.Sukun],
            children: [
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: (stemData.stemParameterization === LebaneseStem1Context.DefectiveType1WithPrefixA) ? Vowel.ShortA : Vowel.ShortI,
                }
            ]
        }
    ];
}