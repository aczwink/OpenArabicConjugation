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
import { ConjugationParams, Letter, Person, Tense } from "../../../Definitions";
import { VerbStem1Data } from "../../../Verb";
import { VerbRoot } from "../../../VerbRoot";
import { IrregularIja } from "../irregular";
import { LebaneseStem1Context } from "../LebaneseDialectMetadata";

export function HollowStem1ConjugationTemplate(root: VerbRoot, stemData: VerbStem1Data<LebaneseStem1Context>, params: ConjugationParams): ConjugationRule[] | undefined
{
    function R2PresentVowel()
    {
        switch(stemData.stemParameterization)
        {
            case LebaneseStem1Context.PastI_PresentA:
                return Vowel.LongA;
            case LebaneseStem1Context.PastI_PresentI:
                return Vowel.LongI;
            case LebaneseStem1Context.PastI_PresentU:
                return Vowel.LongU;
        }
        throw new Error("Should not happen: " + stemData.stemParameterization);
    }

    if(stemData.stemParameterization === LebaneseStem1Context.IrregularJy2)
        return IrregularIja(root);

    return [
        {
            conditions: {},
            symbols: [root.r1, root.r3],
            children: [
                {
                    conditions: { tense: Tense.Perfect },
                    vowels: [(params.person === Person.Third) ? Vowel.LongA : Vowel.ShortI]
                },
                {
                    conditions: { tense: Tense.Present },
                    prefixVowel: Vowel.Sukun,
                    vowels: [R2PresentVowel()]
                }
            ]
        },
    ];
}