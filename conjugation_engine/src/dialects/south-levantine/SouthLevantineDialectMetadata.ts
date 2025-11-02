/**
 * OpenArabicConjugation
 * Copyright (C) 2025 Amir Czwink (amir130@hotmail.de)
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
import { VerbType } from "../../Definitions";
import { DialectMetadata, Stem1ContextChoice } from "../../DialectsMetadata";
import { Verb } from "../../Verb";
import { VerbRoot } from "../../VerbRoot";

export enum SouthLevantineStem1Context
{
    todo = "todo"
}

export class SouthLevantineDialectMetadata implements DialectMetadata<SouthLevantineStem1Context>
{
    hasDual = false;
    hasFemalePlural = false;
    hasJussive = false;
    hasPassive = false;
    iso639code = "ajp";
    glottoCode = "sout3123";

    public DeriveVerbType(root: VerbRoot): VerbType
    {
        return root.DeriveDeducedVerbType();
    }

    public GetStem1ContextChoices(verbType: VerbType, root: VerbRoot): Stem1ContextChoice<SouthLevantineStem1Context>
    {
        return {
            requiredContext: [],
            types: []
        };
    }

    public IsConjugatable(verb: Verb<SouthLevantineStem1Context>): boolean
    {
        switch(verb.type)
        {
            case VerbType.Defective:
                switch(verb.stem)
                {
                    case 4:
                        return true;
                }
                break;
        }
        return false;
    }
}