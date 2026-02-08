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
import { Letter, Tense, VerbType, Voice } from "../../../Definitions";
import { VerbRoot } from "../../../VerbRoot";

export function AssimilatedStem10Template(root: VerbRoot): ConjugationRule[] | undefined
{
    const diphtong = (root.r1 === Letter.Waw) ? Vowel.DiphtongAw : Vowel.DiphtongAj;
    return [
        {
            conditions: { voice: Voice.Passive },
            children: [
                {
                    conditions: { tense: Tense.Present },
                    symbols: [Letter.Siin, Letter.Ta, root.r2, root.r3],
                    vowels: [Vowel.Sukun, diphtong, Vowel.ShortA],
                },
                {
                    conditions: { tense: Tense.Perfect },
                    symbols: [Letter.Siin, Letter.Ta, root.r2, root.r3],
                    vowels: [Vowel.Sukun, Vowel.LongU, Vowel.ShortI],
                }
            ]
        },
        {
            conditions: {},
            base: { verbType: VerbType.Sound }
        }
    ];
}