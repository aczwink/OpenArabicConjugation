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
import { ConjugationParams, Gender, Letter, Mood, Numerus, Person, Tense, VerbType, Voice } from "../../Definitions";
import { DialectMetadata, Stem1ContextChoice } from "../../DialectsMetadata";
import { RootType, VerbRoot } from "../../VerbRoot";
import { GetSpeciallyIrregularDefectivePresentTashkilForStem1IfMatching } from "./conjugation/defective_special_cases";
import { ModernStandardArabicStem1ParametersType } from "./conjugation/r2tashkil";

export class MSADialectMetadata implements DialectMetadata<ModernStandardArabicStem1ParametersType>
{
    hasDual = true;
    hasFemalePlural = true;
    hasJussive = true;
    hasPassive = true;
    iso639code = "arb";
    glottoCode = "stan1318";

    public DeriveDeducedVerbTypeFromRootType(root: VerbRoot): VerbType
    {
        const verbType = root.DeriveDeducedVerbType();
        switch(verbType)
        {
            case VerbType.QuadriliteralAndDefective:
                return VerbType.SoundQuadriliteral;
        }
        return verbType;
    }

    public GetStem1ContextChoices(verbType: VerbType, root: VerbRoot): Stem1ContextChoice<ModernStandardArabicStem1ParametersType>
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

        switch(verbType)
        {
            case VerbType.Assimilated:
            {
                return {
                    requiredContext: [
                        presentContext
                    ],
                    types: [
                        ModernStandardArabicStem1ParametersType.PastA_PresentA,
                        ModernStandardArabicStem1ParametersType.PastA_PresentI,
                        ModernStandardArabicStem1ParametersType.PastI_PresentI,
                    ]
                };
            }
            case VerbType.Sound:
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
                        ModernStandardArabicStem1ParametersType.PastI_PresentI,
                        ModernStandardArabicStem1ParametersType.PastU_PresentU,
                    ]
                };
            }
        }

        switch(root.type)
        {
            case RootType.HamzaOnR1:
            {
                return {
                    requiredContext: [
                        presentContext
                    ],
                    types: [
                        ModernStandardArabicStem1ParametersType.PastA_PresentI,
                        ModernStandardArabicStem1ParametersType.PastA_PresentU,
                        ModernStandardArabicStem1ParametersType.PastI_PresentA,
                        ModernStandardArabicStem1ParametersType.PastU_PresentU,
                    ]
                };
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
                    const r2DependentType = (root.r2 === Letter.Waw) ? ModernStandardArabicStem1ParametersType.PastU_PresentU : ModernStandardArabicStem1ParametersType.PastI_PresentI;
                    return {
                        requiredContext: [
                            presentContext,
                            firstContext,
                        ],
                        types: [
                            r2DependentType,
                            ModernStandardArabicStem1ParametersType.PastI_PresentA,
                        ],
                    };
                }
            case RootType.Quadriliteral:
            case RootType.Quadriliteral_FinalWeak:
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
}