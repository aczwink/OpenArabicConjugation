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

function RegularStem1_I_ConjugationTemplate(root: VerbRoot, stemData: VerbStem1Data<LebaneseStem1Context>, params: ConjugationParams): ConjugationRule[] | undefined
{
    function ImperativeLongVowel()
    {
        switch(stemData.stemParameterization)
        {
            case LebaneseStem1Context.RegularPastI_PresentAA:
            case LebaneseStem1Context.PastI_PresentU:
                return Vowel.LongU;
            default:
                return Vowel.LongA;
        }
    }

    function ImperativeVowel()
    {
        switch(stemData.stemParameterization)
        {
            case LebaneseStem1Context.RegularPastI_PresentAA:
            case LebaneseStem1Context.PastI_PresentU:
                return Vowel.ShortI;
            default:
                return Vowel.ShortA;
        }
    }

    function PrefixVowel()
    {
        switch(stemData.stemParameterization)
        {
            case LebaneseStem1Context.PastI_PresentA:
            case LebaneseStem1Context.PastI_PresentU:
                return Vowel.ShortI;
            default:
                return Vowel.ShortA;
        }
    }

    function R2PresentVowel()
    {
        switch(stemData.stemParameterization)
        {
            case LebaneseStem1Context.PastI_PresentA:
                return Vowel.ShortA;
            case LebaneseStem1Context.PastI_PresentU:
                return Vowel.ShortU;
            default:
                return Vowel.ShortI;
        }
    }

    const prefixVowel = PrefixVowel();
    return [
        {
            conditions: {},
            symbols: [root.r1, root.r2, root.r3],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    emphasize: (params.person === Person.Third) ? 0 : 1,
                    children: [
                        {
                            conditions: { gender: Gender.Male, numerus: Numerus.Singular, person: Person.Third },
                            vowels: [Vowel.ShortI, Vowel.ShortI],
                        },
                        {
                            conditions: { person: Person.Third },
                            vowels: [Vowel.ShortI, Vowel.Sukun],
                        },
                        {
                            conditions: {},
                            vowels: [Vowel.Sukun, Vowel.ShortI],
                        }
                    ]
                },
                {
                    conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                    vowels: [Vowel.Sukun, ImperativeVowel()]
                },
                {
                    conditions: { mood: Mood.Imperative },
                    vowels: [Vowel.Sukun, ImperativeLongVowel()]
                },
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel,
                    vowels: [Vowel.Sukun, R2PresentVowel()],
                    children: [
                        {
                            conditions: { hasPresentSuffix: true },
                            children: [
                                {
                                    conditions: {stemParameters: LebaneseStem1Context.PastI_PresentU },
                                    vowels: [Vowel.Sukun, Vowel.Sukun]
                                },
                                {
                                    conditions: { stemParameters: LebaneseStem1Context.PastI_PresentI },
                                    vowels: [Vowel.Sukun, Vowel.Sukun]
                                },
                                {
                                    conditions: { stemParameters: LebaneseStem1Context.RegularPastI_PresentAA },
                                    vowels: [Vowel.Sukun, Vowel.Sukun]
                                },
                            ]
                        },
                    ]
                },
            ]
        },
    ];
}

export function RegularStem1ConjugationTemplate(root: VerbRoot, stemData: VerbStem1Data<LebaneseStem1Context>, params: ConjugationParams): ConjugationRule[] | undefined
{
    switch(stemData.stemParameterization)
    {
        case LebaneseStem1Context.PastI_PresentA:
        case LebaneseStem1Context.PastI_PresentI:
        case LebaneseStem1Context.PastI_PresentU:
        case LebaneseStem1Context.RegularPastI_PresentAA:
            return RegularStem1_I_ConjugationTemplate(root, stemData, params);
    }

    function R2ImperativeWithPresentSuffixVowel(stemParameterization: LebaneseStem1Context)
    {
        switch(stemParameterization)
        {
            case LebaneseStem1Context.PastA_PresentA:
                return Vowel.ShortA;
            case LebaneseStem1Context.RegularPastA_PresentUSU:
            case LebaneseStem1Context.RegularPastA_PresentIIUU:
                return Vowel.ShortU;
            default:
                return Vowel.ShortI;
        }
    }

    const presentPrefixVowel = (stemData.stemParameterization === LebaneseStem1Context.RegularPastA_PresentUSU) ? Vowel.ShortU : Vowel.ShortI;
    const r2presentVowel = (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentA) ? Vowel.ShortA : Vowel.ShortU;
    const r2imperativeVowel = (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentA) ? Vowel.LongA : Vowel.LongU;
    return [
        {
            conditions: {},
            symbols: [root.r1, root.r2, root.r3],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    emphasize: (params.person === Person.Third) ? 0 : 1,
                    vowels: [Vowel.ShortA, Vowel.ShortA]
                },
                {
                    conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                    vowels: [Vowel.Sukun, R2ImperativeWithPresentSuffixVowel(stemData.stemParameterization)]
                },
                {
                    conditions: { mood: Mood.Imperative },
                    vowels: [Vowel.Sukun, r2imperativeVowel]
                },
                {
                    conditions: { tense: Tense.Present, hasPresentSuffix: true },
                    prefixVowel: presentPrefixVowel,
                    children: [
                        {
                            conditions: { stemParameters: LebaneseStem1Context.PastA_PresentA },
                            vowels: [Vowel.Sukun, Vowel.ShortA]
                        },
                        {
                            conditions: { stemParameters: LebaneseStem1Context.RegularPastA_PresentIIU },
                            vowels: [Vowel.ShortI, Vowel.Sukun]
                        },
                        {
                            conditions: { stemParameters: LebaneseStem1Context.RegularPastA_PresentIIUU },
                            vowels: [Vowel.ShortI, Vowel.Sukun]
                        },
                        {
                            conditions: {},
                            vowels: [Vowel.Sukun, Vowel.Sukun]
                        },
                    ]
                },
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: presentPrefixVowel,
                    vowels: [Vowel.Sukun, r2presentVowel]
                }
            ]
        },
    ];
}