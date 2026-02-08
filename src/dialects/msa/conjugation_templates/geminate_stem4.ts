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

export function GeminateStem4Template(stemData: Verb<ModernStandardArabicStem1ParametersType>, voice: Voice): ConjugationRule[] | undefined
{
    const root = stemData.root;

    const perfectHamzaVowel = (voice === Voice.Active) ? Vowel.ShortA : Vowel.ShortU;
    const perfectVowel = (voice === Voice.Active) ? Vowel.ShortA : Vowel.ShortI;
    const presentVowel = (voice === Voice.Active) ? Vowel.ShortI : Vowel.ShortA;
    return [
        {
            conditions: { mood: Mood.Imperative },
            symbols: [root.r1, root.r2, root.r3],
            vowels: [Vowel.Sukun, Vowel.ShortI],
            children: [
                {
                    conditions: { hasPresentVowelSuffix: true },
                    vowels: [Vowel.ShortI, Vowel.Sukun],
                }
            ]
        },
        {
            conditions: { mood: Mood.Jussive },
            symbols: [root.r1, root.r2, root.r3],
            vowels: [Vowel.Sukun, presentVowel],
            children: [
                {
                    conditions: { hasPresentVowelSuffix: true },
                    vowels: [presentVowel, Vowel.Sukun],
                }
            ]
        },
        {
            conditions: { tense: Tense.Present },
            symbols: [root.r1, root.r2, root.r3],
            vowels: [presentVowel, Vowel.Sukun],
            children: [
                {
                    conditions: { numerus: Numerus.Plural, gender: Gender.Female },
                    vowels: [Vowel.Sukun, presentVowel],
                },
            ],
        },
        {
            conditions: { tense: Tense.Perfect },
            symbols: [Letter.Hamza, root.r1, root.r2, root.r3],
            vowels: [perfectHamzaVowel, Vowel.Sukun, perfectVowel],
            children: [
                {
                    conditions: { person: Person.Third, numerus: Numerus.Plural, gender: Gender.Female },
                },
                {
                    conditions: { person: Person.Third },
                    vowels: [perfectHamzaVowel, perfectVowel, Vowel.Sukun],
                },
            ]
        },
        
    ];
}