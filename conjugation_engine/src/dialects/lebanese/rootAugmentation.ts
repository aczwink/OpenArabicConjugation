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

import { ConjugationRule, Vowel } from "../../Conjugation";
import { ConjugationParams, Gender, Letter, Mood, Numerus, Person, Tense } from "../../Definitions";
import { VerbStemData } from "../../Verb";
import { RootType, VerbRoot } from "../../VerbRoot";
import { DoesPresentSuffixStartWithWawOrYa } from "../msa/conjugation/suffix";
import { IrregularIja, IsHamzaOnR1SpecialCase } from "./irregular";
import { LebaneseStem1Context } from "./LebaneseDialectMetadata";

export function AugmentRoot(root: VerbRoot, stemData: VerbStemData<LebaneseStem1Context>, params: ConjugationParams): ConjugationRule[] | undefined
{
    switch(stemData.stem)
    {
        case 1:
            switch(root.type)
            {
                case RootType.FinalWeak:
                    if((params.tense === Tense.Present) && (params.mood !== Mood.Imperative) && (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentI) && !DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender))
                    {
                        return [
                            {
                                conditions: { tense: Tense.Present },
                                prefixVowel: Vowel.ShortI,
                                symbols: [root.r1, root.r2],
                                vowels: [Vowel.Sukun, Vowel.BrokenA]
                            }
                        ];
                    }

                    return [
                        {
                            conditions: { tense: Tense.Perfect, person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.ShortI, Vowel.LongI]
                        },
                        {
                            conditions: { tense: Tense.Perfect, person: Person.Third, numerus: Numerus.Singular },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortI, Vowel.Sukun, Vowel.ShortI]
                        },
                        {
                            conditions: { tense: Tense.Perfect, person: Person.Third },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortI, Vowel.Sukun]
                        },
                        {
                            conditions: { tense: Tense.Perfect },
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.Sukun, Vowel.LongI]
                        },
                        {
                            conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.Sukun]
                        },
                        {
                            conditions: { mood: Mood.Imperative },
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.Sukun, Vowel.LongI]
                        },
                        {
                            conditions: { tense: Tense.Present, hasPresentSuffix: true },
                            prefixVowel: Vowel.ShortI,
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.Sukun]
                        },
                        {
                            conditions: { tense: Tense.Present },
                            prefixVowel: Vowel.ShortI,
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.Sukun, Vowel.LongI]
                        }
                    ];

                case RootType.MiddleWeak:
                    if(root.radicalsAsSeparateLetters.Equals([Letter.Jiim, Letter.Ya, Letter.Hamza]))
                        return IrregularIja(root);

                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    vowels: [(params.person === Person.Third) ? Vowel.LongA : Vowel.ShortI]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.Sukun,
                                    vowels: [Vowel.LongI]
                                }
                            ]
                        },
                    ];

                case RootType.HamzaOnR1:
                    if(IsHamzaOnR1SpecialCase(root) && (params.tense === Tense.Present))
                    {
                        return [
                            {
                                conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                                symbols: [root.r2, root.r3],
                                vowels: [Vowel.ShortI]
                            },
                            {
                                conditions: { mood: Mood.Imperative },
                                symbols: [root.r2, root.r3],
                                vowels: [Vowel.ShortU]
                            },
                            {
                                conditions: { hasPresentSuffix: true },
                                prefixVowel: Vowel.LongA,
                                symbols: [root.r2, root.r3],
                                vowels: [Vowel.Sukun]
                            },
                            {
                                conditions: { mood: Mood.Subjunctive, numerus: Numerus.Singular, person: Person.First, },
                                prefixVowel: Vowel.ShortA,
                                symbols: [root.r1, root.r2, root.r3],
                                vowels: [Vowel.Sukun, Vowel.ShortU]
                            },
                            {
                                conditions: {},
                                prefixVowel: Vowel.LongA,
                                symbols: [root.r2, root.r3],
                                vowels: [Vowel.ShortU]
                            }
                        ];
                    }

                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 0 : 1,
                                    vowels: [Vowel.ShortA, Vowel.ShortA]
                                },
                                {
                                    conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                                    vowels: [Vowel.Sukun, Vowel.ShortU]
                                },
                                {
                                    conditions: { mood: Mood.Imperative },
                                    vowels: [Vowel.Sukun, Vowel.LongU]
                                },
                                {
                                    conditions: { tense: Tense.Present, hasPresentSuffix: true },
                                    prefixVowel: Vowel.ShortU,
                                    vowels: [Vowel.Sukun, Vowel.Sukun]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortU,
                                    vowels: [Vowel.Sukun, Vowel.ShortU]
                                }
                            ],
                        },
                    ];

                case RootType.Quadriliteral:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r3, root.r4],
                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortA],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 0 : 2,
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.Sukun,
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortI],
                                    children: [
                                        {
                                            conditions: { hasPresentSuffix: true },
                                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.Sukun],
                                        }
                                    ]
                                },
                            ]
                        },
                    ];

                case RootType.SecondConsonantDoubled:
                    const presentVowel = (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentI) ? Vowel.ShortI : Vowel.ShortU;
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect, person: Person.Third },
                                    vowels: [Vowel.ShortA, Vowel.Sukun]
                                },
                                {
                                    conditions: { tense: Tense.Perfect },
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.DiphtongAj]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.Sukun,
                                    vowels: [presentVowel, Vowel.Sukun]
                                }
                            ]
                        },
                    ];

                case RootType.Regular:
                    if(stemData.stemParameterization === LebaneseStem1Context.PastA_PresentI)
                    {
                        return [
                            {
                                conditions: {},
                                symbols: [root.r1, root.r2, root.r3],
                                children: [
                                    {
                                        conditions: { tense: Tense.Perfect },
                                        emphasize: (params.person === Person.Third) ? 0 : 1,
                                        children: [
                                            {
                                                conditions: { gender: Gender.Male, numerus: Numerus.Singular, person: Person.Third },
                                                vowels: [Vowel.ShortI, Vowel.ShortI],
                                            },
                                            {
                                                conditions: { person: Person.Third },
                                                vowels: [Vowel.ShortI, Vowel.Sukun],
                                            },
                                            {
                                                conditions: {},
                                                vowels: [Vowel.Sukun, Vowel.ShortI],
                                            }
                                        ]
                                    },
                                    {
                                        conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                                        vowels: [Vowel.Sukun, Vowel.ShortA]
                                    },
                                    {
                                        conditions: { mood: Mood.Imperative },
                                        vowels: [Vowel.Sukun, Vowel.LongA]
                                    },
                                    {
                                        conditions: { tense: Tense.Present },
                                        prefixVowel: Vowel.ShortI,
                                        vowels: [Vowel.Sukun, Vowel.ShortA]
                                    }
                                ]
                            },
                        ];
                    }

                    const r2presentVowel = (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentA) ? Vowel.ShortA : Vowel.ShortU;
                    const r2imperativeVowel = (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentA) ? Vowel.LongA : Vowel.LongU;
                    const r2imperativeWithPresentSuffixVowel = (stemData.stemParameterization === LebaneseStem1Context.PastA_PresentA) ? Vowel.ShortA : Vowel.ShortI;
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 0 : 1,
                                    vowels: [Vowel.ShortA, Vowel.ShortA]
                                },
                                {
                                    conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                                    vowels: [Vowel.Sukun, r2imperativeWithPresentSuffixVowel]
                                },
                                {
                                    conditions: { mood: Mood.Imperative },
                                    vowels: [Vowel.Sukun, r2imperativeVowel]
                                },
                                {
                                    conditions: { tense: Tense.Present, hasPresentSuffix: true },
                                    prefixVowel: Vowel.ShortI,
                                    children: [
                                        {
                                            conditions: { stemParameters: LebaneseStem1Context.PastA_PresentA },
                                            vowels: [Vowel.Sukun, Vowel.ShortA]
                                        },
                                        {
                                            conditions: { stemParameters: LebaneseStem1Context.PastA_PresentU_Form2 },
                                            vowels: [Vowel.ShortI, Vowel.Sukun]
                                        },
                                        {
                                            conditions: {},
                                            prefixVowel: Vowel.ShortI,
                                            vowels: [Vowel.Sukun, Vowel.Sukun]
                                        },
                                    ]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, r2presentVowel]
                                }
                            ]
                        },
                    ];
            }
        break;

        case 2:
        {
            switch(root.type)
            {
                case RootType.FinalWeak:
                    return [
                        {
                            conditions: { tense: Tense.Perfect },
                            symbols: [root.r1, root.r2, root.r2],
                            children: [
                                {
                                    conditions: { person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.BrokenA]
                                },
                                {
                                    conditions: { person: Person.Third, numerus: Numerus.Singular },
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortI]
                                },
                                {
                                    conditions: { person: Person.Third },
                                    vowels: [Vowel.ShortA, Vowel.Sukun]
                                },
                                {
                                    conditions: { tense: Tense.Perfect },
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.DiphtongAj]
                                },
                            ]
                        },
                        {
                            conditions: { tense: Tense.Present, hasPresentSuffix: true },
                            prefixVowel: Vowel.Sukun,
                            symbols: [root.r1, root.r2, root.r2],
                            vowels: [Vowel.ShortA, Vowel.Sukun]
                        },
                        {
                            conditions: { tense: Tense.Present },
                            prefixVowel: Vowel.Sukun,
                            symbols: [root.r1, root.r2, root.r2],
                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.LongI]
                        }
                    ];

                case RootType.Quadriliteral:
                    return [
                        {
                            conditions: {},
                            symbols: [Letter.Ta, root.r1, root.r2, root.r3, root.r4],
                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.ShortA],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 1 : 3,
                                },
                                {
                                    conditions: { mood: Mood.Imperative },
                                    symbols: [root.r1, root.r2, root.r3, root.r4],
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.Sukun],
                                    children: [
                                        {
                                            conditions: { numerus: Numerus.Singular, gender: Gender.Male },
                                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortI],
                                        }
                                    ]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                },
                            ]
                        },
                    ];

                case RootType.Regular:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 0 : 1,
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortA]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.Sukun,
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortI],
                                    children: [
                                        {
                                            conditions: { hasPresentSuffix: true },
                                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.Sukun]
                                        },
                                    ]
                                },
                            ]
                        },
                    ];
            }
        }
        break;

        case 3:
        {
            switch(root.type)
            {
                case RootType.MiddleWeak:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? undefined : 1,
                                    vowels: [Vowel.LongA, Vowel.ShortA]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.Sukun,
                                    vowels: [Vowel.LongA, Vowel.ShortI],
                                    children: [
                                        {
                                            conditions: { hasPresentSuffix: true },
                                            vowels: [Vowel.LongA, Vowel.Sukun]
                                        },
                                    ]
                                },
                            ]
                        },
                    ];
            }
        }
        break;

        case 4:
        {
            switch(root.type)
            {
                case RootType.Regular:
                    return [
                        {
                            conditions: { tense: Tense.Perfect },
                            symbols: [Letter.Hamza, root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortA],
                        },
                        {
                            conditions: { tense: Tense.Present },
                            prefixVowel: Vowel.ShortI,
                            symbols: [root.r1, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                                    vowels: [Vowel.Sukun, Vowel.ShortI]
                                },
                                {
                                    conditions: { mood: Mood.Imperative },
                                    vowels: [Vowel.Sukun, Vowel.LongU]
                                },
                                {
                                    conditions: { hasPresentSuffix: true },
                                    vowels: [Vowel.ShortI, Vowel.Sukun]
                                },
                                {
                                    conditions: {},
                                    vowels: [Vowel.Sukun, Vowel.ShortU]
                                }
                            ]
                        },
                    ];
            }
        }
        break;

        case 5:
        {
            switch(root.type)
            {
                case RootType.FinalWeak:
                    return [
                        {
                            conditions: {},
                            symbols: [Letter.Ta, root.r1, root.r2, root.r2],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    children: [
                                        {
                                            conditions: { person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.BrokenA],
                                        },
                                        {
                                            conditions: { person: Person.Third, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.ShortI],
                                        },
                                        {
                                            conditions: { person: Person.Third },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.LongU],
                                        },
                                        {
                                            conditions: {},
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.DiphtongAj],
                                        },
                                    ]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.BrokenA],
                                    children: [
                                        {
                                            conditions: { hasPresentSuffix: true, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.LongI],
                                        },
                                        {
                                            conditions: { hasPresentSuffix: true },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.LongU],
                                        },
                                    ]
                                }
                            ]
                        },
                    ];
                case RootType.Regular:
                    return [
                        {
                            conditions: {},
                            symbols: [Letter.Ta, root.r1, root.r2, root.r2, root.r3],
                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.ShortA],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 1 : 2,
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                }
                            ]
                        },
                    ];
            }
        }
        break;

        case 6:
        {
            switch(root.type)
            {
                case RootType.FinalWeak:
                    return [
                        {
                            conditions: {},
                            symbols: [Letter.Ta, root.r1, root.r2],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    children: [
                                        {
                                            conditions: { person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.BrokenA],
                                        },
                                        {
                                            conditions: { person: Person.Third, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.ShortI],
                                        },
                                        {
                                            conditions: { person: Person.Third },
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.LongU],
                                        },
                                        {
                                            conditions: {},
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.DiphtongAj],
                                        },
                                    ]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.LongA, Vowel.BrokenA],
                                    children: [
                                        {
                                            conditions: { hasPresentSuffix: true, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.LongI],
                                        },
                                        {
                                            conditions: { hasPresentSuffix: true },
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.LongU],
                                        },
                                    ]
                                }
                            ]
                        },
                    ];
                case RootType.Regular:
                    return [
                        {
                            conditions: {},
                            symbols: [Letter.Ta, root.r1, root.r2, root.r3],
                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.ShortA],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? undefined : 2,
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                },
                            ]
                        },
                    ];
            }
        }
        break;

        case 8:
        {
            switch(root.type)
            {
                case RootType.MiddleWeak:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, Letter.Ta, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    vowels: [Vowel.Sukun, (params.person === Person.Third) ? Vowel.LongA : Vowel.ShortA]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.LongA]
                                },
                            ]
                        },
                    ];

                case RootType.Regular:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, Letter.Ta, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 1 : 2,
                                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.ShortA]
                                },
                                {
                                    conditions: { tense: Tense.Present, hasPresentSuffix: true },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.ShortI, Vowel.Sukun]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.ShortI, Vowel.ShortI]
                                },
                            ]
                        },
                    ];
            }
        }
        break;

        case 9:
        {
            switch(root.type)
            {
                case RootType.Regular:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r3, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.DiphtongAj],
                                    children: [
                                        {
                                            conditions: { person: Person.Third },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun]
                                        }
                                    ],
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun]
                                },
                            ]
                        },
                    ];
            }
        }
        break;
    }
    return undefined;
}