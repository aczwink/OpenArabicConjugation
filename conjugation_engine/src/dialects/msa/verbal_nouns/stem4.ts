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
import { Letter, Tashkil } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";

export function GenerateAllPossibleVerbalNounsStem4(root: VerbRoot): ConjugationVocalized[]
{
    switch(root.type)
    {
        case RootType.HamzaOnR1:
            return [
                { letter: Letter.Hamza, tashkil: Tashkil.Kasra },
                { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r2, tashkil: Tashkil.Fatha },
                { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.InitialWeak:
            return [
                { letter: Letter.Hamza, tashkil: Tashkil.Kasra },
                { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r2, tashkil: Tashkil.Fatha },
                { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.FinalWeak:
            return [
                { letter: Letter.Hamza, tashkil: Tashkil.Kasra },
                { letter: root.r1, tashkil: Tashkil.Sukun },
                { letter: root.r2, tashkil: Tashkil.Fatha },
                { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                { letter: Letter.Hamza, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.MiddleWeak:
            return [
                { letter: Letter.Hamza, tashkil: Tashkil.Kasra },
                { letter: root.r1, tashkil: Tashkil.Fatha },
                { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r3, tashkil: Tashkil.Fatha },
                { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.Quadriliteral:
            return [
                { letter: Letter.Alef, tashkil: Tashkil.Kasra },
                { letter: root.r1, tashkil: Tashkil.Sukun },
                { letter: root.r2, tashkil: Tashkil.Kasra },
                { letter: root.r3, tashkil: Tashkil.Sukun },
                { letter: root.r4, tashkil: Tashkil.Fatha },
                { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                { letter: Letter.Nun, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.SecondConsonantDoubled:
        case RootType.Regular:
            return [
                { letter: Letter.Hamza, tashkil: Tashkil.Kasra },
                { letter: root.r1, tashkil: Tashkil.Sukun },
                { letter: root.r2, tashkil: Tashkil.Fatha },
                { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
            ];
        default:
            return [
                {letter: "TODO" as any, tashkil: Tashkil.Sukun}
            ];
    }
}