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

export function GenerateAllPossibleVerbalNounsStem2(root: VerbRoot): ConjugationVocalized[][]
{
    switch(root.type)
    {
        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
            return [
                [
                    { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                    { letter: root.r1, tashkil: Tashkil.Sukun },
                    { letter: root.r2, tashkil: Tashkil.Kasra },
                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ]
            ];
            
        case RootType.Quadriliteral:
        case RootType.Quadriliteral_FinalWeak:
            return [
                [
                    { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: root.r3, tashkil: Tashkil.Dhamma },
                    { letter: root.r4, tashkil: Tashkil.EndOfWordMarker },
                ]
            ];

        case RootType.FinalWeak:
            return [
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: Letter.Hamza, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                    { letter: root.r1, tashkil: Tashkil.Sukun },
                    { letter: root.r2, tashkil: Tashkil.Kasra },
                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ]
            ];

        case RootType.HamzaOnR1:
        case RootType.InitialWeak:
        case RootType.MiddleWeak:
            return [
                [
                    { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                    { letter: root.r1, tashkil: Tashkil.Sukun },
                    { letter: root.r2, tashkil: Tashkil.Kasra },
                    { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ]
            ];

        case RootType.Regular:
            return [
                [
                    { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                    { letter: root.r1, tashkil: Tashkil.Sukun },
                    { letter: root.r2, tashkil: Tashkil.Kasra },
                    { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                    { letter: root.r1, tashkil: Tashkil.Sukun },
                    { letter: root.r2, tashkil: Tashkil.Kasra },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ]
            ];

        case RootType.SecondConsonantDoubled:
            return [
                [
                    { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                    { letter: root.r1, tashkil: Tashkil.Sukun },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                    { letter: root.r1, tashkil: Tashkil.Sukun },
                    { letter: root.r2, tashkil: Tashkil.Kasra },
                    { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ]
            ];
    }

    return [[{letter: "TODO" as any, tashkil: Tashkil.Fatha}]];
}