/**
 * OpenArabicConjugation
 * Copyright (C) 2025-2026 Amir Czwink (amir130@hotmail.de)
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

import { AdjectiveOrNounDeclensionParams, AdjectiveOrNounState, Letter } from "../../../Definitions";
import { DeclineTriptoteSuffix } from "./triptote";
import { DeclineAdjectiveInSuffix, InSuffixNominativeToInformal } from "./decline_in";
import { DeclineAdjectiveAnSuffix } from "./decline_an";
import { FinalVowel, Vowel } from "../../../Conjugation";
import { TransformableWord } from "../../../TransformableWord";

function ConditionallyAddArticle(isDefinite: boolean, vocalized: TransformableWord): TransformableWord
{
    if(isDefinite)
        return vocalized.WithPrependedArticle();
    return vocalized;
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

function DetermineInflectionType(singular: TransformableWord): AdjectiveOrNounInflectionType
{
    if(singular.finalVowel === FinalVowel.AlefMaksuraWithFathatan)
        return AdjectiveOrNounInflectionType.An;
    if(singular.finalVowel === FinalVowel.Kasratan)
        return AdjectiveOrNounInflectionType.In;
    return AdjectiveOrNounInflectionType.RegularTriptote;
}

export function AdjectiveOrNounToBaseForm(word: TransformableWord): TransformableWord
{
    switch(DetermineInflectionType(word))
    {
        case AdjectiveOrNounInflectionType.An:
            return word.WithReplacedSilentEnding(Vowel.ShortA, Letter.Ya);
        case AdjectiveOrNounInflectionType.In:
            return InSuffixNominativeToInformal(word);
    }
    
    return word;
}

export function DeclineAdjectiveOrNounImpl(input: TransformableWord, isDefinite: boolean, params: AdjectiveOrNounDeclensionParams)
{
    if(isDefinite && (params.state !== AdjectiveOrNounState.Definite))
        throw new Error("currently can only change state from indefinite");
    
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
    
    return ConditionallyAddArticle(!isDefinite && (params.state === AdjectiveOrNounState.Definite), inner());
}