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
import { ConjugationParams, Gender, Letter, Mood, Numerus, Person, Tense, VerbType } from "../../Definitions";
import { VerbStemData } from "../../Verb";
import { RootType, VerbRoot } from "../../VerbRoot";
import { AssimilatedStem1ConjugationTemplate } from "./conjugation_templates/assimilated_stem1";
import { DefectiveStem1ConjugationTemplate } from "./conjugation_templates/defective_stem1";
import { DefectiveStem3ConjugationTemplate } from "./conjugation_templates/defective_stem3";
import { DefectiveStem7ConjugationTemplate } from "./conjugation_templates/defective_stem7";
import { GeminateStem7ConjugationTemplate } from "./conjugation_templates/geminate_stem7";
import { GeminateStem8ConjugationTemplate } from "./conjugation_templates/geminate_stem8";
import { HollowStem1ConjugationTemplate } from "./conjugation_templates/hollow_stem1";
import { HollowStem7ConjugationTemplate } from "./conjugation_templates/hollow_stem7";
import { QuadriliteralStem1ConjugationTemplate } from "./conjugation_templates/quadriliteral_stem1";
import { RegularStem1ConjugationTemplate } from "./conjugation_templates/regular_stem1";
import { SoundStem7ConjugationTemplate } from "./conjugation_templates/sound_stem7";
import { IsHamzaOnR1SpecialCase } from "./irregular";
import { LebaneseStem1Context } from "./LebaneseDialectMetadata";

export function AugmentRoot(root: VerbRoot, stemData: VerbStemData<LebaneseStem1Context>, params: ConjugationParams): ConjugationRule[] | undefined
{
    switch(stemData.stem)
    {
        case 1:
            switch(stemData.type)
            {
                case VerbType.Assimilated:
                    return AssimilatedStem1ConjugationTemplate(root, stemData, params);
                case VerbType.Defective:
                    return DefectiveStem1ConjugationTemplate(root, stemData, params);
            }

            switch(root.type)
            {
                case RootType.MiddleWeak:
                    return HollowStem1ConjugationTemplate(root, stemData, params);

                case RootType.HamzaOnR1:
                    if(IsHamzaOnR1SpecialCase(root) && (params.tense === Tense.Present))
                    {
                        return [
                            {
                                conditions: { mood: Mood.Imperative, hasPresentVowelSuffix: true },
                                symbols: [root.r2, root.r3],
                                vowels: [Vowel.ShortI]
                            },
                            {
                                conditions: { mood: Mood.Imperative },
                                symbols: [root.r2, root.r3],
                                vowels: [Vowel.ShortU]
                            },
                            {
                                conditions: { hasPresentVowelSuffix: true },
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
                                    conditions: { mood: Mood.Imperative, hasPresentVowelSuffix: true },
                                    vowels: [Vowel.Sukun, Vowel.ShortU]
                                },
                                {
                                    conditions: { mood: Mood.Imperative },
                                    vowels: [Vowel.Sukun, Vowel.LongU]
                                },
                                {
                                    conditions: { tense: Tense.Present, hasPresentVowelSuffix: true },
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
                case RootType.Quadriliteral_FinalWeak:
                    return QuadriliteralStem1ConjugationTemplate(root, params);

                case RootType.SecondConsonantDoubled:
                    function MapPresentVowel(stemParameterization: string): Vowel
                    {
                        switch(stemParameterization)
                        {
                            case LebaneseStem1Context.PastA_PresentA:
                                return Vowel.ShortA;
                            case LebaneseStem1Context.PastA_PresentI:
                                return Vowel.ShortI;
                            case LebaneseStem1Context.PastA_PresentU:
                                return Vowel.ShortU;
                        }
                        return Vowel.Sukun; //should never happen
                    }

                    const presentVowel = MapPresentVowel(stemData.stemParameterization);
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
                    return RegularStem1ConjugationTemplate(root, stemData, params);
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
                            conditions: { tense: Tense.Present, hasPresentVowelSuffix: true },
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

                case RootType.InitialWeak:
                case RootType.MiddleWeak:
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
                                            conditions: { hasPresentVowelSuffix: true },
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
                case RootType.FinalWeak:
                    return DefectiveStem3ConjugationTemplate(root);
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
                                            conditions: { hasPresentVowelSuffix: true },
                                            vowels: [Vowel.LongA, Vowel.Sukun]
                                        },
                                    ]
                                },
                            ]
                        },
                    ];
                case RootType.Regular:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? undefined : 2,
                                    vowels: [Vowel.LongA, Vowel.ShortA],
                                },
                                {
                                    conditions: { tense: Tense.Present, hasPresentVowelSuffix: true },
                                    prefixVowel: Vowel.Sukun,
                                    vowels: [Vowel.LongA, Vowel.Sukun],
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.Sukun,
                                    vowels: [Vowel.LongA, Vowel.ShortI],
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
                                    conditions: { mood: Mood.Imperative, hasPresentVowelSuffix: true },
                                    vowels: [Vowel.Sukun, Vowel.ShortI]
                                },
                                {
                                    conditions: { mood: Mood.Imperative },
                                    vowels: [Vowel.Sukun, Vowel.LongU]
                                },
                                {
                                    conditions: { hasPresentVowelSuffix: true },
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
                                            conditions: { hasPresentVowelSuffix: true, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.LongI],
                                        },
                                        {
                                            conditions: { hasPresentVowelSuffix: true },
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
                                            conditions: { hasPresentVowelSuffix: true, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.LongI],
                                        },
                                        {
                                            conditions: { hasPresentVowelSuffix: true },
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

        case 7:
        {
            switch(stemData.type)
            {
                case VerbType.Defective:
                    return DefectiveStem7ConjugationTemplate(root, stemData, params);
                case VerbType.Geminate:
                    return GeminateStem7ConjugationTemplate(root, stemData, params);
                case VerbType.Hollow:
                    return HollowStem7ConjugationTemplate(root, stemData, params);
                case VerbType.Sound:
                    return SoundStem7ConjugationTemplate(root, stemData, params);
            }
        }
        break;

        case 8:
        {
            switch(stemData.type)
            {
                case VerbType.Geminate:
                    return GeminateStem8ConjugationTemplate(root, stemData, params);
            }
            
            switch(root.type)
            {
                case RootType.FinalWeak:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, Letter.Ta, root.r2],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.DiphtongAj],
                                    children: [
                                        {
                                            conditions: { person: Person.Third, gender: Gender.Male, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.BrokenA],
                                        },
                                        {
                                            conditions: { person: Person.Third },
                                            vowels: [Vowel.Sukun, Vowel.ShortA],
                                        }
                                    ]
                                },
                                {
                                    conditions: {},
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.Sukun, Vowel.LongI],
                                    children: [
                                        {
                                            conditions: { mood: Mood.Imperative, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.ShortI, Vowel.LongI],
                                        },
                                        {
                                            conditions: { mood: Mood.Imperative, numerus: Numerus.Plural },
                                            vowels: [Vowel.Sukun, Vowel.ShortI],
                                        },
                                        {
                                            conditions: { hasPresentVowelSuffix: true },
                                            vowels: [Vowel.Sukun, Vowel.Sukun],
                                        },
                                    ],
                                },
                            ]
                        },
                    ];

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
                                    conditions: { tense: Tense.Present, hasPresentVowelSuffix: true },
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

        case 10:
        {
            switch(root.type)
            {
                case RootType.FinalWeak:
                    return [
                        {
                            conditions: {},
                            symbols: [Letter.Siin, Letter.Ta, root.r1, root.r2, root.r2],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    vowels: [Vowel.Sukun, Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.DiphtongAj],
                                    children: [
                                        {
                                            conditions: { person: Person.Third, gender: Gender.Male, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.BrokenA],
                                        },
                                        {
                                            conditions: { person: Person.Third },
                                            vowels: [Vowel.Sukun, Vowel.Sukun, Vowel.ShortA, Vowel.Sukun],
                                        }
                                    ]
                                },
                                {
                                    conditions: {},
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.BrokenA],
                                    children: [
                                        {
                                            conditions: { hasPresentVowelSuffix: true },
                                            vowels: [Vowel.Sukun, Vowel.Sukun, Vowel.ShortA, Vowel.Sukun],
                                        }
                                    ],
                                },
                            ]
                        },
                    ];
                case RootType.Regular:
                    return [
                        {
                            conditions: {},
                            symbols: [Letter.Siin, Letter.Ta, root.r1, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 1 : 3,
                                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.ShortA]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.ShortI],
                                    children: [
                                        {
                                            conditions: { hasPresentVowelSuffix: true },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.Sukun]
                                        }
                                    ],
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