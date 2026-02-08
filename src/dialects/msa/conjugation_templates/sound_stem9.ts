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
import { Gender, Mood, Numerus, Tense, Voice } from "../../../Definitions";
import { Verb } from "../../../Verb";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

export function SoundStem9Template(stemData: Verb<ModernStandardArabicStem1ParametersType>, voice: Voice): ConjugationRule[] | undefined
{
    const root = stemData.root;
    const r1tashkil = (voice === Voice.Active) ? Vowel.ShortA : Vowel.ShortU;
    const r2tashkil = (voice === Voice.Active) ? Vowel.ShortA : Vowel.ShortI;
    const r2tashkilPresent = (voice === Voice.Active) ? Vowel.ShortI : Vowel.ShortA;

    return [
        {
            conditions: {},
            symbols: [root.r1, root.r2, root.r3, root.r3],
            children: [
                {
                    conditions: { mood: [Mood.Jussive, Mood.Imperative], hasPresentVowelSuffix: true },
                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun],
                },
                {
                    conditions: { mood: [Mood.Jussive, Mood.Imperative] },
                    vowels: [Vowel.Sukun, Vowel.ShortA, r2tashkilPresent],
                },
                {
                    conditions: { tense: Tense.Present, gender: Gender.Female, numerus: Numerus.Plural },
                    vowels: [Vowel.Sukun, Vowel.ShortA, r2tashkilPresent],
                },
                {
                    conditions: { doesSuffixBeginWithSukun: true },
                    vowels: [Vowel.Sukun, r1tashkil, r2tashkil],
                },
                {
                    conditions: {},
                    vowels: [Vowel.Sukun, r1tashkil, Vowel.Sukun],
                    children: [
                        {
                            conditions: { tense: Tense.Present, voice: Voice.Passive },
                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun],
                        }
                    ]
                }
            ]
        }
    ];
}