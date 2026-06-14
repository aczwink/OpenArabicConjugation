/**
 * OpenArabicConjugation
 * Copyright (C) 2024-2026 Amir Czwink (amir130@hotmail.de)
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

import { FinalVowel, Vowel } from "../../../Conjugation";
import { Case, Gender, Letter, AdjectiveOrNounDeclensionParams, AdjectiveOrNounState, Numerus } from "../../../Definitions";
import { TransformableWord } from "../../../TransformableWord";

function AdjectiveEndingTashkil(casus: Case, isDefinite: boolean): Vowel | FinalVowel
{
    switch(casus)
    {
        case Case.Accusative:
            if(isDefinite)
                return Vowel.ShortA;
            return FinalVowel.Fathatan;

        case Case.Genitive:
            if(isDefinite)
                return Vowel.ShortI;
            return FinalVowel.Kasratan;

        case Case.Informal:
            return FinalVowel.None;

        case Case.Nominative:
            if(isDefinite)
                return Vowel.ShortU;
            return FinalVowel.Dhammatan;
    }
}

function EndingTashkil(inputNoun: TransformableWord, params: AdjectiveOrNounDeclensionParams)
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

function DeclineDefault(inputNoun: TransformableWord, params: AdjectiveOrNounDeclensionParams)
{
    if((params.case === Case.Accusative) && (params.state === AdjectiveOrNounState.Indefinite) && (inputNoun.gender === Gender.Male))
        return inputNoun.WithFathatanEnding();
    return inputNoun.WithReplacedEnding(EndingTashkil(inputNoun, params));
}

export function DeclineTriptoteSuffix(inputNoun: TransformableWord, params: AdjectiveOrNounDeclensionParams): TransformableWord
{
    switch(inputNoun.numerus)
    {
        case Numerus.Singular:
            return DeclineDefault(inputNoun, params);

        case Numerus.Dual:
        {
            const withCorrectVowel = (params.case === Case.Nominative) ? inputNoun.WithLastTrimmed().WithReplacedSilentEnding(Vowel.LongA, Letter.Nun) : inputNoun;
            const fixedEnding = withCorrectVowel.WithReplacedEnding((params.case === Case.Informal) ? FinalVowel.None : Vowel.ShortI);
            
            if(params.state === AdjectiveOrNounState.Construct)
                return fixedEnding.WithLastTrimmed();

            return fixedEnding;
        }

        case Numerus.Plural:
        {
            if(inputNoun.IsSoundMasculinePlural())
            {
                const withCorrectVowel = (params.case === Case.Nominative) ? inputNoun : inputNoun.WithLastTrimmed().WithReplacedSilentEnding(Vowel.LongI, Letter.Nun);
                const fixedEnding = withCorrectVowel.WithReplacedEnding((params.case === Case.Informal) ? FinalVowel.None : Vowel.ShortA);

                if(params.state === AdjectiveOrNounState.Construct)
                    return fixedEnding.WithLastTrimmed();

                return fixedEnding;
            }
            
            return DeclineDefault(inputNoun, params);
        }
    }
}