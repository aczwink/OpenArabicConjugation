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

import { Tashkil, Case } from "../../../Definitions";
import { DisplayVocalized, DisplayTashkil } from "../../../Vocalization";

export function AdjectiveEndingTashkil(casus: Case, isDefinite: boolean): DisplayTashkil | undefined
{
    switch(casus)
    {
        case Case.Accusative:
            if(isDefinite)
                return Tashkil.Fatha;
            return Tashkil.Fathatan;

        case Case.Genitive:
            if(isDefinite)
                return Tashkil.Kasra;
            return Tashkil.Kasratan;

        case Case.Informal:
            return undefined;

        case Case.Nominative:
            if(isDefinite)
                return Tashkil.Dhamma;
            return Tashkil.Dhammatan;
    }
}

export function WithTashkilOnLast(vocalized: DisplayVocalized[], tashkil?: DisplayTashkil)
{
    const last = vocalized[vocalized.length - 1];
    return vocalized.slice(0, vocalized.length - 1).concat([{
        ...last,
        tashkil
    }]);
}