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

import { ConjugationRule, Vowel } from "../../Conjugation";
import { Numerus, Person, Letter, Gender, VerbType, Tense } from "../../Definitions";
import { Verb } from "../../Verb";
import { SouthLevantineStem1Context } from "./SouthLevantineDialectMetadata";

const soundSuffixTemplate: ConjugationRule[] = [
    {
        conditions: { tense: Tense.Present },
        children: [
            {
                conditions: { person: Person.Second, numerus: Numerus.Singular, gender: Gender.Female },
                prefixVowel: Vowel.LongI,
                symbols: [],
                vowels: []
            },
            {
                conditions: { person: [Person.Second, Person.Third], numerus: Numerus.Plural },
                prefixVowel: Vowel.LongU,
                symbols: [],
                vowels: []
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
        conditions: { person: Person.Second, numerus: Numerus.Singular, gender: Gender.Female },
        prefixVowel: Vowel.Sukun,
        symbols: [Letter.Ta],
        vowels: [Vowel.LongI]
    },
    {
        conditions: { person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
        prefixVowel: Vowel.Sukun,
        symbols: [],
        vowels: []
    },
    {
        conditions: { person: Person.Third, numerus: Numerus.Singular, gender: Gender.Female },
        prefixVowel: Vowel.ShortA,
        symbols: [Letter.Ta],
        vowels: [Vowel.Sukun]
    },
    {
        conditions: { person: Person.First, numerus: Numerus.Plural },
        prefixVowel: Vowel.Sukun,
        symbols: [Letter.Nun],
        vowels: [Vowel.LongA]
    },
    {
        conditions: { person: Person.Second, numerus: Numerus.Plural },
        prefixVowel: Vowel.Sukun,
        symbols: [Letter.Ta],
        vowels: [Vowel.LongU]
    },
    {
        conditions: { person: Person.Third, numerus: Numerus.Plural },
        prefixVowel: Vowel.LongU,
        symbols: [],
        vowels: []
    },
    {
        conditions: {},
        prefixVowel: Vowel.Sukun,
        symbols: [Letter.Ta],
        vowels: [Vowel.Sukun],
    }
];

const defectiveSuffixTemplate: ConjugationRule[] = [
    {
        conditions: { tense: Tense.Present },
        children: [
            {
                conditions: { person: [Person.Second, Person.Third], numerus: Numerus.Plural },
                prefixVowel: Vowel.LongU,
                symbols: [],
                vowels: []
            },
            {
                conditions: {},
                prefixVowel: Vowel.LongI,
                symbols: [],
                vowels: []
            }
        ]
    },
    {
        conditions: { person: Person.Second, numerus: Numerus.Singular, gender: Gender.Female },
        prefixVowel: Vowel.DiphtongAj,
        symbols: [Letter.Ta],
        vowels: [Vowel.LongI]
    },
    {
        conditions: { person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
        symbols: [],
        vowels: [Vowel.BrokenA]
    },
    {
        conditions: { person: Person.Third, numerus: Numerus.Singular, gender: Gender.Female },
        prefixVowel: Vowel.ShortA,
        symbols: [Letter.Ta],
        vowels: [Vowel.Sukun]
    },
    {
        conditions: { person: Person.First, numerus: Numerus.Plural },
        prefixVowel: Vowel.DiphtongAj,
        symbols: [Letter.Nun],
        vowels: [Vowel.LongA]
    },
    {
        conditions: { person: Person.Second, numerus: Numerus.Plural },
        prefixVowel: Vowel.DiphtongAj,
        symbols: [Letter.Ta],
        vowels: [Vowel.LongU]
    },
    {
        conditions: { person: Person.Third, numerus: Numerus.Plural },
        prefixVowel: Vowel.LongU,
        symbols: [],
        vowels: []
    },
    {
        conditions: {},
        prefixVowel: Vowel.DiphtongAj,
        symbols: [Letter.Ta],
        vowels: [Vowel.Sukun],
    }
];

export function DeriveSuffixTemplate(verb: Verb<SouthLevantineStem1Context>): ConjugationRule[]
{
    switch(verb.type)
    {
        case VerbType.Defective:
        case VerbType.QuadriliteralAndDefective:
            return defectiveSuffixTemplate;
    }

    return soundSuffixTemplate;
}