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
import { Letter, Voice } from "../../../Definitions";
import { Verb } from "../../../Verb";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

export function IrregularAhyaTemplate(stemData: Verb<ModernStandardArabicStem1ParametersType>, voice: Voice): ConjugationRule[] | undefined
{
    //TODO: FIX ME
    return [
        {
            conditions: {},
            symbols: [Letter.Ta],
            vowels: []
        }
    ];
}