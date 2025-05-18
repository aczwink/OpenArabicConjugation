/**
 * OpenArabicConjugation
 * Copyright (C) 2024-2025 Amir Czwink (amir130@hotmail.de)
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
import { ConjugationParams, Tense, Person } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";

export function QuadriliteralStem1ConjugationTemplate(root: VerbRoot, params: ConjugationParams): ConjugationRule[] | undefined
{
    if(root.type === RootType.Quadriliteral_FinalWeak)
    {
        return [
            {
                conditions: {},
                symbols: [root.r1, root.r2, root.r3],
                vowels: [Vowel.ShortA, Vowel.Sukun],
                prefixVowel: Vowel.Sukun,
            },
        ];
    }

    return [
        {
            conditions: {},
            symbols: [root.r1, root.r2, root.r3, root.r4],
            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortA],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    emphasize: (params.person === Person.Third) ? 0 : 2,
                },
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.Sukun,
                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortI],
                    children: [
                        {
                            conditions: { hasPresentSuffix: true },
                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.Sukun],
                        }
                    ]
                },
            ]
        },
    ];
}