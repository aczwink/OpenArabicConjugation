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
import { Person, Numerus, Letter, Gender, Mood } from "../../Definitions";

const prefixTemplate: ConjugationRule[] = [
    {
        conditions: { mood: Mood.Indicative },
        children: [
            {
                conditions: { person: Person.First, numerus: Numerus.Singular },
                symbols: [Letter.Ba],
                vowels: [],
                dontShaddadize: 0,
            },
            {
                conditions: { person: Person.First },
                symbols: [Letter.Mim, Letter.Nun],
                vowels: [Vowel.Sukun],
                children: [
                    {
                        conditions: { doesSuffixBeginWithSukun: true },
                        vowels: [Vowel.ShortI]
                    }
                ]
            },
            {
                conditions: { person: Person.Third, gender: Gender.Male },
                symbols: [Letter.Ba, Letter.Ya],
                vowels: [Vowel.Sukun],
                children: [
                    {
                        conditions: { doesSuffixBeginWithSukun: true },
                        symbols: [Letter.Ba],
                        vowels: [Vowel.LongI]
                    }
                ]
            },
            {
                conditions: {},
                symbols: [Letter.Ba, Letter.Ta],
                vowels: [Vowel.Sukun],
                children: [
                    {
                        conditions: { doesSuffixBeginWithSukun: true },
                        vowels: [Vowel.ShortI]
                    }
                ]
            },
        ],
    },
    {
        conditions: { mood: Mood.Subjunctive },
        children: [
            {
                conditions: { person: Person.First, numerus: Numerus.Singular },
                symbols: [Letter.Hamza],
                vowels: [],
                children: [
                    {
                        conditions: { doesSuffixBeginWithSukun: true },
                        symbols: []
                    }
                ]
            },
            {
                conditions: { person: Person.First },
                symbols: [Letter.Nun],
                vowels: [],
                dontShaddadize: 0,
            },
            {
                conditions: { person: Person.Third, gender: Gender.Male },
                symbols: [Letter.Ya],
                vowels: []
            },
            {
                conditions: {},
                symbols: [Letter.Ta],
                vowels: [],
                dontShaddadize: 0,
            },
        ]
    },
    {
        conditions: {},
        symbols: [],
        vowels: []
    }
];

export function DerivePrefixTemplate()
{
    return prefixTemplate;
}