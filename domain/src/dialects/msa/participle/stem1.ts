/**
 * OpenArabicConjugation
 * Copyright (C) 2023-2024 Amir Czwink (amir130@hotmail.de)
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
import { Letter, Tashkil, Stem1Context, VoiceString } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";

export function GenerateParticipleStem1(root: VerbRoot, voice: VoiceString, stem1Context: Stem1Context): ConjugationVocalized[]
{
    switch(root.type)
    {
        case RootType.Defective:
        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
            if(voice === "active")
            {
                return [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r2, tashkil: Tashkil.Kasratan },
                ];
            }
            return [
                { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                { letter: root.r1, tashkil: Tashkil.Sukun },
                { letter: root.r2, tashkil: (stem1Context._legacy_middleRadicalTashkilPresent === Tashkil.Dhamma) ? Tashkil.Dhamma : Tashkil.Kasra },
                { letter: (stem1Context._legacy_middleRadicalTashkilPresent === Tashkil.Dhamma) ? Letter.Waw : Letter.Ya, tashkil: Tashkil.Sukun },
                { letter: (stem1Context._legacy_middleRadicalTashkilPresent === Tashkil.Dhamma) ? Letter.Waw : Letter.Ya, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.Hollow:
            if(voice === "active")
            {
                if(root.r3 === Letter.Hamza)
                {
                    return [
                        { letter: root.r1, tashkil: Tashkil.Fatha },
                        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                        { letter: root.r3, tashkil: Tashkil.Kasratan },
                    ];
                }

                return [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: Letter.Hamza, tashkil: Tashkil.Kasra },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ];
            }
            return [
                { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                { letter: root.r1, tashkil: (stem1Context._legacy_middleRadicalTashkil === Tashkil.Kasra) ? Tashkil.Kasra : Tashkil.Dhamma },
                { letter: (stem1Context._legacy_middleRadicalTashkil === Tashkil.Kasra) ? Letter.Ya : Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.Quadriliteral:
            return [
                { letter: Letter.Mim, tashkil: Tashkil.Dhamma },
                { letter: root.r1, tashkil: Tashkil.Fatha },
                { letter: root.r2, tashkil: Tashkil.Sukun },
                { letter: root.r3, tashkil: (voice === "active") ? Tashkil.Kasra : Tashkil.Fatha },
                { letter: root.r4, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.SecondConsonantDoubled:
            if(voice === "active")
            {
                return [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: root.r2, tashkil: Tashkil.EndOfWordMarker },
                ];
            }
            return [
                { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                { letter: root.r1, tashkil: Tashkil.Sukun },
                { letter: root.r2, tashkil: Tashkil.Dhamma },
                { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r2, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.Assimilated:
        case RootType.HamzaOnR1:
        case RootType.Sound:
            if(voice === "active")
            {
                return [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r2, tashkil: Tashkil.Kasra },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ];
            }
            return [
                { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                { letter: root.r1, tashkil: Tashkil.Sukun },
                { letter: root.r2, tashkil: Tashkil.Dhamma },
                { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
            ];
    }
    return [{letter: "TODO" as any, tashkil: Tashkil.Dhamma}];
}