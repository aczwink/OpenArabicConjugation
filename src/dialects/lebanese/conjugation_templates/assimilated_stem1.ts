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
import { ConjugationParams, Gender, Mood, Numerus, Person, Tense } from "../../../Definitions";
import { VerbStem1Data } from "../../../Verb";
import { VerbRoot } from "../../../VerbRoot";
import { LebaneseStem1Context } from "../LebaneseDialectMetadata";

export function AssimilatedStem1ConjugationTemplate(root: VerbRoot, stemData: VerbStem1Data<LebaneseStem1Context>, params: ConjugationParams): ConjugationRule[] | undefined
{
    function PastVowel1()
    {
        switch(stemData.stemParameterization)
        {
            case LebaneseStem1Context.AssimilatedPastII_PresentA:
                return Vowel.ShortI;
            case LebaneseStem1Context.PastA_PresentI:
                return Vowel.ShortA;
            case LebaneseStem1Context.PastI_PresentA:
                return Vowel.ShortU;
        }
        //throw new Error("SHOULD NEVER HAPPEN!");
        return Vowel.Sukun;
    }

    const past_r2_c1 = (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentI) ? Vowel.ShortA : Vowel.ShortI;
    const past_r2_c2 = (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentI) ? Vowel.ShortA : Vowel.Sukun;
    const present_r2 = (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentI) ? Vowel.ShortI : Vowel.ShortA;

    return [
        {
            conditions: {},
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    symbols: [root.r1, root.r2, root.r3],
                    children: [
                        {
                            conditions: { gender: Gender.Male, numerus: Numerus.Singular, person: Person.Third },
                            vowels: [PastVowel1(), past_r2_c1],
                        },
                        {
                            conditions: { person: Person.Third },
                            vowels: [PastVowel1(), past_r2_c2],
                        },
                        {
                            conditions: {},
                            vowels: [Vowel.Sukun, PastVowel1()],
                        }
                    ]
                },
                {
                    conditions: { mood: Mood.Imperative, hasPresentVowelSuffix: true },
                    symbols: [root.r1, root.r2, root.r3],
                    vowels: [Vowel.Sukun, present_r2]
                },
                {
                    conditions: { mood: Mood.Imperative },
                    symbols: [root.r1, root.r2, root.r3],
                    vowels: [Vowel.Sukun, Vowel.LongA]
                },
                {
                    conditions: { tense: Tense.Present },
                    symbols: [root.r2, root.r3],
                    prefixVowel: Vowel.LongU,
                    vowels: [present_r2],
                    children: [
                        {
                            conditions: { hasPresentVowelSuffix: true, stemParameters: LebaneseStem1Context.PastA_PresentI },
                            vowels: [Vowel.Sukun]
                        }
                    ]
                },
            ]
        },
    ];
}