/**
 * OpenArabicConjugation
 * Copyright (C) 2023-2025 Amir Czwink (amir130@hotmail.de)
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

import { AdvancedStemNumber, VerbType } from "./Definitions";
import { DialectType } from "./Dialects";
import { GetDialectMetadata } from "./DialectsMetadata";
import { VerbRoot } from "./VerbRoot";

interface VerbFormBase
{
    readonly type: VerbType;
}

export interface VerbStem1Data<T> extends VerbFormBase
{
    readonly stem: 1;
    readonly stemParameterization: T;
}

interface AdvancedStemData extends VerbFormBase
{
    readonly stem: AdvancedStemNumber;
}

export type VerbStemData<T> = VerbStem1Data<T> | AdvancedStemData;

export type Verb<T extends string> = VerbStemData<T> &
{
    readonly dialect: DialectType;
    readonly root: VerbRoot;
}

export function CreateVerb(dialect: DialectType, root: VerbRoot, stem: string | AdvancedStemNumber, verbType?: VerbType): Verb<string>
{
    const type = verbType ?? GetDialectMetadata(dialect).DeriveDeducedVerbTypeFromRootType(root);

    if(typeof stem === "number")
    {
        return {
            dialect,
            root,
            stem,
            type
        };
    }

    return {
        dialect,
        root,
        stem: 1,
        stemParameterization: stem,
        type
    };
}