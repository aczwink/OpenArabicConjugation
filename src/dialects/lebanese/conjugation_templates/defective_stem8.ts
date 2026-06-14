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

import { ConjugationRule, Vowel } from "../../../Conjugation";
import { Mood, Tense } from "../../../Definitions";
import { VerbRoot } from "../../../VerbRoot";
import { Stem8AssimilateTa } from "../../msa/conjugation/stem8";

export function DefectiveStem8ConjugationTemplate(root: VerbRoot): ConjugationRule[]
{
    const stem8r1 = Stem8AssimilateTa(root.r1);
    
    return [
        {
            conditions: {},
            symbols: [stem8r1.r1, stem8r1.ta, root.r2],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    vowels: [Vowel.Sukun, Vowel.ShortA],
                },
                {
                    conditions: {},
                    prefixVowel: Vowel.ShortI,
                    vowels: [Vowel.Sukun, Vowel.Sukun],
                    children: [
                        {
                            conditions: { mood: Mood.Imperative },
                            vowels: [Vowel.Sukun, Vowel.ShortI],
                        },
                    ],
                },
            ]
        },
    ];
}