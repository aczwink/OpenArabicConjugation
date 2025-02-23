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
import { Gender, Letter, Mood, Numerus, Person, Stem1Context, Tashkil, Tense, VerbType, Voice } from "../../Definitions";
import { DialectMetadata, Stem1ContextChoice } from "../../DialectsMetadata";
import { RootType, VerbRoot } from "../../VerbRoot";

export enum LebaneseStem1Context
{
    IrregularJy2 = "irjy2",
    PastA_PresentI = "ai",
    PastA_PresentU = "au",
    PastA_PresentU_Form2 = "au2",
    PastI_PresentA = "ia",
    PastI_PresentI = "ii",
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

    public CreateStem1Context(verbConjugationScheme: VerbType, type: LebaneseStem1Context): Stem1Context
    {
        return {
            _legacy_middleRadicalTashkil: Tashkil.Fatha,
            _legacy_middleRadicalTashkilPresent: Tashkil.Fatha,
            scheme: verbConjugationScheme,
            type,
        };
    }

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
                        LebaneseStem1Context.PastA_PresentU,
                        LebaneseStem1Context.PastA_PresentU_Form2,
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