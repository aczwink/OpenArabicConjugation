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

import { Tashkil, Letter, VerbType } from "../../../Definitions";
import { VerbStem1Data } from "../../../Verb";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";
import { _Legacy_ExtractMiddleRadicalTashkil, _Legacy_ExtractPresentMiddleRadicalTashkil, ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

function MissingTestCheck(root: VerbRoot, stem1Context: VerbStem1Data<ModernStandardArabicStem1ParametersType>)
{
    if((root.r1 === Letter.Hamza) && (root.r3 === Letter.Ya))
    {
        //test: arb/doubly_weak/r1hamza_r3ya.js
        throw new Error("TODO: Write test! 2");
    }
}

export function GenerateAllPossibleVerbalNounsStem1(root: VerbRoot, stem1Context: VerbStem1Data<ModernStandardArabicStem1ParametersType>): ConjugationVocalized[][]
{
    MissingTestCheck(root, stem1Context);

    const fa3l = [
        { letter: root.r1, tashkil: Tashkil.Fatha },
        { letter: root.r2, tashkil: Tashkil.Sukun },
        { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
    ];
    const fi3l = [
        { letter: root.r1, tashkil: Tashkil.Kasra },
        { letter: root.r2, tashkil: Tashkil.Sukun },
        { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
    ];
    const fu3l = [
        { letter: root.r1, tashkil: Tashkil.Dhamma },
        { letter: root.r2, tashkil: Tashkil.Sukun },
        { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
    ];

    const fa3al = [
        { letter: root.r1, tashkil: Tashkil.Fatha },
        { letter: root.r2, tashkil: Tashkil.Fatha },
        { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
    ];

    const fi3la = [
        { letter: root.r1, tashkil: Tashkil.Kasra },
        { letter: root.r2, tashkil: Tashkil.Sukun },
        { letter: root.r3, tashkil: Tashkil.Fatha },
        { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
    ];

    const fa3ila = [
        { letter: root.r1, tashkil: Tashkil.Fatha },
        { letter: root.r2, tashkil: Tashkil.Kasra },
        { letter: root.r3, tashkil: Tashkil.Fatha },
        { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
    ];

    const fa3aal = [
        { letter: root.r1, tashkil: Tashkil.Fatha },
        { letter: root.r2, tashkil: Tashkil.Fatha },
        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
        { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
    ];
    const fa3iil = [
        { letter: root.r1, tashkil: Tashkil.Fatha },
        { letter: root.r2, tashkil: Tashkil.Kasra },
        { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
        { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
    ];
    const fi3aal = [
        { letter: root.r1, tashkil: Tashkil.Kasra },
        { letter: root.r2, tashkil: Tashkil.Fatha },
        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
        { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
    ];
    const fu3aal = [
        { letter: root.r1, tashkil: Tashkil.Dhamma },
        { letter: root.r2, tashkil: Tashkil.Fatha },
        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
        { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
    ];
    const fu3uul = [
        { letter: root.r1, tashkil: Tashkil.Dhamma },
        { letter: root.r2, tashkil: Tashkil.Dhamma },
        { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
        { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
    ];

    const fa3aala = [
        { letter: root.r1, tashkil: Tashkil.Fatha },
        { letter: root.r2, tashkil: Tashkil.Fatha },
        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
        { letter: root.r3, tashkil: Tashkil.Fatha },
        { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
    ];
    const fi3aala = [
        { letter: root.r1, tashkil: Tashkil.Kasra },
        { letter: root.r2, tashkil: Tashkil.Fatha },
        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
        { letter: root.r3, tashkil: Tashkil.Fatha },
        { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
    ];

    const fa3aa2 = [
        { letter: root.r1, tashkil: Tashkil.Fatha },
        { letter: root.r2, tashkil: Tashkil.Fatha },
        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
        { letter: Letter.Hamza, tashkil: Tashkil.EndOfWordMarker },
    ];
    const fi3aa2 = [
        { letter: root.r1, tashkil: Tashkil.Kasra },
        { letter: root.r2, tashkil: Tashkil.Fatha },
        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
        { letter: Letter.Hamza, tashkil: Tashkil.EndOfWordMarker },
    ];

    const fayla = [
        { letter: root.r1, tashkil: Tashkil.Fatha },
        { letter: Letter.Ya, tashkil: Tashkil.Sukun },
        { letter: root.r3, tashkil: Tashkil.Fatha },
        { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
    ];

    const fiyaala = [
        { letter: root.r1, tashkil: Tashkil.Kasra },
        { letter: Letter.Ya, tashkil: Tashkil.Fatha },
        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
        { letter: root.r3, tashkil: Tashkil.Fatha },
        { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
    ];
    const fi3aaya = [
        { letter: root.r1, tashkil: Tashkil.Kasra },
        { letter: root.r2, tashkil: Tashkil.Fatha },
        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
        { letter: Letter.Ya, tashkil: Tashkil.Fatha },
        { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
    ];

    switch(stem1Context.type)
    {
        case VerbType.Assimilated:
        {
            const _3ila = [
                { letter: root.r2, tashkil: Tashkil.Kasra },
                { letter: root.r3, tashkil: Tashkil.Fatha },
                { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
            ];

            switch(stem1Context.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.PastU_PresentU:
                    return [
                        fu3l,
                    ];
                case ModernStandardArabicStem1ParametersType.PastA_PresentA:
                    return [
                        fu3uul,
                        fa3l,
                    ];
                case ModernStandardArabicStem1ParametersType.PastA_PresentI:
                    return [
                        fa3l,
                        fu3uul,
                        _3ila,
                    ];
                case ModernStandardArabicStem1ParametersType.PastI_PresentA:
                    return [
                        fa3l,
                    ];
                case ModernStandardArabicStem1ParametersType.PastI_PresentI:
                    if(root.r1 === Letter.Ya)
                    {
                        return [
                            fa3l,
                        ];
                    }

                    return [
                        fa3l,
                        _3ila,
                    ];
            }
        }
        break;

        case VerbType.AssimilatedAndDefective:
        {
            switch(stem1Context.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.DefectiveType1:
                    return [
                        fa3l,
                        fi3aaya
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
                    if((root.r2 === Letter.Waw) && (root.r3 === Letter.Ya))
                    {
                        return [
                            [
                                { letter: root.r1, tashkil: Tashkil.Fatha },
                                { letter: Letter.Ya, tashkil: Tashkil.Sukun },
                                { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker },
                            ],
                            fi3aaya
                        ];
                    }
    
                    return [
                        fa3aa2,
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        fi3aa2,
                        fi3aaya,
                        [
                            { letter: root.r1, tashkil: Tashkil.Kasra },
                            { letter: root.r2, tashkil: Tashkil.Fathatan },
                            { letter: Letter.AlefMaksura, tashkil: Tashkil.EndOfWordMarker },
                        ],
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
                            { letter: Letter.Waw, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: Letter.Waw, tashkil: Tashkil.Fatha },
                            { letter: Letter.AlefMaksura, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];

                case ModernStandardArabicStem1ParametersType.DefectiveType3:
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
                        fa3aa2,
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
                        [
                            { letter: root.r1, tashkil: Tashkil.Kasra },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];
            }
        }
        break;

        case VerbType.HamzaOnR1:
        {
            switch(stem1Context.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.PastA_PresentU:
                    return [
                        fa3l,
                        fa3al
                    ];
            }

            switch(_Legacy_ExtractMiddleRadicalTashkil(stem1Context.stemParameterization))
            {
                case Tashkil.Dhamma:
                {
                    return [
                        fa3al,
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
                    switch(_Legacy_ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Kasra:
                            return [
                                fa3l,
                            ];
                    }
                }
                break;
                case Tashkil.Kasra:
                {
                    switch(_Legacy_ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Fatha:
                            return [
                                fa3al,
                                fa3aal,
                            ];
                    }
                }
                break;
            }
        }
        break;

        case VerbType.Hollow:
        {
            switch(stem1Context.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.PastI_PresentA:
                    return [
                        fa3l,
                        fayla,
                    ];

                case ModernStandardArabicStem1ParametersType.PastI_PresentI:
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
                        fayla,
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
                        fiyaala,
                        [
                            { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                            { letter: root.r1, tashkil: Tashkil.Kasra },
                            { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                            { letter: root.r1, tashkil: Tashkil.Kasra },
                            { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                            { letter: root.r3, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
                        ],
                    ];

                case ModernStandardArabicStem1ParametersType.PastU_PresentU:
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
                        fiyaala,
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

        case VerbType.Geminate:
        {
            switch(stem1Context.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.PastI_PresentA:
                {
                    const mafa33a = [
                        { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                        { letter: root.r1, tashkil: Tashkil.Fatha },
                        { letter: root.r2, tashkil: Tashkil.Sukun },
                        { letter: root.r2, tashkil: Tashkil.Fatha },
                        { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                    ];

                    if(root.r1 === Letter.Waw)
                    {
                        return [
                            fi3l,
                            fu3aal,
                            mafa33a,
                        ];
                    }

                    return [
                        fi3l,
                        mafa33a,
                    ];
                }
            }

            switch(_Legacy_ExtractMiddleRadicalTashkil(stem1Context.stemParameterization))
            {
                case Tashkil.Fatha:
                {
                    switch(_Legacy_ExtractPresentMiddleRadicalTashkil(stem1Context.stemParameterization))
                    {
                        case Tashkil.Dhamma:
                        {
                            return [
                                fu3uul,
                                fa3aala,
                                fa3l,
                                fi3aal,
                            ];
                        }
                        case Tashkil.Fatha:
                        {
                            return [
                                fa3l
                            ];
                        }
                        case Tashkil.Kasra:
                        {
                            return [
                                fu3uul,
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r2, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                fa3aal,
                                fa3iil,
                                fa3l,
                                fi3aal,
                                fi3l,
                                fi3la,
                            ];
                        }
                    }
                }
                break;
            }
        }
        break;

        case VerbType.Irregular:
        {
            switch(stem1Context.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.IrregularHayiya:
                    return [
                        fa3aa2,
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];

                case ModernStandardArabicStem1ParametersType.IrregularLaysa:
                    return [
                        [
                            { letter: "-" as any, tashkil: Tashkil.EndOfWordMarker }
                        ]
                    ];

                case ModernStandardArabicStem1ParametersType.IrregularRa2a:
                {
                    return [
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Dhamma },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];
                }
            }
        }
        break;

        case VerbType.Sound:
        {
            if(root.type === RootType.InitialWeak)
            {
                switch(stem1Context.stemParameterization)
                {
                    case ModernStandardArabicStem1ParametersType.PastI_PresentA:
                        return [
                            fa3al,
                        ];
                    case ModernStandardArabicStem1ParametersType.PastU_PresentU:
                        return [
                            fu3l,
                            fa3l
                        ];
                }
            }

            const maf3ala = [
                { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                { letter: root.r1, tashkil: Tashkil.Sukun },
                { letter: root.r2, tashkil: Tashkil.Fatha },
                { letter: root.r3, tashkil: Tashkil.Fatha },
                { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
            ];

            switch(stem1Context.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.PastA_PresentA:
                    return [
                        fu3uul,
                        fu3aal,
                        fa3l,
                        fa3aal,
                        fi3l,
                        fi3aala,
                        maf3ala
                    ];

                case ModernStandardArabicStem1ParametersType.PastA_PresentI:
                    return [
                        fu3l,
                        fu3uul,
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
                        fa3ila,
                        fa3iil,
                        fa3l,
                        fi3l,
                        fi3la,
                        [
                            { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                            { letter: root.r1, tashkil: Tashkil.Sukun },
                            { letter: root.r2, tashkil: Tashkil.Kasra },
                            { letter: root.r3, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];

                case ModernStandardArabicStem1ParametersType.PastA_PresentU:
                    return [
                        fu3uul,
                        fu3aal,
                        fa3al,
                        fa3aala,
                        fa3l,
                        fi3aala,
                        fi3la,
                        [
                            { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                            { letter: root.r1, tashkil: Tashkil.Sukun },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        maf3ala,
                    ];

                case ModernStandardArabicStem1ParametersType.PastI_PresentA:
                    return [
                        fu3uul,
                        fu3l,
                        fa3al,
                        fa3ila,
                        fa3l,
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: root.r3, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        fa3aal,
                        fa3aala,
                        fi3l,
                    ];

                case ModernStandardArabicStem1ParametersType.PastU_PresentU:
                    return [
                        [
                            { letter: root.r1, tashkil: Tashkil.Dhamma },
                            { letter: root.r2, tashkil: Tashkil.Dhamma },
                            { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                            { letter: root.r3, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        fu3l,
                        [
                            { letter: root.r1, tashkil: Tashkil.Dhamma },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: root.r3, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        fa3al,
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
                        fa3l,
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: root.r3, tashkil: Tashkil.Fatha },
                            { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                        ],
                        [
                            { letter: root.r1, tashkil: Tashkil.Kasra },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];
            }
        }
        break;

        case VerbType.SoundQuadriliteral:
        case VerbType.QuadriliteralAndDefective:
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
        [{letter: "TODO" as any, tashkil: Tashkil.EndOfWordMarker}]
    ];
}

export function HasPotentiallyMultipleVerbalNounFormsStem1(root: VerbRoot, verb: VerbStem1Data<ModernStandardArabicStem1ParametersType>)
{
    switch(verb.type)
    {
        case VerbType.Assimilated:
            switch(verb.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.PastA_PresentA:
                case ModernStandardArabicStem1ParametersType.PastA_PresentI:
                    return true;
                case ModernStandardArabicStem1ParametersType.PastI_PresentI:
                    return (root.r1 === Letter.Waw);
            }
            break;
        case VerbType.Defective:
        case VerbType.Hollow:
            return true;
        case VerbType.Irregular:
        {
            switch(verb.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.IrregularHayiya:
                case ModernStandardArabicStem1ParametersType.IrregularRa2a:
                    return true;
            }
        }
        break;
        case VerbType.Sound:
            if(root.type === RootType.InitialWeak)
            {
                switch(verb.stemParameterization)
                {
                    case ModernStandardArabicStem1ParametersType.PastI_PresentA:
                        return false;
                }
            }
            switch(_Legacy_ExtractMiddleRadicalTashkil(verb.stemParameterization))
            {
                case Tashkil.Dhamma:
                case Tashkil.Fatha:
                    return true;
                case Tashkil.Kasra:
                    switch(_Legacy_ExtractPresentMiddleRadicalTashkil(verb.stemParameterization))
                    {
                        case Tashkil.Fatha:
                            return true;
                    }
            }
            break;
    }

    switch(root.type)
    {
        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
        {
            switch(verb.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.DefectiveType1:
                    return true;
            }
        }
        break;
        case RootType.HamzaOnR1:
        {
            switch(verb.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.PastA_PresentU:
                case ModernStandardArabicStem1ParametersType.PastI_PresentA:
                case ModernStandardArabicStem1ParametersType.PastU_PresentU:
                    return true;
            }
        }
        break;
        case RootType.SecondConsonantDoubled:
        {
            switch(_Legacy_ExtractMiddleRadicalTashkil(verb.stemParameterization))
            {
                case Tashkil.Fatha:
                {
                    switch(_Legacy_ExtractPresentMiddleRadicalTashkil(verb.stemParameterization))
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
    }
    return false;
}