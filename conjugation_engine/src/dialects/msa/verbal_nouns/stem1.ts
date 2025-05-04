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

import { Tashkil, Letter, VerbType } from "../../../Definitions";
import { VerbStem1Data } from "../../../Verb";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";
import { ExtractMiddleRadicalTashkil, ExtractPresentMiddleRadicalTashkil, ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

export function GenerateAllPossibleVerbalNounsStem1(root: VerbRoot, stem1Context: VerbStem1Data<ModernStandardArabicStem1ParametersType>): ConjugationVocalized[][]
{
    switch(stem1Context.type)
    {
        case VerbType.Assimilated:
        {
            switch(ExtractMiddleRadicalTashkil(stem1Context.stemParameterization))
            {
                case Tashkil.Dhamma:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Dhamma:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                    }
                }
                break;
                case Tashkil.Fatha:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Fatha:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                        case Tashkil.Kasra:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r2, tashkil: Tashkil.Kasra },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                    }
                }
                break;
                case Tashkil.Kasra:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Fatha:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                        case Tashkil.Kasra:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r2, tashkil: Tashkil.Kasra },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                    }
                }
                break;
            }
        }
        break;

        case VerbType.AssimilatedAndDefective:
        {
            switch(stem1Context.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.DefectiveType1:
                    return [
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Kasra },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];
            }
        }
        break;

        case VerbType.Defective:
        {
            switch(stem1Context.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.DefectiveType1:
                {
                    const hikaya = [
                        { letter: root.r1, tashkil: Tashkil.Kasra },
                        { letter: root.r2, tashkil: Tashkil.Fatha },
                        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                        { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                        { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                    ];

                    if((root.r2 === Letter.Waw) && (root.r3 === Letter.Ya))
                    {
                        return [
                            [
                                { letter: root.r1, tashkil: Tashkil.Fatha },
                                { letter: Letter.Ya, tashkil: Tashkil.Sukun },
                                { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker },
                            ],
                            hikaya
                        ];
                    }
    
                    return [
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: Letter.Hamza, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Kasra },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: Letter.Hamza, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        hikaya,
                        [
                            { letter: root.r1, tashkil: Tashkil.Kasra },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: Letter.Nun, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];
                }

                case ModernStandardArabicStem1ParametersType.DefectiveType2:
                    return [
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: Letter.Waw, tashkil: Tashkil.Fatha },
                            { letter: Letter.AlefMaksura, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];

                case ModernStandardArabicStem1ParametersType.DefectiveType3:
                    if(root.radicalsAsSeparateLetters.Equals([Letter.Hha, Letter.Ya, Letter.Waw]))
                    {
                        return [
                            [
                                { letter: root.r1, tashkil: Tashkil.Fatha },
                                { letter: root.r2, tashkil: Tashkil.Fatha },
                                { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                { letter: Letter.Hamza, tashkil: Tashkil.EndOfWordMarker },
                            ],
                            [
                                { letter: root.r1, tashkil: Tashkil.Fatha },
                                { letter: root.r2, tashkil: Tashkil.Fatha },
                                { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                            ],
                        ];
                    }

                    if((root.r2 === Letter.Waw) && (root.r3 === Letter.Ya))
                    {
                        return [
                            [
                                { letter: root.r1, tashkil: Tashkil.Dhamma },
                                { letter: root.r2, tashkil: Tashkil.Sukun },
                                { letter: root.r2, tashkil: Tashkil.Fatha },
                                { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                            ],
                            [
                                { letter: root.r1, tashkil: Tashkil.Fatha },
                                { letter: root.r2, tashkil: Tashkil.Fathatan },
                                { letter: Letter.AlefMaksura, tashkil: Tashkil.EndOfWordMarker },
                            ],
                        ];
                    }

                    return [
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: Letter.Hamza, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Fathatan },
                            { letter: Letter.AlefMaksura, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Kasra },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: Letter.Hamza, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];
            }
        }
        break;

        case VerbType.HamzaOnR1:
        {
            switch(ExtractMiddleRadicalTashkil(stem1Context.stemParameterization))
            {
                case Tashkil.Dhamma:
                {
                    return [
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: Letter.Hamza, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: root.r3, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: Letter.Hamza, tashkil: Tashkil.Kasra },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: root.r3, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ]
                    ];
                }
                case Tashkil.Fatha:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Dhamma:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                        case Tashkil.Kasra:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                    }
                }
                break;
                case Tashkil.Kasra:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Fatha:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                    }
                }
                break;
            }
        }
        break;

        case VerbType.Hollow:
        {
            switch(ExtractMiddleRadicalTashkil(stem1Context.stemParameterization))
            {
                case Tashkil.Dhamma:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Dhamma:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Waw, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Waw, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Waw, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker }
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
                                ],
                                [
                                    { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker }
                                ],
                            ];
                    }
                }
                break;
                case Tashkil.Kasra:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Fatha:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Ya, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
                                ],
                            ];
                        case Tashkil.Kasra:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: Letter.Nun, tashkil: Tashkil.EndOfWordMarker }
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Ya, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Ya, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
                                ],
                                [
                                    { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
                                ],
                            ];
                    }
                }
                break;
            }
        }
        break;

        case VerbType.Geminate:
        {
            switch(ExtractMiddleRadicalTashkil(stem1Context.stemParameterization))
            {
                case Tashkil.Fatha:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Dhamma:
                        {
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                        }
                        case Tashkil.Kasra:
                        {
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r2, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Kasra },
                                    { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                        }
                    }
                }
                break;
                case Tashkil.Kasra:
                {
                    return [
                        [
                            { letter: root.r1, tashkil: Tashkil.Kasra },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: root.r2, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];
                }
            }
        }
        break;

        case VerbType.Sound:
        {
            switch(ExtractMiddleRadicalTashkil(stem1Context.stemParameterization))
            {
                case Tashkil.Dhamma:
                    return [
                        [
                            { letter: root.r1, tashkil: Tashkil.Dhamma },
                            { letter: root.r2, tashkil: Tashkil.Dhamma },
                            { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                            { letter: root.r3, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Dhamma },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Dhamma },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: root.r3, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: root.r3, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: root.r3, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];
                case Tashkil.Fatha:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Fatha:
                        {
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                                    { letter: root.r1, tashkil: Tashkil.Sukun },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                        }
                        
                        case Tashkil.Kasra:
                        {
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: Letter.Nun, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Kasra },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                                    { letter: root.r1, tashkil: Tashkil.Sukun },
                                    { letter: root.r2, tashkil: Tashkil.Kasra },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                        }

                        case Tashkil.Dhamma:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                                    { letter: root.r1, tashkil: Tashkil.Sukun },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                    }
                }
                break;

                case Tashkil.Kasra:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Fatha:
                        {
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Kasra },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                        }
                    }
                }
                break;
            }
        }
        break;

        case VerbType.SoundQuadriliteral:
            return [
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha, },
                    { letter: root.r2, tashkil: Tashkil.Sukun, },
                    { letter: root.r3, tashkil: Tashkil.Fatha, },
                    { letter: root.r4, tashkil: Tashkil.Fatha, },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ]
            ];
    }

    return [
        [{letter: "TODO" as any, tashkil: Tashkil.Sukun}]
    ];
}

export function HasPotentiallyMultipleVerbalNounFormsStem1(root: VerbRoot, stem1Context: VerbStem1Data<ModernStandardArabicStem1ParametersType>)
{
    switch(root.type)
    {
        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
        {
            switch(stem1Context.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.DefectiveType1:
                    return true;
            }
        }
        break;
        case RootType.FinalWeak:
            return true;
        case RootType.HamzaOnR1:
        {
            switch(ExtractMiddleRadicalTashkil(stem1Context.stemParameterization))
            {
                case Tashkil.Dhamma:
                    return true;
            }
        }
        break;
        case RootType.InitialWeak:
        {
            switch(ExtractMiddleRadicalTashkil(stem1Context.stemParameterization))
            {
                case Tashkil.Dhamma:
                    return true;
                case Tashkil.Fatha:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Fatha:
                        case Tashkil.Kasra:
                            return true;
                    }
                }
                break;
                case Tashkil.Kasra:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Kasra:
                            return true;
                    }
                }
                break;
            }
        }
        break;
        case RootType.MiddleWeak:
        {
            switch(ExtractMiddleRadicalTashkil(stem1Context.stemParameterization))
            {
                case Tashkil.Dhamma:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Dhamma:
                            return true;
                    }
                }
                break;
                case Tashkil.Kasra:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Kasra:
                            return true;
                    }
                }
                break;
            }
        }
        break;
        case RootType.SecondConsonantDoubled:
        {
            switch(ExtractMiddleRadicalTashkil(stem1Context.stemParameterization))
            {
                case Tashkil.Fatha:
                {
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Dhamma:
                        case Tashkil.Kasra:
                            return true;
                    }
                }
                break;
                case Tashkil.Kasra:
                    return true;
            }
        }
        break;
        case RootType.Regular:
        {            
            switch(ExtractMiddleRadicalTashkil(stem1Context.stemParameterization))
            {
                case Tashkil.Dhamma:
                case Tashkil.Fatha:
                    return true;
                case Tashkil.Kasra:
                    switch(ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Fatha:
                            return true;
                    }
            }
        }
        break;
    }
    return false;
}