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
import { ConjugationParams, Letter, Tashkil, Voice, VerbType } from "../../Definitions";
import { ConjugationResult, DialectConjugator } from "../../DialectConjugator";
import { RootType } from "../../VerbRoot";
import { ConjugationVocalized } from "../../Vocalization";
import { DerivePrefix } from "./prefix";
import { MSAConjugator } from "../msa/MSAConjugator";
import { AugmentRoot } from "./rootAugmentation";
import { _TODO_ToConjugationVocalized, ConjugatedWord, Vowel } from "../../Conjugation";
import { DeriveSuffix } from "./suffix";
import { ConjugationRuleMatcher } from "../../ConjugationRuleMatcher";
import { LebaneseStem1Context } from "./LebaneseDialectMetadata";
import { Verb } from "../../Verb";

//Source is mostly: https://en.wikipedia.org/wiki/Levantine_Arabic_grammar

export class LebaneseConjugator implements DialectConjugator<LebaneseStem1Context>
{
    //Public methods    
    public Conjugate(verb: Verb<LebaneseStem1Context>, params: ConjugationParams): ConjugationResult
    {
        const template = AugmentRoot(verb.root, verb, params);
        if(template === undefined)
            throw new Error("Can't be conjugated.");

        const suffix = DeriveSuffix(verb, params);
        const matched = new ConjugationRuleMatcher<LebaneseStem1Context>(suffix.previousVowel === Vowel.Sukun).Match(template, verb, params);
        const prefix = DerivePrefix(matched.prefixVowel, matched.vowels[0], params);

        return {
            matchResult: matched,
            prefix,
            suffix
        };
    }

    public ConjugateParticiple(verb: Verb<LebaneseStem1Context>, voice: Voice, requestBaseForm: () => ConjugatedWord): ConjugationVocalized[]
    {
        function GetBaseForm()
        {
            const word = requestBaseForm();
            return _TODO_ToConjugationVocalized(word);
        }

        if(voice !== Voice.Active)
            throw new Error("Passive participles can't be conjugated in lebanese dialect.");

        const root = verb.root;
        const stem = verb.stem;

        switch(verb.type)
        {
            case VerbType.Assimilated:
            {
                switch(stem)
                {
                    case 1:
                        return [
                            { letter: Letter.Waw, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: root.r2, tashkil: Tashkil.Kasra },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ];
                    case 2:
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Sukun },
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Sukun },
                            { letter: root.r2, tashkil: Tashkil.Kasra },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ];
                }
            }
            case VerbType.Irregular:
            {
                switch(stem)
                {
                    case 1:
                    {
                        switch(verb.stemParameterization)
                        {
                            case LebaneseStem1Context.IrregularIja:
                                return [
                                    { letter: verb.root.r1, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker }
                                ];
                        }
                    }
                }
            }
        }

        switch(verb.root.type)
        {
            case RootType.FinalWeak:
            {
                switch(verb.stem)
                {
                    case 5:
                    case 6:
                    case 10:
                        const base = GetBaseForm();
                        base[base.length - 2].tashkil = Tashkil.Kasra;
                        base[base.length - 1] = { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker };
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...base
                        ];

                    case 7:
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            { letter: root.r1, tashkil: Tashkil.Sukun },
                            { letter: root.r2, tashkil: Tashkil.Kasra },
                            { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker },
                        ];

                    case 8:
                    {
                        const base = GetBaseForm();
                        base[base.length - 3].tashkil = Tashkil.Sukun;
                        base[base.length - 2].tashkil = Tashkil.Kasra;
                        base[base.length - 1] = { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker };
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...base
                        ];
                    }
                }
            }
            break;

            case RootType.MiddleWeak:
            {
                switch(verb.stem)
                {
                    case 1:
                        return [
                            { letter: verb.root.r1, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: Letter.Ya, tashkil: Tashkil.Kasra },
                            { letter: verb.root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ];

                    case 7:
                    {
                        const base = GetBaseForm();
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...base
                        ];
                    }

                    case 8:
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...GetBaseForm()
                        ];
                }
            }
            break;

            case RootType.Quadriliteral:
            case RootType.Quadriliteral_FinalWeak:
            {
                switch(verb.stem)
                {
                    case 2:
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...GetBaseForm()
                        ];
                }
            }
            break;

            case RootType.SecondConsonantDoubled:
            {
                switch(stem)
                {
                    case 1:
                        return [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: root.r2, tashkil: Tashkil.Kasra },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ];
                    case 7:
                    case 8:
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...GetBaseForm()
                        ];
                }
            }
            break;

            case RootType.Regular:
            {
                switch(stem)
                {
                    case 3:
                    {
                        const base = GetBaseForm();
                        base[base.length - 2].tashkil = Tashkil.Kasra;
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Sukun },
                            ...base
                        ];
                    }
                    case 5:
                    case 6:
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...GetBaseForm()
                        ];
                    case 7:
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                            { letter: root.r1, tashkil: Tashkil.Sukun },
                            { letter: root.r2, tashkil: Tashkil.Dhamma },
                            { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ];
                    case 8:
                        const base = GetBaseForm();
                        base[base.length - 2].tashkil = Tashkil.Kasra;
                        base[base.length - 3].tashkil = Tashkil.Kasra;
                        base[base.length - 3].emphasis = undefined;
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...base
                        ];
                }
            }
            break;
        }

        const conjugator = new MSAConjugator;
        const msaVersion = conjugator.ConjugateParticiple(verb as any, voice, requestBaseForm) as ConjugationVocalized[];

        switch(verb.type)
        {
            case VerbType.Defective:
                switch(stem)
                {
                    case 1:
                        msaVersion[2].tashkil = Tashkil.Kasra;
                        msaVersion.push({
                            letter: Letter.Ya,
                            tashkil: Tashkil.LongVowelMarker
                        });
                        return msaVersion;
                }
        }

        switch(root.type)
        {
            case RootType.FinalWeak:
                switch(stem)
                {
                    case 2:
                    case 3:
                        msaVersion[0].tashkil = Tashkil.Sukun;
                        msaVersion[3].tashkil = Tashkil.Kasra;
                        msaVersion.push({
                            letter: Letter.Ya,
                            tashkil: Tashkil.LongVowelMarker
                        });
                        return msaVersion;
                }
                break;

            case RootType.HamzaOnR1:
                switch(stem)
                {
                    case 1:
                        return msaVersion;
                }
            break;

            case RootType.MiddleWeak:
                switch(stem)
                {
                    case 2:
                    case 3:
                        msaVersion[0].tashkil = Tashkil.Sukun;
                        return msaVersion;
                }
                break;

            case RootType.Quadriliteral:
            case RootType.Quadriliteral_FinalWeak:
                switch(stem)
                {
                    case 1:
                        msaVersion[0].tashkil = Tashkil.Sukun;
                        return msaVersion;
                }
                break;

            case RootType.Regular:
                switch(stem)
                {
                    case 1:
                    case 4:
                        return msaVersion;
                    case 2:
                        msaVersion[0].tashkil = Tashkil.Sukun;
                        return msaVersion;
                    case 9:
                    case 10:
                        msaVersion[0].tashkil = Tashkil.Kasra;
                        return msaVersion;
                }
                break;
        }

        return [{ emphasis: true, letter: "TODO" as any, tashkil: Tashkil.EndOfWordMarker }];
    }
}
