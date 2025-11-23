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

import { Tashkil, Letter, Voice, VerbType } from "../../../Definitions";
import { Verb } from "../../../Verb";
import { ConjugationVocalized } from "../../../Vocalization";
import { AugmentedRoot } from "../AugmentedRoot";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";
import { GenerateParticipleRegular } from "./regular";

export function GenerateParticipleStem8(verb: Verb<ModernStandardArabicStem1ParametersType>, baseForm: AugmentedRoot, voice: Voice): ConjugationVocalized[]
{
    const root = verb.root;
    switch(verb.type)
    {
        case VerbType.Assimilated:
        case VerbType.Sound:
            return GenerateParticipleRegular(baseForm, voice, true);

        case VerbType.Defective:
            if(voice === Voice.Active)
            {
                return [
                    { letter: Letter.Mim, tashkil: Tashkil.Dhamma },
                    { letter: root.r1, tashkil: Tashkil.Sukun },
                    { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Kasratan },
                ];

            }
            return [
                { letter: Letter.Mim, tashkil: Tashkil.Dhamma },
                { letter: root.r1, tashkil: Tashkil.Sukun },
                { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                { letter: root.r2, tashkil: Tashkil.Fathatan },
                { letter: Letter.AlefMaksura, tashkil: Tashkil.EndOfWordMarker },
            ];

        case VerbType.Geminate:
            return GenerateParticipleRegular(baseForm, Voice.Passive, false);

        case VerbType.Hollow:
            baseForm.symbols[0].letter = Letter.Mim;
            baseForm.symbols[0].tashkil = Tashkil.Dhamma;
            baseForm.ApplyRadicalTashkil(1, Tashkil.Sukun);
            baseForm.ApplyRadicalTashkil(3, Tashkil.EndOfWordMarker);
            return baseForm.symbols;
    }
    return [{letter: "TODO" as any, tashkil: Tashkil.EndOfWordMarker}];
}