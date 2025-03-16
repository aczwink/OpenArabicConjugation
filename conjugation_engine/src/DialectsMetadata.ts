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

import { Letter, Gender, Numerus, Person, Tense, Voice, Mood, ConjugationParams } from "./Definitions";
import { DialectType } from "./Dialects";
import { LebaneseDialectMetadata } from "./dialects/lebanese/LebaneseDialectMetadata";
import { GetSpeciallyIrregularDefectivePresentTashkilForStem1IfMatching } from "./dialects/msa/conjugation/defective_special_cases";
import { ModernStandardArabicStem1ParametersType } from "./dialects/msa/conjugation/r2tashkil";
import { RootType, VerbRoot } from "./VerbRoot";

export interface Stem1ContextChoice<T extends string>
{
    types: T[];
    requiredContext: ConjugationParams[];
}

export interface DialectMetadata<T extends string>
{
    hasDual: boolean;
    hasFemalePlural: boolean;
    hasJussive: boolean;
    hasPassive: boolean;
    iso639code: string;
    glottoCode: string;

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

                GetStem1ContextChoices: function(root: VerbRoot): Stem1ContextChoice<string>
                {
                    const presentContext = {
                        gender: Gender.Male,
                        mood: Mood.Indicative,
                        numerus: Numerus.Singular,
                        person: Person.Third,
                        tense: Tense.Present,
                        voice: Voice.Active,
                    };
                    const firstContext: ConjugationParams = {
                        gender: Gender.Male,
                        numerus: Numerus.Singular,
                        person: Person.First,
                        tense: Tense.Perfect,
                        voice: Voice.Active
                    };

                    switch(root.type)
                    {
                        case RootType.InitialWeak:
                        case RootType.HamzaOnR1:
                        case RootType.Regular:
                        {
                            return {
                                requiredContext: [
                                    presentContext
                                ],
                                types: [
                                    ModernStandardArabicStem1ParametersType.PastA_PresentA,
                                    ModernStandardArabicStem1ParametersType.PastA_PresentI,
                                    ModernStandardArabicStem1ParametersType.PastA_PresentU,
                                    ModernStandardArabicStem1ParametersType.PastI_PresentA,
                                    ModernStandardArabicStem1ParametersType.RegularOrHollow_PastI_PresentI,
                                    ModernStandardArabicStem1ParametersType.RegularOrHollow_PastU_PresentU,
                                ]
                            }
                        }
                        case RootType.FinalWeak:
                            const special = GetSpeciallyIrregularDefectivePresentTashkilForStem1IfMatching(root);
                            if(special !== undefined)
                            {
                                return {
                                    requiredContext: [],
                                    types: [special],
                                };
                            }
                            
                            return {
                                requiredContext: [],
                                types: [
                                    ModernStandardArabicStem1ParametersType.DefectiveType1,
                                    ModernStandardArabicStem1ParametersType.DefectiveType2,
                                    ModernStandardArabicStem1ParametersType.DefectiveType3,
                                ],
                            };
                        case RootType.MiddleWeak:
                            {
                                const r2DependentType = (root.r2 === Letter.Waw) ? ModernStandardArabicStem1ParametersType.RegularOrHollow_PastU_PresentU : ModernStandardArabicStem1ParametersType.RegularOrHollow_PastI_PresentI;
                                return {
                                    requiredContext: [
                                        presentContext,
                                        firstContext,
                                    ],
                                    types: [
                                        r2DependentType,
                                        ModernStandardArabicStem1ParametersType.PastI_PresentA,
                                        ModernStandardArabicStem1ParametersType.Hollow_PastU_PresentA,
                                    ],
                                };
                            }
                        case RootType.Quadriliteral:
                            return {
                                requiredContext: [],
                                types: [
                                    ModernStandardArabicStem1ParametersType.Quadrilateral,
                                ],
                            };
                        case RootType.SecondConsonantDoubled:
                            {
                                return {
                                    requiredContext: [
                                        presentContext,
                                        firstContext
                                    ],
                                    types: [
                                        ModernStandardArabicStem1ParametersType.PastA_PresentU,
                                        ModernStandardArabicStem1ParametersType.PastA_PresentI,
                                        ModernStandardArabicStem1ParametersType.PastA_PresentA,
                                        ModernStandardArabicStem1ParametersType.PastI_PresentA,
                                    ],
                                };
                            }
                        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                            return {
                                requiredContext: [],
                                types: [
                                    ModernStandardArabicStem1ParametersType.DefectiveType1,
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