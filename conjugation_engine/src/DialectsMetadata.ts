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

import { AdvancedStemNumber, ConjugationParams, VerbType } from "./Definitions";
import { DialectType } from "./Dialects";
import { LebaneseDialectMetadata } from "./dialects/lebanese/LebaneseDialectMetadata";
import { MSADialectMetadata } from "./dialects/msa/MSADialectMetadata";
import { VerbRoot } from "./VerbRoot";

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

    DeriveVerbType(root: VerbRoot, stem: T | AdvancedStemNumber): VerbType;
    GetStem1ContextChoices(verbType: VerbType, root: VerbRoot): Stem1ContextChoice<T>;
}

export function GetDialectMetadata(dialectType: DialectType): DialectMetadata<string>
{
    switch(dialectType)
    {
        case DialectType.ModernStandardArabic:
            return new MSADialectMetadata;
            
        case DialectType.Lebanese:
            return new LebaneseDialectMetadata;
    }
}