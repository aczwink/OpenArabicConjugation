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
import { Gender, Letter, Mood, Numerus, Person, Tense, Voice } from "../../Definitions";
import { DialectMetadata, Stem1ContextChoice } from "../../DialectsMetadata";
import { RootType, VerbRoot } from "../../VerbRoot";

export enum LebaneseStem1Context
{
    IrregularJy2 = "irjy2",
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

    public GetStem1ContextChoices(root: VerbRoot): Stem1ContextChoice<LebaneseStem1Context>
    {
        if(root.radicalsAsSeparateLetters.Equals([Letter.Jiim, Letter.Ya, Letter.Hamza]))
        {
            return {
                requiredContext: [],
                types: [
                    LebaneseStem1Context.IrregularJy2
                ]
            };
        }

        switch(root.type)
        {
            case RootType.FinalWeak:
            {
                return {
                    requiredContext: [],
                    types: [
                        LebaneseStem1Context.PastA_PresentI,
                        LebaneseStem1Context.PastI_PresentA,
                        LebaneseStem1Context.PastI_PresentI,
                    ],
                };
            }
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
                    requiredContext: [],
                    types: [
                        LebaneseStem1Context.PastI_PresentI,
                        LebaneseStem1Context.PastI_PresentU
                    ],
                };
            }
            case RootType.Quadriliteral:
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
                        }
                    ],
                    types: [
                        LebaneseStem1Context.PastA_PresentA,
                        LebaneseStem1Context.RegularPastA_PresentISU,
                        LebaneseStem1Context.RegularPastA_PresentIIU,
                        LebaneseStem1Context.RegularPastA_PresentUSU,
                        LebaneseStem1Context.PastI_PresentA,
                    ],
                };
            }
            case RootType.SecondConsonantDoubled:
            {
                return {
                    requiredContext: [],
                    types: [
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
}