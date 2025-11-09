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

import { ConjugationParams, Gender, Letter, Numerus, Person, Tashkil, Tense } from "../../../Definitions";
import { VerbStemData } from "../../../Verb";
import { VerbRoot } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";
import { AugmentedRoot, SymbolName } from "../AugmentedRoot";
import { AlterDefectiveEnding, AlterDefectiveSuffix } from "./defective";
import { ModernStandardArabicStem1ParametersType } from "./r2tashkil";

/*
Currently known ones are: رأى, أرى */

export function AlterSpecialCaseRa2a(augmentedRoot: AugmentedRoot, stemData: VerbStemData<ModernStandardArabicStem1ParametersType>, params: ConjugationParams, suffix: ConjugationVocalized[])
{
    AlterDefectiveEnding(augmentedRoot, stemData, params);
    AlterDefectiveSuffix(params, stemData, suffix);

    if(params.tense !== Tense.Perfect)
    {
        const hasR3 = augmentedRoot.symbols.find(x => x.symbolName === SymbolName.R3) !== undefined;
        if(hasR3 && (params.numerus === Numerus.Plural))
        {
            if(params.person === Person.First)
                augmentedRoot.ReplaceRadical(3, { letter: Letter.AlefMaksura, tashkil: Tashkil.AlefMaksuraMarker });
            else
                augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Sukun);
        }
        else if((params.numerus === Numerus.Plural) && (suffix.length > 0))
            suffix[0].tashkil = Tashkil.Sukun;
        else if((params.gender === Gender.Female) && (params.person === Person.Second))
            suffix[0].tashkil = Tashkil.Sukun;
        if(hasR3 && (params.numerus === Numerus.Singular))
            augmentedRoot.ReplaceRadical(3, { letter: Letter.AlefMaksura, tashkil: Tashkil.AlefMaksuraMarker });
        
        augmentedRoot.DropRadial(2);
        augmentedRoot.ApplyRadicalTashkil(1, Tashkil.Fatha);
    }
}

function AlterSpecialCaseA2ra(augmentedRoot: AugmentedRoot, stemData: VerbStemData<ModernStandardArabicStem1ParametersType>, params: ConjugationParams, suffix: ConjugationVocalized[])
{
    AlterDefectiveEnding(augmentedRoot, stemData, params);
    AlterDefectiveSuffix(params, stemData, suffix);

    augmentedRoot.AssimilateRadical(2);
}

export function AlterSpeciallyIrregularDefective(root: VerbRoot, augmentedRoot: AugmentedRoot, suffix: ConjugationVocalized[], stemData: VerbStemData<ModernStandardArabicStem1ParametersType>, params: ConjugationParams)
{
    if(stemData.stem === 4)
    {
        AlterSpecialCaseA2ra(augmentedRoot, stemData, params, suffix);
    }
}

export function IsSpeciallyIrregularDefective(root: VerbRoot, stem: number)
{
    if( (stem === 4) && root.radicalsAsSeparateLetters.Equals([Letter.Ra, Letter.Hamza, Letter.Ya]) )
        return true;
    return false;
}