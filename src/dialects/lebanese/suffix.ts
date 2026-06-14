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

import { ConjugationRule, Vowel } from "../../Conjugation";
import { Gender, Letter, Mood, Numerus, Person, Tense, VerbType } from "../../Definitions";
import { Verb } from "../../Verb";
import { LebaneseStem1Context } from "./LebaneseDialectMetadata";

const soundSuffixTemplate: ConjugationRule[] = [
    {
        conditions: { tense: Tense.Present },
        children: [
            {
                conditions: { numerus: Numerus.Singular, person: Person.Second, gender: Gender.Female },
                prefixVowel: Vowel.LongI,
                symbols: [],
                vowels: [],
            },
            {
                conditions: { numerus: Numerus.Plural, person: [Person.Second, Person.Third] },
                prefixVowel: Vowel.LongU,
                symbols: [Letter.Alef],
                vowels: [],
            },
            {
                conditions: {},
                prefixVowel: Vowel.Sukun,
                symbols: [],
                vowels: []
            }
        ]
    },
    {
        conditions: { numerus: Numerus.Singular, person: Person.Second, gender: Gender.Female },
        prefixVowel: Vowel.Sukun,
        symbols: [Letter.Ta],
        vowels: [Vowel.LongI],
    },
    {
        conditions: { numerus: Numerus.Singular, person: Person.Third, gender: Gender.Male },
        prefixVowel: Vowel.Sukun,
        symbols: [],
        vowels: [],
    },
    {
        conditions: { numerus: Numerus.Plural, person: Person.First },
        prefixVowel: Vowel.Sukun,
        symbols: [Letter.Nun],
        vowels: [Vowel.LongA],
    },
    {
        conditions: { numerus: Numerus.Plural, person: Person.Second },
        prefixVowel: Vowel.Sukun,
        symbols: [Letter.Ta, Letter.Alef],
        vowels: [Vowel.LongU],
    },
    {
        conditions: { numerus: Numerus.Plural, person: Person.Third },
        prefixVowel: Vowel.LongU,
        symbols: [Letter.Alef],
        vowels: [],
    },
    {
        conditions: {},
        prefixVowel: Vowel.ShortI,
        symbols: [Letter.Ta],
        vowels: [Vowel.Sukun]
    }
];

const aytTemplate: ConjugationRule[] = [
    {
        conditions: { tense: Tense.Present },
        children: [
            {
                conditions: { numerus: Numerus.Singular, person: Person.Second, gender: Gender.Female },
                prefixVowel: Vowel.LongI,
                symbols: [],
                vowels: [],
            },
            {
                conditions: { numerus: Numerus.Plural, person: [Person.Second, Person.Third] },
                prefixVowel: Vowel.LongU,
                symbols: [Letter.Alef],
                vowels: [],
            },
            {
                conditions: {},
                prefixVowel: Vowel.Sukun,
                symbols: [],
                vowels: []
            }
        ]
    },
    {
        conditions: { numerus: Numerus.Singular, person: Person.Second, gender: Gender.Female },
        prefixVowel: Vowel.DiphtongAj,
        symbols: [Letter.Ta],
        vowels: [Vowel.LongI],
    },
    {
        conditions: { numerus: Numerus.Singular, person: Person.Third, gender: Gender.Male },
        prefixVowel: Vowel.Sukun,
        symbols: [],
        vowels: [],
    },
    {
        conditions: { numerus: Numerus.Singular, person: Person.Third, gender: Gender.Female },
        prefixVowel: Vowel.ShortI,
        symbols: [Letter.Ta],
        vowels: [Vowel.Sukun],
    },
    {
        conditions: { numerus: Numerus.Plural, person: Person.First },
        prefixVowel: Vowel.DiphtongAj,
        symbols: [Letter.Nun],
        vowels: [Vowel.LongA],
    },
    {
        conditions: { numerus: Numerus.Plural, person: Person.Second },
        prefixVowel: Vowel.DiphtongAj,
        symbols: [Letter.Ta, Letter.Alef],
        vowels: [Vowel.LongU],
    },
    {
        conditions: { numerus: Numerus.Plural, person: Person.Third },
        prefixVowel: Vowel.LongU,
        symbols: [Letter.Alef],
        vowels: [],
    },
    {
        conditions: {},
        prefixVowel: Vowel.DiphtongAj,
        symbols: [Letter.Ta],
        vowels: [Vowel.Sukun]
    }
];

const defectiveSuffixesTemplate: ConjugationRule[] = [
    {
        conditions: { tense: Tense.Present },
        children: [
            {
                conditions: { numerus: Numerus.Singular, person: Person.Second, gender: Gender.Female },
                prefixVowel: Vowel.LongI,
                symbols: [],
                vowels: [],
            },
            {
                conditions: { numerus: Numerus.Singular, person: Person.Third, gender: Gender.Male, stemParameters: [LebaneseStem1Context.DefectiveWithImperativeA, LebaneseStem1Context.PastA_PresentA, LebaneseStem1Context.PastI_PresentA], hasPresentVowelSuffix: false },
                prefixVowel: Vowel.BrokenA,
                symbols: [],
                vowels: [],
            },
            {
                conditions: { numerus: Numerus.Plural, person: [Person.Second, Person.Third] },
                prefixVowel: Vowel.LongU,
                symbols: [Letter.Alef],
                vowels: [],
            },
            {
                conditions: {},
                prefixVowel: Vowel.LongI,
                symbols: [],
                vowels: [],
                children: [
                    {
                        conditions: { mood: Mood.Imperative, stemParameters: LebaneseStem1Context.PastI_PresentA },
                        prefixVowel: Vowel.LongI,
                    },
                    {
                        conditions: { stemParameters: [LebaneseStem1Context.DefectiveWithImperativeA, LebaneseStem1Context.PastA_PresentA, LebaneseStem1Context.PastI_PresentA] },
                        prefixVowel: Vowel.BrokenA,
                    },
                    {
                        conditions: { stem: [5, 6, 10] },
                        prefixVowel: Vowel.BrokenA,
                    },
                ]
            }
        ]
    },
    {
        conditions: { numerus: Numerus.Singular, person: [Person.First, Person.Second], gender: Gender.Male, stemParameters: [LebaneseStem1Context.DefectiveWithImperativeA, LebaneseStem1Context.IrregularIja, LebaneseStem1Context.PastI_PresentA, LebaneseStem1Context.PastI_PresentI] },
        prefixVowel: Vowel.LongI,
        symbols: [Letter.Ta],
        vowels: [Vowel.Sukun],
    },
    {
        conditions: { numerus: Numerus.Singular, person: Person.Second, gender: Gender.Female, stemParameters: [LebaneseStem1Context.DefectiveWithImperativeA, LebaneseStem1Context.IrregularIja, LebaneseStem1Context.PastI_PresentA, LebaneseStem1Context.PastI_PresentI] },
        prefixVowel: Vowel.LongI,
        symbols: [Letter.Ta],
        vowels: [Vowel.LongI],
    },
    {
        conditions: { numerus: Numerus.Singular, person: Person.Third, gender: Gender.Male },
        prefixVowel: Vowel.BrokenA,
        symbols: [],
        vowels: [],
        children: [
            {
                conditions: { stemParameters: [LebaneseStem1Context.DefectiveWithImperativeA, LebaneseStem1Context.PastI_PresentA, LebaneseStem1Context.PastI_PresentI] },
                prefixVowel: Vowel.LongI
            }
        ]
    },
    {
        conditions: { numerus: Numerus.Plural, person: Person.First, stemParameters: [LebaneseStem1Context.DefectiveWithImperativeA, LebaneseStem1Context.IrregularIja, LebaneseStem1Context.PastI_PresentA, LebaneseStem1Context.PastI_PresentI] },
        prefixVowel: Vowel.LongI,
        symbols: [Letter.Nun],
        vowels: [Vowel.LongA],
    },
    {
        conditions: { numerus: Numerus.Plural, person: Person.Second, stemParameters: [LebaneseStem1Context.DefectiveWithImperativeA, LebaneseStem1Context.IrregularIja, LebaneseStem1Context.PastI_PresentA, LebaneseStem1Context.PastI_PresentI] },
        prefixVowel: Vowel.LongI,
        symbols: [Letter.Ta, Letter.Alef],
        vowels: [Vowel.LongU],
    },
    ...aytTemplate
];

export function DeriveSuffixTemplate(verb: Verb<LebaneseStem1Context>): ConjugationRule[]
{
    switch(verb.type)
    {
        case VerbType.Defective:
        case VerbType.QuadriliteralAndDefective:
            return defectiveSuffixesTemplate;

        case VerbType.Geminate:
            return aytTemplate;
    }
    switch(verb.stem)
    {
        case 1:
            switch(verb.stemParameterization)
            {
                case LebaneseStem1Context.IrregularIja:
                    return [
                        {
                            conditions: { tense: Tense.Perfect, numerus: Numerus.Singular, person: Person.Third, gender: Gender.Male },
                            prefixVowel: Vowel.LongA,
                            symbols: [],
                            vowels: []
                        },
                        {
                            conditions: { mood: Mood.Imperative, gender: Gender.Male, numerus: Numerus.Singular },
                            prefixVowel: Vowel.LongA,
                            symbols: [],
                            vowels: []
                        },
                        ...defectiveSuffixesTemplate
                    ];
            }
            break;
        case 9:
            if(verb.type === VerbType.Sound)
                return aytTemplate;
    }
    return soundSuffixTemplate;
}