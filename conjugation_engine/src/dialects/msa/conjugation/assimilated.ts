/**
 * OpenArabicConjugation
 * Copyright (C) 2023-2025 Amir Czwink (amir130@hotmail.de)
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

import { ConjugationParams, Letter, Tashkil, Tense, Voice } from "../../../Definitions";
import { VerbStemData } from "../../../Verb";
import { AugmentedRoot } from "../AugmentedRoot";
import { ModernStandardArabicStem1ParametersType } from "./r2tashkil";

export function AlterAssimilatedPrefix(augmentedRoot: AugmentedRoot, stemData: VerbStemData<ModernStandardArabicStem1ParametersType>, params: ConjugationParams)
{
    switch(stemData.stem)
    {
        case 1:
        {
            if( (params.tense === Tense.Present) && (augmentedRoot.r1.letter === Letter.Waw))
            {
                if(params.voice === Voice.Active)
                    augmentedRoot.DropRadial(1);
                else
                    augmentedRoot.ApplyRadicalTashkil(1, Tashkil.LongVowelMarker);
            }
        }
        break;
        case 8:
        {
            augmentedRoot.r1.letter = Letter.Ta;
        }
        break;
    }
};