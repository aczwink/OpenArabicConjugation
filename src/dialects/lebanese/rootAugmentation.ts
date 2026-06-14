/**
 * OpenArabicConjugation
 * Copyright (C) 2024-2026 Amir Czwink (amir130@hotmail.de)
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
import { Stem8AssimilateTa } from "../msa/conjugation/stem8";
import { AssimilatedStem1ConjugationTemplate } from "./conjugation_templates/assimilated_stem1";
import { DefectiveStem1ConjugationTemplate } from "./conjugation_templates/defective_stem1";
import { DefectiveStem10ConjugationTemplate } from "./conjugation_templates/defective_stem10";
import { DefectiveStem2ConjugationTemplate } from "./conjugation_templates/defective_stem2";
import { DefectiveStem3ConjugationTemplate } from "./conjugation_templates/defective_stem3";
import { DefectiveStem5ConjugationTemplate } from "./conjugation_templates/defective_stem5";
import { DefectiveStem6ConjugationTemplate } from "./conjugation_templates/defective_stem6";
import { DefectiveStem7ConjugationTemplate } from "./conjugation_templates/defective_stem7";
import { DefectiveStem8ConjugationTemplate } from "./conjugation_templates/defective_stem8";
import { GeminateStem1ConjugationTemplate } from "./conjugation_templates/geminate_stem1";
import { GeminateStem7ConjugationTemplate } from "./conjugation_templates/geminate_stem7";
import { GeminateStem8ConjugationTemplate } from "./conjugation_templates/geminate_stem8";
import { HollowStem1ConjugationTemplate } from "./conjugation_templates/hollow_stem1";
import { HollowStem7ConjugationTemplate } from "./conjugation_templates/hollow_stem7";
import { IrregularIja } from "./conjugation_templates/irregular_ija";
import { QuadriliteralStem1ConjugationTemplate } from "./conjugation_templates/quadriliteral_stem1";
import { RegularStem1ConjugationTemplate } from "./conjugation_templates/regular_stem1";
import { SoundStem10ConjugationTemplate } from "./conjugation_templates/sound_stem10";
import { SoundStem7ConjugationTemplate } from "./conjugation_templates/sound_stem7";
import { SoundStem8ConjugationTemplate } from "./conjugation_templates/sound_stem8";
import { SoundStem9ConjugationTemplate } from "./conjugation_templates/sound_stem9";
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
                    return DefectiveStem1ConjugationTemplate(root, stemData);
                case VerbType.Irregular:
                    switch(stemData.stemParameterization)
                    {
                        case LebaneseStem1Context.IrregularIja:
                            return IrregularIja(root);
                    }
                    break;
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
                    return GeminateStem1ConjugationTemplate(root, stemData);

                case RootType.Regular:
                    return RegularStem1ConjugationTemplate(root, stemData, params);
            }
        break;

        case 2:
        {
            switch(stemData.type)
            {
                case VerbType.Defective:
                    return DefectiveStem2ConjugationTemplate(root);

                case VerbType.Sound:
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
            
            switch(root.type)
            {
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
            switch(stemData.type)
            {
                case VerbType.Defective:
                    return DefectiveStem3ConjugationTemplate(root);
                case VerbType.Sound:
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
                                            conditions: { hasPresentVowelSuffix: true },
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
            switch(stemData.type)
            {
                case VerbType.Defective:
                    return DefectiveStem5ConjugationTemplate(root);

                case VerbType.Sound:
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
            switch(stemData.type)
            {
                case VerbType.Sound:
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
            
            switch(root.type)
            {
                case RootType.FinalWeak:
                    return DefectiveStem6ConjugationTemplate(root);
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
                    return GeminateStem7ConjugationTemplate(root);
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
                case VerbType.Defective:
                    return DefectiveStem8ConjugationTemplate(root);
                case VerbType.Geminate:
                    return GeminateStem8ConjugationTemplate(root);
                case VerbType.Sound:
                    return SoundStem8ConjugationTemplate(root, params);
            }

            const stem8r1 = Stem8AssimilateTa(root.r1);
            
            switch(root.type)
            {
                case RootType.MiddleWeak:
                    return [
                        {
                            conditions: {},
                            symbols: [stem8r1.r1, stem8r1.ta, root.r3],
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
            }
        }
        break;

        case 9:
        {
            switch(stemData.type)
            {
                case VerbType.Sound:
                    return SoundStem9ConjugationTemplate(root);
            }
        }
        break;

        case 10:
        {
            switch(stemData.type)
            {
                case VerbType.Defective:
                    return DefectiveStem10ConjugationTemplate(root);
                case VerbType.Sound:
                    return SoundStem10ConjugationTemplate(root, params);
            }
        }
        break;
    }
    return undefined;
}