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
import { ConjugationParams, AdjectiveDeclensionParams, Gender, Letter, Numerus, Person, Tashkil, Tense, NounDeclensionParams, Voice, AdvancedStemNumber, VerbType } from "../../Definitions";
import { DialectConjugator, NounInput, TargetNounDerivation } from "../../DialectConjugator";
import { RootType, VerbRoot } from "../../VerbRoot";
import { ConjugationVocalized, DisplayVocalized } from "../../Vocalization";
import { DerivePrefix } from "./prefix";
import { MSAConjugator } from "../msa/MSAConjugator";
import { AugmentRoot } from "./rootAugmentation";
import { _TODO_ToConjugationVocalized, _TODO_VowelToTashkil, ConjugatedWord, ConjugationItem, ConjugationRuleMatchResult } from "../../Conjugation";
import { DeriveSuffix, SuffixResult } from "./suffix";
import { ConjugationRuleMatcher } from "../../ConjugationRuleMatcher";
import { LebaneseStem1Context } from "./LebaneseDialectMetadata";
import { Verb, VerbStem1Data } from "../../Verb";
import { DialectType } from "../../Dialects";

//Source is mostly: https://en.wikipedia.org/wiki/Levantine_Arabic_grammar

export class LebaneseConjugator implements DialectConjugator<LebaneseStem1Context>
{
    //Public methods    
    public Conjugate(verb: Verb<LebaneseStem1Context>, params: ConjugationParams): ConjugationVocalized[]
    {
        const rootAugmentation = AugmentRoot(verb.root, verb, params);
        if(rootAugmentation === undefined)
        {
            return [
                {
                    letter: "TODO" as any,
                    tashkil: Tashkil.Dhamma
                }
            ];
        }

        const matched = new ConjugationRuleMatcher<LebaneseStem1Context>().Match(rootAugmentation, verb, params);

        const prefix = DerivePrefix(matched.prefixVowel, matched.vowels[0], params);
        const suffix = DeriveSuffix(verb.type, params);

        const constructed = this.Construct(matched, prefix, suffix);

        return _TODO_ToConjugationVocalized(constructed);
    }

    public ConjugateParticiple(verb: Verb<LebaneseStem1Context>, voice: Voice): ConjugationVocalized[]
    {
        if(voice !== Voice.Active)
            return [{ emphasis: true, letter: "TODO" as any, tashkil: Tashkil.AlefMaksuraMarker }];

        const root = verb.root;
        const stem = verb.stem;        
        switch(verb.root.type)
        {
            case RootType.FinalWeak:
            {
                switch(verb.stem)
                {
                    case 5:
                    case 6:
                    case 10:
                        const base = this.ConjugateBaseForm(verb.root, verb.stem);
                        base[base.length - 2].tashkil = Tashkil.Kasra;
                        base[base.length - 1].letter = Letter.Ya;
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...base
                        ];
                    case 8:
                    {
                        const base = this.ConjugateBaseForm(verb.root, verb.stem);
                        base[base.length - 3].tashkil = Tashkil.Sukun;
                        base[base.length - 2].tashkil = Tashkil.Kasra;
                        base[base.length - 1].letter = Letter.Ya;
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
                        if(verb.root.radicalsAsSeparateLetters.Equals([Letter.Jiim, Letter.Ya, Letter.Hamza]))
                            {
                                return [
                                    { letter: verb.root.r1, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker }
                                ];
                            }
        
                            return [
                                { letter: verb.root.r1, tashkil: Tashkil.Fatha },
                                { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                { letter: Letter.Ya, tashkil: Tashkil.Kasra },
                                { letter: verb.root.r3, tashkil: Tashkil.EndOfWordMarker },
                            ];

                    case 8:
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...this.ConjugateBaseForm(verb.root, verb.stem)
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
                            ...this.ConjugateBaseForm(verb.root, verb.stem)
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
                }
            }
            break;

            case RootType.Regular:
            {
                switch(stem)
                {
                    case 3:
                    {
                        const base = this.ConjugateBaseForm(root, stem);
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
                            ...this.ConjugateBaseForm(root, stem)
                        ];
                    case 8:
                        const base = this.ConjugateBaseForm(root, stem);
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
        const msaVersion = conjugator.ConjugateParticiple(verb as any, voice);

        switch(root.type)
        {
            case RootType.FinalWeak:
                switch(stem)
                {
                    case 1:
                        msaVersion[2].tashkil = Tashkil.Kasra;
                        msaVersion.push({
                            letter: Letter.Ya,
                            tashkil: Tashkil.LongVowelMarker
                        });
                        return msaVersion;
                    case 2:
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

        return [{ emphasis: true, letter: "TODO" as any, tashkil: Tashkil.AlefMaksuraMarker }];
    }

    public DeclineAdjective(vocalized: DisplayVocalized[], params: AdjectiveDeclensionParams): DisplayVocalized[]
    {
        return [{ emphasis: true, letter: "TODO" as any, shadda: true, }];
    }

    public DeclineNoun(inputNoun: NounInput, params: NounDeclensionParams): DisplayVocalized[]
    {
        return [{ emphasis: true, letter: "TODO" as any, shadda: true, }];
    }
    
    public DeriveSoundNoun(singular: DisplayVocalized[], singularGender: Gender, target: TargetNounDerivation): DisplayVocalized[]
    {
        return [{ emphasis: true, letter: "TODO" as any, shadda: true, }];
    }

    //Private methods
    private ConjugateBaseForm(root: VerbRoot, stem: AdvancedStemNumber | VerbStem1Data<LebaneseStem1Context>)
    {
        const verb: Verb<LebaneseStem1Context> = {
            dialect: DialectType.Lebanese,
            stem: (typeof stem === "number" ? stem : 1) as any,
            stemParameterization: (typeof stem === "number" ? undefined : stem.stemParameterization) as any,
            type: (typeof stem === "number" ? root.DeriveDeducedVerbType() : stem.type),
            root
        };
        if(typeof stem === "number")
        {
            return this.Conjugate(verb, {
                gender: Gender.Male,
                tense: Tense.Perfect,
                numerus: Numerus.Singular,
                person: Person.Third,
                voice: Voice.Active,
            });
        }

        return this.Conjugate(verb, {
            gender: Gender.Male,
            tense: Tense.Perfect,
            numerus: Numerus.Singular,
            person: Person.Third,
            voice: Voice.Active,
        });
    }

    private Construct(rule: ConjugationRuleMatchResult, prefix: ConjugationItem[], suffix: SuffixResult): ConjugatedWord
    {
        const vowels = [...rule.vowels, suffix.previousVowel];
        let vowelIndex = 0;

        const items = prefix.concat(rule.symbols.map((x,i)=> ({
            consonant: x,
            followingVowel: vowels[vowelIndex++],
            emphasis: (i === rule.emphasize) ? true : undefined
        })));
        if(suffix.prefinal !== undefined)
            items.push(suffix.prefinal);

        if(suffix.final !== undefined)
        {
            if(typeof suffix.final === "string")
            {
                return {
                    items,
                    final: suffix.final
                };
            }
            else
                items.push(suffix.final);
        }
        return {
            items
        };
    }
}
