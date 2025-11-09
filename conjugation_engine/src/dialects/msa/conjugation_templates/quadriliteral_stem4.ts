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
import { Tense, Voice } from "../../../Definitions";
import { VerbRoot } from "../../../VerbRoot";

export function QuadriliteralStem4Template(root: VerbRoot, voice: Voice): ConjugationRule[] | undefined
{
    const r2tashkil = (voice === Voice.Active) ? Vowel.ShortA : Vowel.ShortU;
    const r3tashkil = (voice === Voice.Active) ? Vowel.ShortA : Vowel.ShortI;
    const r3tashkilPresent = (voice === Voice.Active) ? Vowel.ShortI : Vowel.ShortA;

    return [
        {
            conditions: { tense: Tense.Perfect },
            symbols: [root.r1, root.r2, root.r3, root.r4, root.r4],
            vowels: [Vowel.Sukun, r2tashkil, r3tashkil, Vowel.Sukun],
            children: [
                {
                    conditions: { doesSuffixBeginWithSukun: true },
                    vowels: [Vowel.Sukun, r2tashkil, Vowel.Sukun, r3tashkil],
                }
            ]
        },
        {
            conditions: {},
            symbols: [root.r1, root.r2, root.r3, root.r4, root.r4],
            vowels: [Vowel.Sukun, Vowel.ShortA, r3tashkilPresent, Vowel.Sukun],
            children: [
                {
                    conditions: { doesSuffixBeginWithSukun: true },
                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, r3tashkilPresent],
                }
            ]
        }
    ];
}