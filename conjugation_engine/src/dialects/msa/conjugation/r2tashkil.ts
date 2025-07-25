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

import { Vowel } from "../../../Conjugation";
import { BaseTashkil, Tashkil } from "../../../Definitions";

export enum ModernStandardArabicStem1ParametersType
{
    /**
     * Fa3a / Yaf3i
     */
    DefectiveType1 = "ai",
    DefectiveType2 = "au",
    DefectiveType3 = "ia",
    IrregularHayiya = "irregular_hayiya",
    IrregularLaysa = "irregular_laysa",
    PastA_PresentA = "aa",
    PastA_PresentI = "ai",
    PastA_PresentU = "au",
    PastI_PresentA = "ia",
    PastI_PresentI = "ii",
    PastU_PresentU = "uu",
    Quadrilateral = "ss",
}

export function _Legacy_ExtractMiddleRadicalTashkil(type: ModernStandardArabicStem1ParametersType): BaseTashkil
{
    switch(type)
    {
        case ModernStandardArabicStem1ParametersType.PastU_PresentU:
            return Tashkil.Dhamma;
        case ModernStandardArabicStem1ParametersType.DefectiveType1:
        case ModernStandardArabicStem1ParametersType.DefectiveType2:
        case ModernStandardArabicStem1ParametersType.PastA_PresentA:
        case ModernStandardArabicStem1ParametersType.PastA_PresentI:
        case ModernStandardArabicStem1ParametersType.PastA_PresentU:
            return Tashkil.Fatha;
        case ModernStandardArabicStem1ParametersType.DefectiveType3:
        case ModernStandardArabicStem1ParametersType.PastI_PresentA:
        case ModernStandardArabicStem1ParametersType.PastI_PresentI:
            return Tashkil.Kasra;
        case ModernStandardArabicStem1ParametersType.Quadrilateral:
            return Tashkil.Sukun;
    }
    throw new Error("Doesn't work for irregular verbs: " + type);
}

export function _Legacy_ExtractPresentMiddleRadicalTashkil(type: ModernStandardArabicStem1ParametersType): BaseTashkil
{
    switch(type)
    {
        case ModernStandardArabicStem1ParametersType.DefectiveType1:
        case ModernStandardArabicStem1ParametersType.PastA_PresentI:
        case ModernStandardArabicStem1ParametersType.PastI_PresentI:
            return Tashkil.Kasra;
        case ModernStandardArabicStem1ParametersType.DefectiveType2:
        case ModernStandardArabicStem1ParametersType.PastA_PresentU:
        case ModernStandardArabicStem1ParametersType.PastU_PresentU:
            return Tashkil.Dhamma;
        case ModernStandardArabicStem1ParametersType.DefectiveType3:
        case ModernStandardArabicStem1ParametersType.PastA_PresentA:
        case ModernStandardArabicStem1ParametersType.PastI_PresentA:
            return Tashkil.Fatha;
        case ModernStandardArabicStem1ParametersType.Quadrilateral:
            return Tashkil.Sukun;
    }
    throw new Error("Doesn't work for irregular verbs: " + type);
}

export function ExtractMiddleRadicalTashkilVowel(type: ModernStandardArabicStem1ParametersType): Vowel
{
    switch(type)
    {
        case ModernStandardArabicStem1ParametersType.PastU_PresentU:
            return Vowel.ShortU;
        case ModernStandardArabicStem1ParametersType.DefectiveType1:
        case ModernStandardArabicStem1ParametersType.DefectiveType2:
        case ModernStandardArabicStem1ParametersType.PastA_PresentA:
        case ModernStandardArabicStem1ParametersType.PastA_PresentI:
        case ModernStandardArabicStem1ParametersType.PastA_PresentU:
            return Vowel.ShortA;
        case ModernStandardArabicStem1ParametersType.DefectiveType3:
        case ModernStandardArabicStem1ParametersType.PastI_PresentA:
        case ModernStandardArabicStem1ParametersType.PastI_PresentI:
            return Vowel.ShortI;
        case ModernStandardArabicStem1ParametersType.Quadrilateral:
            return Vowel.Sukun;
    }
    throw new Error("Doesn't work for irregular verbs: " + type);
}

export function ExtractPresentMiddleRadicalVowel(type: ModernStandardArabicStem1ParametersType): Vowel
{
    switch(type)
    {
        case ModernStandardArabicStem1ParametersType.DefectiveType1:
        case ModernStandardArabicStem1ParametersType.PastA_PresentI:
        case ModernStandardArabicStem1ParametersType.PastI_PresentI:
            return Vowel.ShortI;
        case ModernStandardArabicStem1ParametersType.DefectiveType2:
        case ModernStandardArabicStem1ParametersType.PastA_PresentU:
        case ModernStandardArabicStem1ParametersType.PastU_PresentU:
            return Vowel.ShortU;
        case ModernStandardArabicStem1ParametersType.DefectiveType3:
        case ModernStandardArabicStem1ParametersType.PastA_PresentA:
        case ModernStandardArabicStem1ParametersType.PastI_PresentA:
            return Vowel.ShortA;
        case ModernStandardArabicStem1ParametersType.Quadrilateral:
            return Vowel.Sukun;
    }
    throw new Error("Doesn't work for irregular verbs: " + type);
}