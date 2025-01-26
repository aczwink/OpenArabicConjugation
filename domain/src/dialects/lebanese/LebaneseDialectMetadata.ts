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
import { Gender, Mood, Numerus, Person, Stem1Context, Tashkil, Tense, VerbConjugationScheme, Voice } from "../../Definitions";
import { DialectMetadata, Stem1ContextChoice } from "../../DialectsMetadata";
import { RootType, VerbRoot } from "../../VerbRoot";

export enum LebaneseStem1Context
{
    Regular_PastA_PresentU = "Rau1",
    Regular_PastA_PresentU_Form2 = "Rau2"
}

export class LebaneseDialectMetadata implements DialectMetadata<LebaneseStem1Context>
{
    hasDual = false;
    hasFemalePlural = false;
    hasJussive = false;
    hasPassive = false;
    iso639code = "apc";
    glottoCode = "stan1323";

    public CreateStem1Context(rootType: RootType, type: LebaneseStem1Context): Stem1Context
    {
        return {
            _legacy_middleRadicalTashkil: Tashkil.Fatha,
            _legacy_middleRadicalTashkilPresent: Tashkil.Fatha,
            scheme: VerbConjugationScheme.Regular,
            type,
        };
    }

    public GetStem1ContextChoices(root: VerbRoot): Stem1ContextChoice<LebaneseStem1Context>
    {
        switch(root.type)
        {
            case RootType.Sound:
            {
                return {
                    types: [
                        LebaneseStem1Context.Regular_PastA_PresentU,
                        LebaneseStem1Context.Regular_PastA_PresentU_Form2,
                    ],
                    requiredContext: {
                        gender: Gender.Female,
                        mood: Mood.Indicative,
                        numerus: Numerus.Singular,
                        person: Person.Second,
                        tense: Tense.Present,
                        voice: Voice.Active
                    }
                };
            }
        }

        return {
            types: []
        };
    }
}