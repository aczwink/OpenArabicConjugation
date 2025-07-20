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

import { ConjugationParams, Tashkil, Tense, Voice } from "../../../Definitions";
import { VerbStemData } from "../../../Verb";
import { AugmentedRoot } from "../AugmentedRoot";
import { ExtractPresentMiddleRadicalTashkil, ModernStandardArabicStem1ParametersType } from "./r2tashkil";

export function GeminateDoubledConsonant(augmentedRoot: AugmentedRoot, stemData: VerbStemData<ModernStandardArabicStem1ParametersType>, params: ConjugationParams)
{
    switch(stemData.stem)
    {
        case 1:
            if( (params.tense === Tense.Perfect) && (augmentedRoot.r3.tashkil !== Tashkil.Sukun) )
                augmentedRoot.r2.tashkil = Tashkil.Sukun;
            else if(params.tense === Tense.Present)
            {
                if(params.voice === Voice.Active)
                    augmentedRoot.r1.tashkil = ExtractPresentMiddleRadicalTashkil(stemData.stemParameterization);
                else
                    augmentedRoot.r1.tashkil = Tashkil.Fatha;
                augmentedRoot.r2.tashkil = Tashkil.Sukun;
            }
            break;
        case 7:
            if(params.tense === Tense.Perfect)
                augmentedRoot.r1.tashkil = (params.voice === Voice.Active) ? Tashkil.Fatha : Tashkil.Kasra;
            else if(params.tense === Tense.Present)
                augmentedRoot.r1.tashkil = Tashkil.Fatha;
            augmentedRoot.r2.tashkil = Tashkil.Sukun;
            break;
    }
}