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
import { Tense } from "../../../Definitions";
import { VerbStem1Data } from "../../../Verb";
import { VerbRoot } from "../../../VerbRoot";
import { LebaneseStem1Context } from "../LebaneseDialectMetadata";

function MapPresentVowel(stemParameterization: string): Vowel
{
    switch(stemParameterization)
    {
        case LebaneseStem1Context.PastA_PresentA:
            return Vowel.ShortA;
        case LebaneseStem1Context.PastA_PresentI:
            return Vowel.ShortI;
        case LebaneseStem1Context.PastA_PresentU:
            return Vowel.ShortU;
    }
    throw new Error("should never happen");
}

export function GeminateStem1ConjugationTemplate(root: VerbRoot, stemData: VerbStem1Data<LebaneseStem1Context>): ConjugationRule[]
{
    const presentVowel = MapPresentVowel(stemData.stemParameterization);
    return [
        {
            conditions: {},
            symbols: [root.r1, root.r2, root.r3],
            vowels: [Vowel.ShortA, Vowel.Sukun],
            children: [
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.Sukun,
                    vowels: [presentVowel, Vowel.Sukun]
                }
            ]
        },
    ];
}