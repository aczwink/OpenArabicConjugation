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

import { Tashkil, Letter, Stem1Context, Gender, Numerus, Person, Tense, Voice, StemlessConjugationParams, VerbConjugationScheme } from "./Definitions";
import { DialectType } from "./Dialects";
import { LebaneseDialectMetadata } from "./dialects/lebanese/LebaneseDialectMetadata";
import { GetSpeciallyIrregularDefectivePresentTashkilForStem1IfMatching } from "./dialects/msa/conjugation/defective_special_cases";
import { RootType, VerbRoot } from "./VerbRoot";

export enum ModernStandardArabicStem1ContextType
{
    /**
     * Fa3a / Yaf3i
     */
    DefectiveType1 = "ai",
    DefectiveType2 = "au",
    DefectiveType3 = "ia",
    Hollow_PastU_PresentA = "ua",
    PastA_PresentA = "aa",
    PastA_PresentI = "ai",
    PastA_PresentU = "au",
    PastI_PresentA = "ia",
    Quadrilateral = "ss",
    RegularOrHollow_PastI_PresentI = "ii",
    RegularOrHollow_PastU_PresentU = "uu",
}

export interface Stem1ContextChoice<T extends string>
{
    types: T[];
    requiredContext?: StemlessConjugationParams;
}

export interface DialectMetadata<T extends string>
{
    hasDual: boolean;
    hasFemalePlural: boolean;
    hasJussive: boolean;
    hasPassive: boolean;
    iso639code: string;
    glottoCode: string;

    CreateStem1Context(verbConjugationScheme: VerbConjugationScheme, type: T): Stem1Context;
    GetStem1ContextChoices(root: VerbRoot): Stem1ContextChoice<T>;
}

export function GetDialectMetadata(dialectType: DialectType): DialectMetadata<string>
{
    switch(dialectType)
    {
        case DialectType.ModernStandardArabic:
            return {
                hasDual: true,
                hasFemalePlural: true,
                hasJussive: true,
                hasPassive: true,
                iso639code: "arb",
                glottoCode: "stan1318",

                CreateStem1Context: function(verbConjugationScheme: VerbConjugationScheme, type: ModernStandardArabicStem1ContextType)
                {
                    switch(type)
                    {
                        case ModernStandardArabicStem1ContextType.Hollow_PastU_PresentA:
                            return {
                                type,
                                scheme: verbConjugationScheme,
                                _legacy_middleRadicalTashkil: Tashkil.Dhamma,
                                _legacy_middleRadicalTashkilPresent: Tashkil.Fatha,
                            };
                        case ModernStandardArabicStem1ContextType.PastA_PresentA:
                            return {
                                type,
                                scheme: verbConjugationScheme,
                                _legacy_middleRadicalTashkil: Tashkil.Fatha,
                                _legacy_middleRadicalTashkilPresent: Tashkil.Fatha,
                            };
                        case ModernStandardArabicStem1ContextType.Quadrilateral:
                            return {
                                type,
                                scheme: verbConjugationScheme,
                                _legacy_middleRadicalTashkil: Tashkil.Sukun,
                                _legacy_middleRadicalTashkilPresent: Tashkil.Sukun,
                            };
                        case ModernStandardArabicStem1ContextType.DefectiveType1:
                        case ModernStandardArabicStem1ContextType.PastA_PresentI:
                            return {
                                type,
                                scheme: verbConjugationScheme,
                                _legacy_middleRadicalTashkil: Tashkil.Fatha,
                                _legacy_middleRadicalTashkilPresent: Tashkil.Kasra,
                            };
                        case ModernStandardArabicStem1ContextType.DefectiveType2:
                        case ModernStandardArabicStem1ContextType.PastA_PresentU:
                            return {
                                type,
                                scheme: verbConjugationScheme,
                                _legacy_middleRadicalTashkil: Tashkil.Fatha,
                                _legacy_middleRadicalTashkilPresent: Tashkil.Dhamma,
                            };
                        case ModernStandardArabicStem1ContextType.DefectiveType3:
                        case ModernStandardArabicStem1ContextType.PastI_PresentA:
                            return {
                                type,
                                scheme: verbConjugationScheme,
                                _legacy_middleRadicalTashkil: Tashkil.Kasra,
                                _legacy_middleRadicalTashkilPresent: Tashkil.Fatha,
                            };
                        case ModernStandardArabicStem1ContextType.RegularOrHollow_PastI_PresentI:
                            return {
                                type,
                                scheme: verbConjugationScheme,
                                _legacy_middleRadicalTashkil: Tashkil.Kasra,
                                _legacy_middleRadicalTashkilPresent: Tashkil.Kasra,
                            };
                        case ModernStandardArabicStem1ContextType.RegularOrHollow_PastU_PresentU:
                            return {
                                type,
                                scheme: verbConjugationScheme,
                                _legacy_middleRadicalTashkil: Tashkil.Dhamma,
                                _legacy_middleRadicalTashkilPresent: Tashkil.Dhamma,
                            };
                        default:
                            throw new Error("Illegal type: " + type);
                    }
                },

                GetStem1ContextChoices: function(root: VerbRoot): Stem1ContextChoice<string>
                {
                    switch(root.type)
                    {
                        case RootType.InitialWeak:
                        case RootType.HamzaOnR1:
                        case RootType.Regular:
                        {
                            return {
                                types: [
                                    ModernStandardArabicStem1ContextType.PastA_PresentA,
                                    ModernStandardArabicStem1ContextType.PastA_PresentI,
                                    ModernStandardArabicStem1ContextType.PastA_PresentU,
                                    ModernStandardArabicStem1ContextType.PastI_PresentA,
                                    ModernStandardArabicStem1ContextType.RegularOrHollow_PastI_PresentI,
                                    ModernStandardArabicStem1ContextType.RegularOrHollow_PastU_PresentU,
                                ]
                            }
                        }
                        case RootType.FinalWeak:
                            const special = GetSpeciallyIrregularDefectivePresentTashkilForStem1IfMatching(root);
                            if(special !== undefined)
                            {
                                return {
                                    types: [special],
                                };
                            }
                            
                            return {
                                types: [
                                    ModernStandardArabicStem1ContextType.DefectiveType1,
                                    ModernStandardArabicStem1ContextType.DefectiveType2,
                                    ModernStandardArabicStem1ContextType.DefectiveType3,
                                ],
                            };
                        case RootType.MiddleWeak:
                            {
                                const r2DependentType = (root.r2 === Letter.Waw) ? ModernStandardArabicStem1ContextType.RegularOrHollow_PastU_PresentU : ModernStandardArabicStem1ContextType.RegularOrHollow_PastI_PresentI;
                                return {
                                    types: [
                                        r2DependentType,
                                        ModernStandardArabicStem1ContextType.PastI_PresentA,
                                        ModernStandardArabicStem1ContextType.Hollow_PastU_PresentA,
                                    ],
                                    requiredContext: {
                                        gender: Gender.Male,
                                        numerus: Numerus.Singular,
                                        person: Person.First,
                                        tense: Tense.Perfect,
                                        voice: Voice.Active
                                    }
                                };
                            }
                        case RootType.Quadriliteral:
                            return {
                                types: [
                                    ModernStandardArabicStem1ContextType.Quadrilateral,
                                ],
                            };
                        case RootType.SecondConsonantDoubled:
                            {
                                return {
                                    types: [
                                        ModernStandardArabicStem1ContextType.PastA_PresentU,
                                        ModernStandardArabicStem1ContextType.PastA_PresentI,
                                        ModernStandardArabicStem1ContextType.PastA_PresentA,
                                        ModernStandardArabicStem1ContextType.PastI_PresentA,
                                    ],
                                    requiredContext: {
                                        gender: Gender.Male,
                                        numerus: Numerus.Singular,
                                        person: Person.First,
                                        tense: Tense.Perfect,
                                        voice: Voice.Active
                                    }
                                };
                            }
                        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                            return {
                                types: [
                                    ModernStandardArabicStem1ContextType.DefectiveType1,
                                ],
                            };
                        default:
                            throw new Error("TODO: implement me");
                    }
                }
            };
            
        case DialectType.Lebanese:
            return new LebaneseDialectMetadata;
    }
}