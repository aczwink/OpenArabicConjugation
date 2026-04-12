/**
 * OpenArabicConjugation
 * Copyright (C) 2026 Amir Czwink (amir130@hotmail.de)
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
import { Tense, VerbType } from "../../../Definitions";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

export function IrregularSa3aTemplate(): ConjugationRule[]
{
    return [
        {
            conditions: { tense: Tense.Present },
            base: {
                stemParameterization: ModernStandardArabicStem1ParametersType.DefectiveType3,
                verbType: VerbType.Defective,
            }
        },
        {
            conditions: {},
            base: {
                stemParameterization: ModernStandardArabicStem1ParametersType.DefectiveType1,
                verbType: VerbType.Defective,
            }
        },
    ];
}