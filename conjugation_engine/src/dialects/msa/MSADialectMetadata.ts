/**
 * OpenArabicConjugation
 * Copyright (C) 2024-2026 Amir Czwink (amir130@hotmail.de)
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
import { AdvancedStemNumber, ConjugationParams, Gender, Letter, Mood, Numerus, Person, Tense, VerbType, Voice } from "../../Definitions";
import { DialectMetadata, Stem1ContextChoice } from "../../DialectsMetadata";
import { Verb } from "../../Verb";
import { RootType, VerbRoot } from "../../VerbRoot";
import { ModernStandardArabicStem1ParametersType } from "./conjugation/r2tashkil";

export class MSADialectMetadata implements DialectMetadata<ModernStandardArabicStem1ParametersType>
{
    hasDual = true;
    hasFemalePlural = true;
    hasJussive = true;
    hasPassive = true;
    iso639code = "arb";
    glottoCode = "stan1318";

    public DeriveVerbType(root: VerbRoot, stem: ModernStandardArabicStem1ParametersType | AdvancedStemNumber): VerbType
    {
        const verbType = root.DeriveDeducedVerbType();
        switch(verbType)
        {
            case VerbType.Assimilated:
                switch(stem)
                {
                    case 2:
                    case 3:
                    case 5:
                    case 6:
                        return VerbType.Sound;
                }
                break;
            case VerbType.AssimilatedAndDefective:
                switch(stem)
                {
                    case 5:
                        return VerbType.Defective;
                }
                break;
            case VerbType.HamzaOnR1:
                switch(stem)
                {
                    case 2:
                    case 10:
                        return VerbType.Sound;
                }
                break;
            case VerbType.Hollow:
                switch(stem)
                {
                    case 2:
                    case 3:
                    case 5:
                    case 6:
                        return VerbType.Sound;
                }
                break;
            case VerbType.Geminate:
                switch(stem)
                {
                    case 2:
                    case 5:
                        return VerbType.Sound;
                }
                break;
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
                if(root.r1 === Letter.Ya)
                {
                    return {
                        requiredContext: [
                            presentContext
                        ],
                        types: [
                            ModernStandardArabicStem1ParametersType.PastI_PresentA,
                            ModernStandardArabicStem1ParametersType.PastI_PresentI,
                            ModernStandardArabicStem1ParametersType.PastU_PresentU,
                        ]
                    };
                }

                return {
                    requiredContext: [
                        presentContext
                    ],
                    types: [
                        ModernStandardArabicStem1ParametersType.PastA_PresentA,
                        ModernStandardArabicStem1ParametersType.PastA_PresentI,
                        ModernStandardArabicStem1ParametersType.PastI_PresentA,
                        ModernStandardArabicStem1ParametersType.PastI_PresentI,
                    ]
                };
            }
            case VerbType.Defective:
            {                
                return {
                    requiredContext: [],
                    types: [
                        ModernStandardArabicStem1ParametersType.DefectiveType1,
                        ModernStandardArabicStem1ParametersType.DefectiveType2,
                        ModernStandardArabicStem1ParametersType.DefectiveType3,
                    ],
                };
            }
            case VerbType.Irregular:
            {
                return {
                    requiredContext: [],
                    types: [
                        ModernStandardArabicStem1ParametersType.IrregularHayiya,
                        ModernStandardArabicStem1ParametersType.IrregularLaysa,
                        ModernStandardArabicStem1ParametersType.IrregularRa2a,
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

    public IsConjugatable(verb: Verb<ModernStandardArabicStem1ParametersType>): boolean
    {
        switch(verb.type)
        {
            case VerbType.Assimilated:
                switch(verb.stem)
                {
                    case 1:
                    case 4:
                    case 8:
                    case 10:
                        return true;
                }
                break;
            case VerbType.AssimilatedAndDefective:
                switch(verb.stem)
                {
                    case 1:
                        return true;
                }
                break;
            case VerbType.Defective:
                switch(verb.stem)
                {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 10:
                        return true;
                }
                break;
            case VerbType.Geminate:
                switch(verb.stem)
                {
                    case 1:
                    case 3:
                    case 4:
                    case 8:
                    case 10:
                        return true;
                }
                break;
            case VerbType.HamzaOnR1:
                switch(verb.stem)
                {
                    case 1:
                    case 4:
                    case 8:
                        return true;
                }
                break;
            case VerbType.Hollow:
                switch(verb.stem)
                {
                    case 1:
                    case 4:
                    case 7:
                    case 8:
                    case 10:
                        return true;
                }
                break;
            case VerbType.Irregular:
                switch(verb.stem)
                {
                    case 1:
                    case 4:
                        return true;
                }
                break;
            case VerbType.Sound:
                return true;
            case VerbType.SoundQuadriliteral:
                switch(verb.stem)
                {
                    case 1:
                    case 2:
                    case 4:
                        return true;
                }
                break;
        }
        return false;
    }
}