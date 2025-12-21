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

import { AdjectiveOrNounDeclensionParams, AdjectiveOrNounState, Case, Tashkil } from "../../../Definitions";
import { AdjectiveOrNounInput } from "../../../DialectConjugator";
import { DisplayTashkil, DisplayVocalized } from "../../../Vocalization";


function WithTashkilOnAlefMaksura(vocalized: DisplayVocalized[], tashkil?: DisplayTashkil)
{
    const preLast = vocalized[vocalized.length - 2];
    return vocalized.slice(0, vocalized.length - 2).concat([
        {
            ...preLast,
            tashkil
        },
        vocalized.Last()
    ]);
}

export function DeclineAdjectiveAnSuffix(input: AdjectiveOrNounInput, params: AdjectiveOrNounDeclensionParams): DisplayVocalized[]
{
    if((params.state === AdjectiveOrNounState.Indefinite) && (params.case !== Case.Informal))
        return input.vocalized;
    return WithTashkilOnAlefMaksura(input.vocalized, Tashkil.Fatha);
}