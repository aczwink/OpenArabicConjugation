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

import { Letter, Tashkil, PrimaryTashkil, ConjugationParams, Voice, Tense, Person, Numerus, Gender, Mood } from "../../../Definitions";
import { VerbStemData } from "../../../Verb";
import { RootType } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";
import { _Legacy_ExtractPresentMiddleRadicalTashkil, ModernStandardArabicStem1ParametersType } from "./r2tashkil";

function DerivePrefixTashkil(rootType: RootType, stemData: VerbStemData<ModernStandardArabicStem1ParametersType>, params: ConjugationParams)
{
    if(rootType === RootType.Quadriliteral)
    {
        if(stemData.stem === 1)
            return Tashkil.Dhamma;
    }
    
    switch(stemData.stem)
    {
        case 1:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            return (params.voice === Voice.Active) ? Tashkil.Fatha : Tashkil.Dhamma;
        case 2:
        case 3:
        case 4:
            return Tashkil.Dhamma;
    }
}

function GetImperativeTashkil(stemParameterization: ModernStandardArabicStem1ParametersType)
{
    switch(stemParameterization)
    {
        case ModernStandardArabicStem1ParametersType.IrregularHayiya:
            return Tashkil.Kasra;
    }
    return _Legacy_ExtractPresentMiddleRadicalTashkil(stemParameterization);
}

export function DerivePrefix(prevTashkil: (PrimaryTashkil | Tashkil.Sukun), rootType: RootType, stemData: VerbStemData<ModernStandardArabicStem1ParametersType>, params: ConjugationParams): ConjugationVocalized[]
{
    if(params.tense === Tense.Perfect)
    {
        if(prevTashkil === Tashkil.Sukun)
        {
            //insert hamzat al wasl
            return [{ letter: Letter.Alef, tashkil: (params.voice === Voice.Active) ? Tashkil.Kasra : Tashkil.Dhamma}];
        }
        return [];
    }

    if(params.mood === Mood.Imperative)
    {
        if(stemData.stem === 4)
            return [{ letter: Letter.AlefHamza, tashkil: Tashkil.Fatha}];

        if(prevTashkil === Tashkil.Sukun)
        {
            const stem1ctx = (stemData.stem === 1) ? GetImperativeTashkil(stemData.stemParameterization) : undefined;
            //insert hamzat al wasl
            return [{ letter: Letter.Alef, tashkil: (stem1ctx === Tashkil.Dhamma) ? Tashkil.Dhamma : Tashkil.Kasra}];
        }
        return [];
    }

    const tashkil = DerivePrefixTashkil(rootType, stemData, params);
    switch(params.person)
    {
        case Person.First:
        {
            switch(params.numerus)
            {
                case Numerus.Singular:
                    return [{ letter: Letter.AlefHamza, tashkil }];
                case Numerus.Plural:
                    return [{ letter: Letter.Nun, tashkil }];
            }
        }
        case Person.Second:
            return [{ letter: Letter.Ta, tashkil }];
        case Person.Third:
        {
            if((params.numerus === Numerus.Plural) && (params.gender === Gender.Female))
                return [{ letter: Letter.Ya, tashkil }];
            
            switch(params.gender)
            {
                case Gender.Male:
                    return [{ letter: Letter.Ya, tashkil }];
                case Gender.Female:
                    return [{ letter: Letter.Ta, tashkil }];
            }
        }
    }
}