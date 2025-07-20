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

import { ConjugationRule } from "../../../Conjugation";
import { VerbType, Voice } from "../../../Definitions";
import { Verb } from "../../../Verb";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";
import { GeminateStem4Template } from "./geminate_stem4";
import { GeminateStem8Template } from "./geminate_stem8";
import { IrregularHayiyaTemplate } from "./irregular_hayiya";
import { IrregularLaysaTemplate } from "./irregular_laysa";

export function SelectTemplate(stemData: Verb<ModernStandardArabicStem1ParametersType>, voice: Voice): ConjugationRule[] | undefined
{
    switch(stemData.stem)
    {
        case 1:
            switch(stemData.type)
            {
                case VerbType.Irregular:
                {
                    switch(stemData.stemParameterization)
                    {
                        case ModernStandardArabicStem1ParametersType.IrregularHayiya:
                            return IrregularHayiyaTemplate(stemData, voice);
                        case ModernStandardArabicStem1ParametersType.IrregularLaysa:
                            return IrregularLaysaTemplate(stemData);
                    }
                }
                break;
            }
        break;
        case 4:
        {
            switch(stemData.type)
            {
                case VerbType.Geminate:
                    return GeminateStem4Template(stemData, voice);
            }
        }
        break;
        case 8:
        {
            switch(stemData.type)
            {
                case VerbType.Geminate:
                    return GeminateStem8Template(stemData, voice);
            }
        }
        break;
    }
    return undefined;
}