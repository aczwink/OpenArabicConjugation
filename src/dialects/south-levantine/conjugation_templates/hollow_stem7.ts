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
import { Tense, Letter, Person } from "../../../Definitions";
import { Verb } from "../../../Verb";
import { SouthLevantineStem1Context } from "../SouthLevantineDialectMetadata";

export function HollowStem7Template(verb: Verb<SouthLevantineStem1Context>): ConjugationRule[] | undefined
{
    const root = verb.root;

    return [
        {
            conditions: { tense: Tense.Perfect },
            symbols: [Letter.Nun, root.r1, root.r3],
            vowels: [Vowel.Sukun, Vowel.ShortA],
            children: [
                {
                    conditions: { person: Person.Third },
                    vowels: [Vowel.Sukun, Vowel.LongA],
                }
            ]
        },
        {
            conditions: { tense: Tense.Present },
            prefixVowel: Vowel.ShortI,
            symbols: [Letter.Nun, root.r1, root.r3],
            vowels: [Vowel.Sukun, Vowel.LongA]
        },
    ];
}