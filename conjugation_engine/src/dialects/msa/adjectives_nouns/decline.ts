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

import { AdjectiveOrNounDeclensionParams, Tashkil, AdjectiveOrNounState, Letter, Gender, Numerus } from "../../../Definitions";
import { AdjectiveOrNounInput } from "../../../DialectConjugator";
import { IsSunLetter } from "../../../Util";
import { DisplayVocalized } from "../../../Vocalization";
import { DeclineTriptoteSuffix } from "./triptote";
import { DeclineAdjectiveInSuffix, InSuffixNominativeToInformal } from "./decline_in";
import { DeclineAdjectiveAnSuffix } from "./decline_an";

function ConditionallyAddArticle(isDefinite: boolean, vocalized: DisplayVocalized[]): DisplayVocalized[]
{
    if(isDefinite)
    {
        const v = vocalized;
        if(IsSunLetter(v[0].letter))
        {
            return [
                { emphasis: false, letter: Letter.Alef, shadda: false },
                { emphasis: false, letter: Letter.Lam, shadda: false },
                { ...v[0], shadda: true },
                ...v.slice(1),
            ];
        }
        return [
            { emphasis: false, letter: Letter.Alef, shadda: false },
            { emphasis: false, letter: Letter.Lam, shadda: false, tashkil: Tashkil.Sukun},
            ...v
        ];
    }
    return vocalized;
}

export function AdjectiveOrNounToBaseForm(singular: DisplayVocalized[]): DisplayVocalized[]
{
    switch(DetermineInflectionType({ gender: Gender.Male, numerus: Numerus.Singular, vocalized: singular }))
    {
        case AdjectiveOrNounInflectionType.An:
            return [
                ...singular.slice(0, singular.length - 2),
                { letter: singular[singular.length - 2].letter, emphasis: false, shadda: false, tashkil: Tashkil.Fatha },
                { letter: Letter.Ya, emphasis: false, shadda: false }
            ];
        case AdjectiveOrNounInflectionType.In:
            return InSuffixNominativeToInformal(singular);
    }
    
    return singular;
}

enum AdjectiveOrNounInflectionType
{
    //Ending in Fathatan-Alef-maksura
    An,
    //Ending in Kasratan
    In,
    //Normal, 3 cases
    RegularTriptote,
}

function DetermineInflectionType(input: AdjectiveOrNounInput): AdjectiveOrNounInflectionType
{
    const singular = input.vocalized;

    if((singular.Last().letter === Letter.AlefMaksura) && (singular[singular.length - 2].tashkil === Tashkil.Fathatan))
        return AdjectiveOrNounInflectionType.An;
    if(singular.Last().tashkil === Tashkil.Kasratan)
        return AdjectiveOrNounInflectionType.In;
    return AdjectiveOrNounInflectionType.RegularTriptote;
}

export function DeclineAdjectiveOrNounImpl(input: AdjectiveOrNounInput, params: AdjectiveOrNounDeclensionParams)
{
    function inner()
    {
        switch(DetermineInflectionType(input))
        {
            case AdjectiveOrNounInflectionType.An:
                return DeclineAdjectiveAnSuffix(input, params);
            case AdjectiveOrNounInflectionType.In:
                return DeclineAdjectiveInSuffix(input, params);
            case AdjectiveOrNounInflectionType.RegularTriptote:
                return DeclineTriptoteSuffix(input, params);
        }
    }
    
    return ConditionallyAddArticle(params.state === AdjectiveOrNounState.Definite, inner());
}