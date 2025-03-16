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

import { ConjugationParams, Gender, Letter, Mood, Numerus, Person, Tashkil, Tense, Voice } from "../../../Definitions";
import { VerbStemData } from "../../../Verb";
import { AugmentedRoot, SymbolName } from "../AugmentedRoot";
import { ExtractMiddleRadicalTashkil, ExtractPresentMiddleRadicalTashkil, ModernStandardArabicStem1ParametersType } from "./r2tashkil";

function DoesPresentSuffixStartWithVowel(params: ConjugationParams)
{
    if( (params.numerus === Numerus.Singular) && (params.person === Person.Second) && (params.gender === Gender.Female) )
        return true;
    if(params.numerus === Numerus.Dual)
        return true;
    if( (params.numerus === Numerus.Plural) && (params.person !== Person.First) && (params.gender === Gender.Male) )
        return true;
    return false;
}

export function ShortenOrAlefizeR2(augmentedRoot: AugmentedRoot, stemData: VerbStemData<ModernStandardArabicStem1ParametersType>, params: ConjugationParams)
{
    switch(stemData.stem)
    {
        case 1:
        {
            const vowelTashkil = (augmentedRoot.r2.letter === Letter.Waw) ? Tashkil.Dhamma : Tashkil.Kasra;

            if(params.tense === Tense.Perfect)
            {
                if((params.person === Person.Third) && !((params.numerus === Numerus.Plural) && (params.gender === Gender.Female)))
                {
                    if(params.voice === Voice.Active)
                        augmentedRoot.InsertLongVowel(2, Letter.Alef);
                    else
                        augmentedRoot.InsertLongVowel(2, Letter.Ya);
                }
                else
                {
                    //shorten vowel
                    const tashkil = (ExtractPresentMiddleRadicalTashkil(stemData.stemParameterization) === Tashkil.Fatha) ? ExtractMiddleRadicalTashkil(stemData.stemParameterization) : vowelTashkil;
                    augmentedRoot.ApplyRadicalTashkil(2, (params.voice === Voice.Active) ? tashkil : Tashkil.Kasra);
                    augmentedRoot.AssimilateRadical(2);
                }
            }
            else
            {
                let shortenVowel = (params.numerus === Numerus.Plural) && (params.gender === Gender.Female);

                if((params.mood === Mood.Jussive) || (params.mood === Mood.Imperative))
                {
                    shortenVowel = !DoesPresentSuffixStartWithVowel(params);
                }

                augmentedRoot.ApplyRadicalTashkil(2, Tashkil.LongVowelMarker);

                if(shortenVowel)
                    augmentedRoot.AssimilateRadical(2);
                else if((params.voice === Voice.Passive) || (ExtractPresentMiddleRadicalTashkil(stemData.stemParameterization) === Tashkil.Fatha))
                    augmentedRoot.ReplaceRadical(2, { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker });

                augmentedRoot.ApplyRadicalTashkil(1, (params.voice === Voice.Active) ? vowelTashkil : Tashkil.Fatha);
            }
        }
        break;
        case 4:
        case 8:
        case 10:
        {
            if(params.tense === Tense.Perfect)
            {
                if((params.person === Person.Third) && !((params.numerus === Numerus.Plural) && (params.gender === Gender.Female)))
                    augmentedRoot.InsertLongVowel(2, (params.voice === Voice.Active) ? Letter.Alef : Letter.Ya);
                else
                    augmentedRoot.InsertShortVowel(2, (params.voice === Voice.Active) ? Tashkil.Fatha : Tashkil.Kasra);
            }
            else
            {
                let shortenVowel = (params.numerus === Numerus.Plural) && (params.gender === Gender.Female);

                if((params.mood === Mood.Jussive) || (params.mood === Mood.Imperative))
                {
                    shortenVowel = !DoesPresentSuffixStartWithVowel(params);
                }

                if(shortenVowel)
                {
                    augmentedRoot.AssimilateRadical(2);
                    if(stemData.stem === 8)
                        augmentedRoot.ApplyTashkil(SymbolName.Infix, Tashkil.Fatha);
                }
                else
                {
                    const alefCondition = (stemData.stem === 8) || (params.voice === Voice.Passive);
                    augmentedRoot.InsertLongVowel(2, alefCondition ? Letter.Alef : Letter.Ya);
                }
            }
        }
        break;
    }
};