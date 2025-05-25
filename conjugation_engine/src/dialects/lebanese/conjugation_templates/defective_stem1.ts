/**
 * OpenArabicConjugation
 * Copyright (C) 2024-2025 Amir Czwink (amir130@hotmail.de)
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
import { ConjugationParams, Tense, Person, Gender, Mood, Numerus } from "../../../Definitions";
import { VerbStem1Data } from "../../../Verb";
import { VerbRoot } from "../../../VerbRoot";
import { LebaneseStem1Context } from "../LebaneseDialectMetadata";

export function DefectiveStem1ConjugationTemplate(root: VerbRoot, stemData: VerbStem1Data<LebaneseStem1Context>, params: ConjugationParams): ConjugationRule[] | undefined
{
    const isType1 = (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentA) || (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentI) || (stemData.stemParameterization === LebaneseStem1Context.DefectiveType1WithPrefixA);
    if(isType1 && (params.tense === Tense.Perfect))
    {
        return [
            {
                conditions: { person: Person.Third },
                symbols: [root.r1, root.r2],
                vowels: [Vowel.ShortA]
            },
            {
                conditions: {},
                symbols: [root.r1, root.r2],
                vowels: [Vowel.ShortA, Vowel.DiphtongAj]
            },
        ];
    }

    const prefixVowel = (stemData.stemParameterization === LebaneseStem1Context.DefectiveType1WithPrefixA) ? Vowel.ShortA : Vowel.ShortI;
    const r2impVowel = (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentA) ? Vowel.BrokenA : Vowel.LongI;
    return [
        {
            conditions: { tense: Tense.Perfect, person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
            symbols: [root.r1, root.r2],
            vowels: [Vowel.ShortI, Vowel.LongI]
        },
        {
            conditions: { tense: Tense.Perfect, person: Person.Third, numerus: Numerus.Singular },
            symbols: [root.r1, root.r2, root.r3],
            vowels: [Vowel.ShortI, Vowel.Sukun, Vowel.ShortI]
        },
        {
            conditions: { tense: Tense.Perfect, person: Person.Third },
            symbols: [root.r1, root.r2, root.r3],
            vowels: [Vowel.ShortI, Vowel.Sukun]
        },
        {
            conditions: { tense: Tense.Perfect },
            symbols: [root.r1, root.r2],
            vowels: [Vowel.Sukun, Vowel.LongI]
        },
        {
            conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
            symbols: [root.r1, root.r2],
            vowels: [Vowel.Sukun]
        },
        {
            conditions: { mood: Mood.Imperative },
            symbols: [root.r1, root.r2],
            vowels: [Vowel.Sukun, r2impVowel]
        },
        {
            conditions: { tense: Tense.Present },
            prefixVowel,
            symbols: [root.r1, root.r2],
            vowels: [Vowel.Sukun]
        }
    ];
}