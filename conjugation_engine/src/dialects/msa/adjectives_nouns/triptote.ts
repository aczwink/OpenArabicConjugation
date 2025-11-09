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

import { Case, Gender, Letter, AdjectiveOrNounDeclensionParams, AdjectiveOrNounState, Numerus, Tashkil } from "../../../Definitions";
import { AdjectiveOrNounInput } from "../../../DialectConjugator";
import { DisplayTashkil, DisplayVocalized } from "../../../Vocalization";
import { AdjectiveEndingTashkil, WithTashkilOnLast } from "./shared";

function EndingTashkil(inputNoun: AdjectiveOrNounInput, params: AdjectiveOrNounDeclensionParams): DisplayTashkil | undefined
{
    if(inputNoun.gender === Gender.Female)
    {
        if((inputNoun.numerus === Numerus.Plural) && (params.case === Case.Accusative))
            return EndingTashkil(inputNoun, { ...params, case: Case.Genitive });
    }

    if(params.state === AdjectiveOrNounState.Construct)
        return AdjectiveEndingTashkil(params.case, true);

    return AdjectiveEndingTashkil(params.case, params.state === AdjectiveOrNounState.Definite);
}

function DeclineDefault(inputNoun: AdjectiveOrNounInput, params: AdjectiveOrNounDeclensionParams)
{
    if((params.case === Case.Accusative) && (params.state === AdjectiveOrNounState.Indefinite) && (inputNoun.gender === Gender.Male))
        return WithTashkilOnLast(inputNoun.vocalized, Tashkil.Fathatan).concat([ { emphasis: false, letter: Letter.Alef, shadda: false }]);
    return WithTashkilOnLast(inputNoun.vocalized, EndingTashkil(inputNoun, params));
}

export function DeclineTriptoteSuffix(inputNoun: AdjectiveOrNounInput, params: AdjectiveOrNounDeclensionParams): DisplayVocalized[]
{
    switch(inputNoun.numerus)
    {
        case Numerus.Singular:
            return DeclineDefault(inputNoun, params);

        case Numerus.Dual:
        {
            const fixedEnding = WithTashkilOnLast(inputNoun.vocalized, (params.case === Case.Informal) ? undefined : Tashkil.Kasra);

            if(params.case === Case.Nominative)
                fixedEnding[fixedEnding.length - 2] = { letter: Letter.Alef, emphasis: false, shadda: false };
            
            if(params.state === AdjectiveOrNounState.Construct)
                fixedEnding.pop();

            return fixedEnding;
        }

        case Numerus.Plural:
        {
            const last = inputNoun.vocalized[inputNoun.vocalized.length - 1];
            const prev = inputNoun.vocalized[inputNoun.vocalized.length - 2];
            const isSoundMale = (last.letter === Letter.Nun) && (prev.letter === Letter.Waw);

            if(isSoundMale)
            {
                const fixedEnding = WithTashkilOnLast(inputNoun.vocalized, (params.case === Case.Informal) ? undefined : Tashkil.Fatha);
                if(params.case !== Case.Nominative)
                {
                    fixedEnding[fixedEnding.length - 2] = { letter: Letter.Ya, emphasis: false, shadda: false };
                    fixedEnding[fixedEnding.length - 3] = {
                        ...fixedEnding[fixedEnding.length - 3],
                        tashkil: Tashkil.Kasra
                    };
                }

                if(params.state === AdjectiveOrNounState.Construct)
                    fixedEnding.pop();

                return fixedEnding;
            }

            return DeclineDefault(inputNoun, params);
        }
    }
}