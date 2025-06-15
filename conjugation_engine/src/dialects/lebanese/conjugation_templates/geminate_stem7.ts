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
import { ConjugationParams, Letter, Person, Tense } from "../../../Definitions";
import { VerbStemData } from "../../../Verb";
import { VerbRoot } from "../../../VerbRoot";
import { LebaneseStem1Context } from "../LebaneseDialectMetadata";

export function GeminateStem7ConjugationTemplate(root: VerbRoot, stemData: VerbStemData<LebaneseStem1Context>, params: ConjugationParams): ConjugationRule[] | undefined
{
    return [
        {
            conditions: {},
            symbols: [Letter.Nun, root.r1, root.r2, root.r3],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    children: [
                        {
                            conditions: { person: Person.Third, },
                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun],
                        },
                        {
                            conditions: {},
                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.DiphtongAj],
                        }
                    ]
                },
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.ShortI,
                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun]
                },
            ]
        },
    ];
}