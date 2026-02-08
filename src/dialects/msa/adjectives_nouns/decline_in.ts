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

import { AdjectiveOrNounDeclensionParams, AdjectiveOrNounState, Case, Gender, Letter, Numerus, Tashkil } from "../../../Definitions";
import { AdjectiveOrNounInput } from "../../../DialectConjugator";
import { DisplayVocalized } from "../../../Vocalization";
import { WithTashkilOnLast } from "./shared";

export function DeclineAdjectiveInSuffix(input: AdjectiveOrNounInput, params: AdjectiveOrNounDeclensionParams): DisplayVocalized[]
{
    if(params.state === AdjectiveOrNounState.Indefinite)
    {
        if((params.case === Case.Nominative) || (params.case === Case.Genitive))
            return input.vocalized;
    }

    const with_ya = InSuffixNominativeToInformal(input.vocalized);

    if(params.case === Case.Accusative)
    {
        if((params.state === AdjectiveOrNounState.Indefinite) && (input.gender === Gender.Male) && (input.numerus === Numerus.Singular))
            return WithTashkilOnLast(with_ya, Tashkil.Fathatan).concat([ { emphasis: false, letter: Letter.Alef, shadda: false }]);
        return WithTashkilOnLast(with_ya, Tashkil.Fatha);
    }

    return with_ya;
}

export function InSuffixNominativeToInformal(vocalized: DisplayVocalized[])
{
    const with_ya = vocalized.slice(0, vocalized.length - 1).concat([
        {
            ...vocalized.Last(),
            tashkil: Tashkil.Kasra
        },
        {
            letter: Letter.Ya, emphasis: false, shadda: false
        }
    ]);

    return with_ya;
}