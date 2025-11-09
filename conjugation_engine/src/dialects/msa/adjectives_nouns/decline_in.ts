/**
 * OpenArabicConjugation
 * Copyright (C) 2024 Amir Czwink (amir130@hotmail.de)
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

import { AdjectiveOrNounDeclensionParams, Letter, Tashkil } from "../../../Definitions";
import { DisplayVocalized } from "../../../Vocalization";

export function DeclineAdjectiveInSuffix(vocalized: DisplayVocalized[], params: AdjectiveOrNounDeclensionParams): DisplayVocalized[]
{
    const last = vocalized[vocalized.length - 1];
    const standard = vocalized.slice(0, vocalized.length - 1).concat([
        {
            ...last,
            tashkil: Tashkil.Kasra
        },
        {
            letter: Letter.Ya,
            emphasis: false,
            shadda: false
        }
    ]);

    throw new Error("HERE");
    /*if(params.gender === Gender.Male)
    {
        if(params.definite)
            return standard;
        return vocalized;
    }

    return WithTashkilOnLast(RegularFemaleWithFathaThenTaMarbuta(standard), AdjectiveEndingTashkil(params));*/
}
