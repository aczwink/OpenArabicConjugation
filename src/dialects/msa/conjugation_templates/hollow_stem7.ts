/**
 * OpenArabicConjugation
 * Copyright (C) 2026 Amir Czwink (amir130@hotmail.de)
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

import { ConjugationRule, ToLongVowel, Vowel } from "../../../Conjugation";
import { Letter, Tense, Voice } from "../../../Definitions";
import { VerbRoot } from "../../../VerbRoot";

export function HollowStem7Template(root: VerbRoot, voice: Voice): ConjugationRule[] | undefined
{
    const perfectShortVowel = (voice === Voice.Active) ? Vowel.ShortA : Vowel.ShortI;
    const perfectLongVowel = ToLongVowel(perfectShortVowel);

    return [
        {
            conditions: { tense: Tense.Present },
            symbols: [Letter.Nun, root.r1, root.r3],
            children: [
                {
                    conditions: { doesSuffixBeginWithSukun: false },
                    vowels: [Vowel.Sukun, Vowel.LongA],
                },
                {
                    conditions: { doesSuffixBeginWithSukun: true },
                    vowels: [Vowel.Sukun, Vowel.ShortA],
                }
            ]
        },
        {
            conditions: { tense: Tense.Perfect },
            symbols: [Letter.Nun, root.r1, root.r3],
            children: [
                {
                    conditions: { doesSuffixBeginWithSukun: false },
                    vowels: [Vowel.Sukun, perfectLongVowel],
                },
                {
                    conditions: { doesSuffixBeginWithSukun: true },
                    vowels: [Vowel.Sukun, perfectShortVowel],
                }
            ]
        }
    ];
}