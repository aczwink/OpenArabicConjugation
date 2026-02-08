/**
 * OpenArabicConjugation
 * Copyright (C) 2023-2026 Amir Czwink (amir130@hotmail.de)
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

import { ConjugatedWord } from "../../../Conjugation";
import { Tashkil, VerbType, Voice } from "../../../Definitions";
import { Verb } from "../../../Verb";
import { RootType } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";
import { AugmentedRoot } from "../AugmentedRoot";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";
import { _Legacy_GenerateParticipleDefective, _LegacyGenerateParticipleRegular, GenerateParticipleRegular } from "./regular";

export function GenerateParticipleStem2(baseForm: AugmentedRoot, voice: Voice, verb: Verb<ModernStandardArabicStem1ParametersType>, baseFormNew: ConjugatedWord): ConjugationVocalized[] | ConjugatedWord
{
    switch(verb.type)
    {
        case VerbType.SoundQuadriliteral:
            return GenerateParticipleRegular(baseFormNew, voice);
    }

    switch(baseForm.type)
    {
        case RootType.FinalWeak:
            return _Legacy_GenerateParticipleDefective(baseForm, voice);

        case RootType.HamzaOnR1:
        case RootType.MiddleWeak:
        case RootType.SecondConsonantDoubled:
        case RootType.Regular:
            return _LegacyGenerateParticipleRegular(baseForm, voice);
    }
    return [{ letter: "TODO" as any, tashkil: Tashkil.EndOfWordMarker }];
}