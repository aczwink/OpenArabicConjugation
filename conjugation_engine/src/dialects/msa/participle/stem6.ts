/**
 * OpenArabicConjugation
 * Copyright (C) 2024-2025 Amir Czwink (amir130@hotmail.de)
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

import { Tashkil, Voice } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";
import { AugmentedRoot } from "../AugmentedRoot";
import { GenerateParticipleDefective, GenerateParticipleRegular } from "./regular";

export function GenerateParticipleStem6(root: VerbRoot, baseForm: AugmentedRoot, voice: Voice): ConjugationVocalized[]
{
    switch(root.type)
    {
        case RootType.FinalWeak:
            return GenerateParticipleDefective(baseForm, voice);
        case RootType.InitialWeak:
        case RootType.MiddleWeak:
        case RootType.Regular:
            return GenerateParticipleRegular(baseForm, voice);
    }
    return [{letter: "TODO GenerateParticipleStem6" as any, tashkil: Tashkil.Sukun }];
}