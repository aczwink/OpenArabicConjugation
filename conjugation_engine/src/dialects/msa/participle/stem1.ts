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
import { Letter, Tashkil, VerbType, VoiceString } from "../../../Definitions";
import { VerbStem1Data } from "../../../Verb";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";
import { _Legacy_ExtractMiddleRadicalTashkil, _Legacy_ExtractPresentMiddleRadicalTashkil, ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

export function GenerateParticipleStem1(root: VerbRoot, voice: VoiceString, stem1Context: VerbStem1Data<ModernStandardArabicStem1ParametersType>): ConjugationVocalized[]
{
    switch(stem1Context.type)
    {
        case VerbType.AssimilatedAndDefective:
        case VerbType.Defective:
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
                { letter: root.r2, tashkil: (_Legacy_ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization) === Tashkil.Dhamma) ? Tashkil.Dhamma : Tashkil.Kasra },
                { letter: (_Legacy_ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization) === Tashkil.Dhamma) ? Letter.Waw : Letter.Ya, tashkil: Tashkil.Sukun },
                { letter: (_Legacy_ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization) === Tashkil.Dhamma) ? Letter.Waw : Letter.Ya, tashkil: Tashkil.EndOfWordMarker },
            ];

        case VerbType.Irregular:
            switch(stem1Context.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.IrregularHayiya:
                    if(voice === "active")
                    {
                        return [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: Letter.Ya, tashkil: Tashkil.Sukun },
                            { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker },
                        ];
                    }
                    break;
                case ModernStandardArabicStem1ParametersType.IrregularLaysa:
                    return [
                        { letter: "-" as any, tashkil: Tashkil.EndOfWordMarker }
                    ];
                case ModernStandardArabicStem1ParametersType.IrregularRa2a:
                    return GenerateParticipleStem1(root, voice, {
                        stem: 1,
                        stemParameterization: stem1Context.stemParameterization,
                        type: VerbType.Defective
                    });
            }
            break;
    }
    
    switch(root.type)
    {
        case RootType.MiddleWeak:
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
                { letter: root.r1, tashkil: (_Legacy_ExtractMiddleRadicalTashkil(stem1Context.stemParameterization) === Tashkil.Kasra) ? Tashkil.Kasra : Tashkil.Dhamma },
                { letter: (_Legacy_ExtractMiddleRadicalTashkil(stem1Context.stemParameterization) === Tashkil.Kasra) ? Letter.Ya : Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.Quadriliteral:
        case RootType.Quadriliteral_FinalWeak:
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

        case RootType.InitialWeak:
        case RootType.HamzaOnR1:
        case RootType.Regular:
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