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
import { ConjugationVocalized } from "../../../Vocalization";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";
import { GenerateParticipleDefective, GenerateParticipleRegular } from "./regular";

export function GenerateParticipleStem2(voice: Voice, verb: Verb<ModernStandardArabicStem1ParametersType>, baseFormNew: ConjugatedWord): ConjugationVocalized[] | ConjugatedWord
{
    switch(verb.type)
    {
        case VerbType.Defective:
            return GenerateParticipleDefective(baseFormNew, voice, false);
        case VerbType.Sound:
        case VerbType.SoundQuadriliteral:
            return GenerateParticipleRegular(baseFormNew, voice);
    }

    return [{ letter: "IMPLEMENT ME" as any, tashkil: Tashkil.EndOfWordMarker }];
}