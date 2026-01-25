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
import { AdvancedStemNumber, Gender, Mood, Numerus, Person, Tense, VerbType, Voice } from "../../Definitions";
import { DialectMetadata, Stem1ContextChoice } from "../../DialectsMetadata";
import { Verb } from "../../Verb";
import { RootType, VerbRoot } from "../../VerbRoot";

export enum LebaneseStem1Context
{
    AssimilatedPastII_PresentA = "iia",
    /**
     * Past R2: a
     * Present prefix: a (unlike normal defective type 1 which is i)
     * Present R2: i
     */
    DefectiveType1WithPrefixA = "d1a",
    DefectiveWithImperativeA = "diaa",
    IrregularIja = "irregular_ija",
    PastA_PresentA = "aa",
    PastA_PresentI = "ai",
    PastA_PresentU = "au",
    PastI_PresentA = "ia",
    PastI_PresentI = "ii",
    PastI_PresentU = "iu",
    /**
     * Past R2: a
     * Present prefix: i
     * Present R1: i
     * Present R2: u
     */
    RegularPastA_PresentIIU = "aiiu",
    /**
     * Past R2: a
     * Present prefix: i
     * Present R1: i
     * Present R2: u
     * Imperative: u
     */
    RegularPastA_PresentIIUU = "aiiuu",
    /**
     * Past R2: a
     * Present prefix: i
     * Present R1: s
     * Present R2: u
     */
    RegularPastA_PresentISU = "aisu",
    /**
     * Past R2: a
     * Present prefix: u
     * Present R1: s
     * Present R2: u
     */
    RegularPastA_PresentUSU = "ausu",
    /**
     * Past R2: i
     * Present prefix: a
     * Present R2: a
     */
    RegularPastI_PresentAA = "iaa",
    Quadrilateral = "ss",
}

export class LebaneseDialectMetadata implements DialectMetadata<LebaneseStem1Context>
{
    hasDual = false;
    hasFemalePlural = false;
    hasJussive = false;
    hasPassive = false;
    iso639code = "apc";
    glottoCode = "stan1323";

    public DeriveVerbType(root: VerbRoot, stem: LebaneseStem1Context | AdvancedStemNumber): VerbType
    {
        const verbType = root.DeriveDeducedVerbType();
        switch(verbType)
        {
            case VerbType.AssimilatedAndDefective:
                if(typeof stem !== "number")
                    return VerbType.Defective;
        }

        return verbType;
    }

    public GetStem1ContextChoices(verbType: VerbType, root: VerbRoot): Stem1ContextChoice<LebaneseStem1Context>
    {
        switch(verbType)
        {
            case VerbType.Assimilated:
            {
                return {
                    requiredContext: [],
                    types: [
                        LebaneseStem1Context.AssimilatedPastII_PresentA,
                        LebaneseStem1Context.PastA_PresentI,
                        LebaneseStem1Context.PastI_PresentA,
                    ],
                };
            }
            case VerbType.Defective:
            {
                return {
                    requiredContext: [
                        {
                            gender: Gender.Male,
                            mood: Mood.Imperative,
                            numerus: Numerus.Singular,
                            person: Person.Second,
                            tense: Tense.Present,
                            voice: Voice.Active
                        }
                    ],
                    types: [
                        LebaneseStem1Context.DefectiveType1WithPrefixA,
                        LebaneseStem1Context.DefectiveWithImperativeA,
                        LebaneseStem1Context.PastA_PresentA,
                        LebaneseStem1Context.PastA_PresentI,
                        LebaneseStem1Context.PastI_PresentA,
                        LebaneseStem1Context.PastI_PresentI,
                    ],
                };
            }
            case VerbType.Irregular:
            {
                return {
                    requiredContext: [],
                    types: [
                        LebaneseStem1Context.IrregularIja
                    ]
                };
            }
        }

        switch(root.type)
        {            
            case RootType.HamzaOnR1:
            {
                return {
                    requiredContext: [],
                    types: [
                        LebaneseStem1Context.PastA_PresentU,
                    ],
                };
            }
            case RootType.MiddleWeak:
            {
                return {
                    requiredContext: [
                        {
                            gender: Gender.Male,
                            mood: Mood.Indicative,
                            numerus: Numerus.Singular,
                            person: Person.Third,
                            tense: Tense.Present,
                            voice: Voice.Active
                        }
                    ],
                    types: [
                        LebaneseStem1Context.PastI_PresentA,
                        LebaneseStem1Context.PastI_PresentI,
                        LebaneseStem1Context.PastI_PresentU
                    ],
                };
            }
            case RootType.Quadriliteral:
            case RootType.Quadriliteral_FinalWeak:
            {
                return {
                    requiredContext: [],
                    types: [
                        LebaneseStem1Context.Quadrilateral,
                    ],
                };
            }
            case RootType.Regular:
            {
                return {
                    requiredContext: [
                        {
                            gender: Gender.Female,
                            mood: Mood.Indicative,
                            numerus: Numerus.Singular,
                            person: Person.Second,
                            tense: Tense.Present,
                            voice: Voice.Active
                        },
                        {
                            gender: Gender.Female,
                            mood: Mood.Imperative,
                            numerus: Numerus.Singular,
                            person: Person.Second,
                            tense: Tense.Present,
                            voice: Voice.Active
                        }
                    ],
                    types: [
                        LebaneseStem1Context.PastA_PresentA,
                        LebaneseStem1Context.RegularPastA_PresentISU,
                        LebaneseStem1Context.RegularPastA_PresentIIU,
                        LebaneseStem1Context.RegularPastA_PresentIIUU,
                        LebaneseStem1Context.RegularPastA_PresentUSU,
                        LebaneseStem1Context.RegularPastI_PresentAA,
                        LebaneseStem1Context.PastI_PresentA,
                        LebaneseStem1Context.PastI_PresentI,
                        LebaneseStem1Context.PastI_PresentU
                    ],
                };
            }
            case RootType.SecondConsonantDoubled:
            {
                return {
                    requiredContext: [
                        {
                            gender: Gender.Male,
                            mood: Mood.Indicative,
                            numerus: Numerus.Singular,
                            person: Person.Third,
                            tense: Tense.Present,
                            voice: Voice.Active
                        }
                    ],
                    types: [
                        LebaneseStem1Context.PastA_PresentA,
                        LebaneseStem1Context.PastA_PresentI,
                        LebaneseStem1Context.PastA_PresentU,
                    ],
                };
            }
        }

        return {
            requiredContext: [],
            types: []
        };
    }

    public IsConjugatable(verb: Verb<LebaneseStem1Context>): boolean
    {
        switch(verb.type)
        {
            case VerbType.Assimilated:
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
                    case 7:
                    case 8:
                        return true;
                }
                break;
            case VerbType.HamzaOnR1:
                switch(verb.stem)
                {
                    case 1:
                        return true;
                }
                break;
            case VerbType.Hollow:
                switch(verb.stem)
                {
                    case 1:
                    case 3:
                    //case 7: //test incomplete :(
                    case 8:
                        return true;
                }
                break;
            case VerbType.Irregular:
                switch(verb.stem)
                {
                    case 1:
                        return true;
                }
                break;
            case VerbType.QuadriliteralAndDefective:
                switch(verb.stem)
                {
                    case 1:
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
                        return true;
                }
                break;
        }
        return false;
    }
}