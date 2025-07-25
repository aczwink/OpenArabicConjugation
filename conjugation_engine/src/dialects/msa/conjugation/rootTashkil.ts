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

import { ConjugationParams, Tashkil, Tense, Voice } from "../../../Definitions";
import { VerbStemData } from "../../../Verb";
import { RootType } from "../../../VerbRoot";
import { AugmentedRoot } from "../AugmentedRoot";
import { _Legacy_ExtractMiddleRadicalTashkil, _Legacy_ExtractPresentMiddleRadicalTashkil, ModernStandardArabicStem1ParametersType } from "./r2tashkil";

interface RootTashkil
{
    r1: Tashkil;
    r2: Tashkil;
}

function DerivePastRootTashkil(stemData: VerbStemData<ModernStandardArabicStem1ParametersType>, params: ConjugationParams): RootTashkil
{
    const r1stem = ((stemData.stem === 4) || (stemData.stem === 8) || (stemData.stem === 9) || (stemData.stem === 10)) ? Tashkil.Sukun : ((params.voice === Voice.Active) ? Tashkil.Fatha : Tashkil.Dhamma);
    const r2active = (stemData.stem === 1) ? _Legacy_ExtractMiddleRadicalTashkil(stemData.stemParameterization) : Tashkil.Fatha;
    return {
        r1: r1stem,
        r2: (params.voice === Voice.Active) ? r2active : Tashkil.Kasra
    };
}

function Derive3RadicalRootTashkil(stemData: VerbStemData<ModernStandardArabicStem1ParametersType>, params: ConjugationParams): RootTashkil
{
    if(params.tense === Tense.Perfect)
        return DerivePastRootTashkil(stemData, params);

    function R1Tashkil()
    {
        switch(stemData.stem)
        {
            case 1:
            case 4:
            case 8:
            case 9:
            case 10:
                return Tashkil.Sukun;
        }
        return Tashkil.Fatha;
    }

    function R2Active(): Tashkil
    {
        switch(stemData.stem)
        {
            case 1:
                return _Legacy_ExtractPresentMiddleRadicalTashkil(stemData.stemParameterization);
            case 2:
            case 3:
            case 4:
            case 7:
            case 8:
            case 9:
            case 10:
                return Tashkil.Kasra;
            case 5:
            case 6:
                return Tashkil.Fatha;
        }
    }

    return {
        r1: R1Tashkil(),
        r2: (params.voice === Voice.Active) ? R2Active() : Tashkil.Fatha
    };
}

function Derive4RadicalRootTashkil(params: ConjugationParams): RootTashkil & { r3: Tashkil }
{
    let r3: Tashkil;
    if(params.voice === Voice.Active)
        r3 = (params.tense === Tense.Perfect) ? Tashkil.Fatha : Tashkil.Kasra;
    else
        r3 = (params.tense === Tense.Perfect) ? Tashkil.Kasra : Tashkil.Fatha;

    return {
        r1: ( (params.tense === Tense.Perfect) && (params.voice === Voice.Passive) ) ? Tashkil.Dhamma : Tashkil.Fatha,
        r2: Tashkil.Sukun,
        r3
    };
}

export function ApplyRootTashkil(augmentedRoot: AugmentedRoot, stemData: VerbStemData<ModernStandardArabicStem1ParametersType>, params: ConjugationParams)
{
    if((augmentedRoot.type === RootType.Quadriliteral) || (augmentedRoot.type === RootType.Quadriliteral_FinalWeak))
    {
        const tashkil = Derive4RadicalRootTashkil(params);
        augmentedRoot.ApplyRadicalTashkil(1, tashkil.r1);
        augmentedRoot.ApplyRadicalTashkil(2, tashkil.r2);
        augmentedRoot.ApplyRadicalTashkil(3, tashkil.r3);
    }
    else
    {
        const tashkil = Derive3RadicalRootTashkil(stemData, params);
        augmentedRoot.ApplyRadicalTashkil(1, tashkil.r1);
        augmentedRoot.ApplyRadicalTashkil(2, tashkil.r2);
    }
}