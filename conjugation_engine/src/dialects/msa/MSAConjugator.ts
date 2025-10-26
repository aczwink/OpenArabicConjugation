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
import { Letter, ConjugationParams, Gender, Numerus, Person, AdvancedStemNumber, Tense, Voice, Tashkil, AdjectiveDeclensionParams, NounDeclensionParams, NounState, VerbType } from "../../Definitions";
import { DialectConjugator, NounInput, TargetNounDerivation } from "../../DialectConjugator";
import { RootType, VerbRoot } from "../../VerbRoot";
import { ConjugationVocalized, DisplayVocalized } from "../../Vocalization";
import { AugmentedRoot, AugmentedRootSymbolInput, SymbolName } from "./AugmentedRoot";
import { _TODO_DeriveSuffix } from "./conjugation/_legacy_suffix";
import { DerivePrefix } from "./conjugation/prefix";
import { AugmentRoot } from "./conjugation/rootAugmentation";
import { ShortenOrAlefizeR2 } from "./conjugation/hollow";
import { GeminateDoubledConsonant } from "./conjugation/doubled";
import { AlterDefectiveEnding, AlterDefectiveSuffix } from "./conjugation/defective";
import { AlterAssimilatedPrefix } from "./conjugation/assimilated";
import { ApplyRootTashkil } from "./conjugation/rootTashkil";
import { GenerateAllPossibleVerbalNounsStem1, HasPotentiallyMultipleVerbalNounFormsStem1 } from "./verbal_nouns/stem1";
import { Stem8AssimilateTaVerb } from "./conjugation/stem8";
import { GenerateAllPossibleVerbalNounsStem8 } from "./verbal_nouns/stem8";
import { GenerateAllPossibleVerbalNounsStem5 } from "./verbal_nouns/stem5";
import { GenerateParticipleStem4 } from "./participle/stem4";
import { GenerateAllPossibleVerbalNounsStem10 } from "./verbal_nouns/stem10";
import { GenerateParticipleStem2 } from "./participle/stem2";
import { GenerateParticipleStem1 } from "./participle/stem1";
import { GenerateParticipleStem8 } from "./participle/stem8";
import { AlterSpeciallyIrregularDefective, IsSpeciallyIrregularDefective } from "./conjugation/defective_special_cases";
import { GenerateParticipleStem5 } from "./participle/stem5";
import { GenerateParticipleStem3 } from "./participle/stem3";
import { GenerateAllPossibleVerbalNounsStem3 } from "./verbal_nouns/stem3";
import { GenerateAllPossibleVerbalNounsStem4 } from "./verbal_nouns/stem4";
import { GenerateAllPossibleVerbalNounsStem6 } from "./verbal_nouns/stem6";
import { GenerateAllPossibleVerbalNounsStem2 } from "./verbal_nouns/stem2";
import { GenerateParticipleStem10 } from "./participle/stem10";
import { DeclineAdjectiveInSuffix } from "./adjectives/decline_in";
import { DeclineAdjectiveTriptoteSuffix } from "./adjectives/decline_triptote";
import { IsSunLetter } from "../../Util";
import { DeclineNounTriptoteSuffix } from "./nouns/triptote";
import { WithTashkilOnLast } from "./adjectives/shared";
import { GenerateParticipleStem6 } from "./participle/stem6";
import { GenerateAllPossibleVerbalNounsStem7 } from "./verbal_nouns/stem7";
import { AlterHamzaOnR1 } from "./conjugation/hamza_on_r1";
import { GenerateParticipleStem9 } from "./participle/stem9";
import { Verb, VerbStem1Data } from "../../Verb";
import { DialectType } from "../../Dialects";
import { ModernStandardArabicStem1ParametersType } from "./conjugation/r2tashkil";
import { SelectTemplate } from "./conjugation_templates/select";
import { ConjugationRuleMatcher } from "../../ConjugationRuleMatcher";
import { _TODO_TashkilToVowel, _TODO_ToConjugationVocalized, _TODO_VowelToTashkil, ConjugationItem, Vowel } from "../../Conjugation";

//Source is mostly: https://en.wikipedia.org/wiki/Arabic_verbs

export class MSAConjugator implements DialectConjugator<ModernStandardArabicStem1ParametersType>
{
    //Public methods
    public Conjugate(verb: Verb<ModernStandardArabicStem1ParametersType>, params: ConjugationParams): ConjugationVocalized[]
    {
        this.MissingTestsCheck(verb);

        const result = this.ProcessConjugationPipeline(verb, params);
        return DerivePrefix(result.augmentedRoot.symbols[0].tashkil as any, verb.root.type, verb, params).concat(result.augmentedRoot.symbols, result.suffix.suffix);
    }

    public ConjugateParticiple(verb: Verb<ModernStandardArabicStem1ParametersType>, voice: Voice): ConjugationVocalized[]
    {
        const voiceOld = voice === Voice.Active ? "active" : "passive";
        const root = verb.root;
        const stem = verb.stem;
        switch(stem)
        {
            case 1:
                return GenerateParticipleStem1(root, voiceOld, verb);
            case 2:
                return GenerateParticipleStem2(this.ConjugateBasicForm_OLD(root, stem), voice);
            case 3:
                return GenerateParticipleStem3(root, voiceOld);
            case 4:
                return GenerateParticipleStem4(verb, this.ConjugateBasicForm(verb), voice);
            case 5:
                return GenerateParticipleStem5(root, this.ConjugateBasicForm_OLD(root, stem), voice);
            case 6:
                return GenerateParticipleStem6(root, this.ConjugateBasicForm_OLD(root, stem), voice);
            case 8:
                return GenerateParticipleStem8(verb, this.ConjugateBasicForm(verb), voice);
            case 9:
                return GenerateParticipleStem9(root, this.ConjugateBasicForm_OLD(root, stem), voice);
            case 10:
                return GenerateParticipleStem10(root, voiceOld);
        }
        return [{letter: "TODO ConjugateParticiple" as any, tashkil: Tashkil.Dhamma}];
    }

    public DeclineAdjective(vocalized: DisplayVocalized[], params: AdjectiveDeclensionParams): DisplayVocalized[]
    {
        function inner()
        {
            if(vocalized[vocalized.length - 1].tashkil === Tashkil.Kasratan)
                return DeclineAdjectiveInSuffix(vocalized, params);
            return DeclineAdjectiveTriptoteSuffix(vocalized, params);
        }

        return this.ConditionallyAddArticle(params.definite, inner());
    }

    public DeclineNoun(inputNoun: NounInput, params: NounDeclensionParams): DisplayVocalized[]
    {
        function inner()
        {
            return DeclineNounTriptoteSuffix(inputNoun, params);
        }

        return this.ConditionallyAddArticle(params.state === NounState.Definite, inner());
    }
    
    public DeriveSoundNoun(singular: DisplayVocalized[], singularGender: Gender, target: TargetNounDerivation): DisplayVocalized[]
    {
        switch(target)
        {
            case TargetNounDerivation.DeriveFeminineSingular:
                return [
                    ...singular,
                    { emphasis: false, letter: Letter.TaMarbuta, shadda: false }
                ];

            case TargetNounDerivation.DeriveDualSameGender:
            {
                const fixedEnding = WithTashkilOnLast(singular, Tashkil.Fatha).concat([
                    { emphasis: false, letter: Letter.Ya, shadda: false, tashkil: Tashkil.Sukun },
                    { emphasis: false, letter: Letter.Nun, shadda: false },
                ]);

                if(singularGender === Gender.Female)
                {
                    fixedEnding[fixedEnding.length - 4].tashkil = Tashkil.Fatha;
                    fixedEnding[fixedEnding.length - 3].letter = Letter.Ta;
                }
                return fixedEnding;
            }
                
            case TargetNounDerivation.DerivePluralSameGender:
            {
                if(singularGender === Gender.Female)
                {
                    return singular.slice(0, singular.length - 1).concat([
                        { emphasis: false, letter: Letter.Alef, shadda: false },
                        { emphasis: false, letter: Letter.Ta, shadda: false },
                    ]);
                }

                return WithTashkilOnLast(singular, Tashkil.Kasra).concat([
                    { emphasis: false, letter: Letter.Ya, shadda: false },
                    { emphasis: false, letter: Letter.Nun, shadda: false },
                ]);
            }
        }
    }

    public DeclineStativeActiveParticiple(verb: Verb<ModernStandardArabicStem1ParametersType>)
    {
        const root = verb.root;
        if(verb.stem !== 1)
            throw new Error("Does only work for stem 1 verbs");

        switch(verb.type)
        {
            case VerbType.Sound:
                return [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Kasra },
                    { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ];
        }
        throw new Error("Method not implemented.");
    }

    public GenerateAllPossibleVerbalNouns(root: VerbRoot, stem: AdvancedStemNumber | VerbStem1Data<ModernStandardArabicStem1ParametersType>): ConjugationVocalized[][]
    {
        switch(stem)
        {
            case 2:
                return GenerateAllPossibleVerbalNounsStem2(root);
            case 3:
                return GenerateAllPossibleVerbalNounsStem3(root);
            case 4:
                return [GenerateAllPossibleVerbalNounsStem4(root)];
            case 5:
                return [GenerateAllPossibleVerbalNounsStem5(root)];
            case 6:
                return [GenerateAllPossibleVerbalNounsStem6(root)];
            case 7:
                return [GenerateAllPossibleVerbalNounsStem7(root)];
            case 8:
                return [GenerateAllPossibleVerbalNounsStem8(root)];
            case 9:
                return [];
            case 10:
                return [GenerateAllPossibleVerbalNounsStem10(root)];
            default:
                return GenerateAllPossibleVerbalNounsStem1(root, stem);
        }
    }

    public HasPotentiallyMultipleVerbalNounForms(verb: Verb<ModernStandardArabicStem1ParametersType>)
    {
        if(verb.stem === 1)
            return HasPotentiallyMultipleVerbalNounFormsStem1(verb.root, verb);
        
        if(verb.stem === 2)
        {
            switch(verb.root.type)
            {
                case RootType.FinalWeak:
                case RootType.Regular:
                case RootType.SecondConsonantDoubled:
                    return true;
            }
        }
        if((verb.stem === 3) && (verb.root.type === RootType.Regular))
            return true;

        return false;
    }

    //Private methods
    private ConditionallyAddArticle(isDefinite: boolean, vocalized: DisplayVocalized[]): DisplayVocalized[]
    {
        if(isDefinite)
        {
            const v = vocalized;
            if(IsSunLetter(v[0].letter))
            {
                return [
                    { emphasis: false, letter: Letter.Alef, shadda: false },
                    { emphasis: false, letter: Letter.Lam, shadda: false },
                    { ...v[0], shadda: true },
                    ...v.slice(1),
                ];
            }
            return [
                { emphasis: false, letter: Letter.Alef, shadda: false },
                { emphasis: false, letter: Letter.Lam, shadda: false, tashkil: Tashkil.Sukun},
                ...v
            ];
        }
        return vocalized;
    }

    private ConjugateBasicForm(verb: Verb<ModernStandardArabicStem1ParametersType>)
    {
        return this.ProcessConjugationPipeline(verb, {
            gender: Gender.Male,
            numerus: Numerus.Singular,
            person: Person.Third,
            tense: Tense.Perfect,
            voice: Voice.Active,
        })!.augmentedRoot;
    }

    private ConjugateBasicForm_OLD(root: VerbRoot, stem: AdvancedStemNumber)
    {
        return this.ConjugateBasicForm({
            dialect: DialectType.ModernStandardArabic,
            root,
            stem,
            type: root.DeriveDeducedVerbType()
        });
    }

    private MissingTestsCheck(verb: Verb<ModernStandardArabicStem1ParametersType>)
    {
        if((verb.root.r1 === Letter.Hamza) && (verb.root.r3 === Letter.Ya) && (verb.stem === 4))
        {
            //https://en.wikipedia.org/wiki/Arabic_verbs#Doubly_weak_verbs
            throw new Error("TODO: write test! 2");
        }

        if((verb.root.r1 === Letter.Waw) && (verb.root.r3 === Letter.Waw) && (verb.stem === 8))
        {
            //https://en.wikipedia.org/wiki/Arabic_verbs#Doubly_weak_verbs
            throw new Error("TODO: write test! 3");
        }
        if((verb.root.r1 === Letter.Waw) && (verb.root.r3 === Letter.Ya) && (verb.stem === 8))
        {
            //https://en.wikipedia.org/wiki/Arabic_verbs#Doubly_weak_verbs
            throw new Error("TODO: write test! 3");
        }

        if(verb.root.r1 === Letter.Waw)
        {
            switch(verb.stem)
            {
                case 7:
                case 9:
                    throw new Error("TODO: write test: waw " + verb.stem + " " + verb.root.ToString());
            }
        }
        else if(verb.root.r1 === Letter.Ya)
        {
            switch(verb.stem)
            {
                case 1:
                    switch(verb.stemParameterization)
                    {
                        case ModernStandardArabicStem1ParametersType.PastI_PresentA:
                        case ModernStandardArabicStem1ParametersType.PastI_PresentI:
                        case ModernStandardArabicStem1ParametersType.PastU_PresentU:
                            return;
                    }
                case 2:
                case 3:
                case 4:
                case 6:
                case 7:
                case 8:
                case 9:
                    throw new Error("TODO: write test: ya " + verb.stem + " " + verb.root.ToString());
            }
        }
    }

    private ProcessConjugationPipeline(verb: Verb<ModernStandardArabicStem1ParametersType>, params: ConjugationParams)
    {
        const template = SelectTemplate(verb, params.voice);
        if(template !== undefined)
        {
            const suffix = _TODO_DeriveSuffix(params);
            switch(verb.type)
            {
                case VerbType.Irregular:
                    if((params.tense === Tense.Present) && (verb.stem === 1) && (verb.stemParameterization === ModernStandardArabicStem1ParametersType.IrregularHayiya))
                        AlterDefectiveSuffix(params, verb, suffix.suffix);
                    break;
            }

            const matched = new ConjugationRuleMatcher<ModernStandardArabicStem1ParametersType>(suffix.preSuffixTashkil === Tashkil.Sukun).Match(template, verb, params);

            const items: ConjugationItem[] = [];
            const vowels = [...matched.vowels, _TODO_TashkilToVowel(suffix.preSuffixTashkil)];
            for(let i = 0; i < matched.symbols.length; i++)
            {
                items.push({
                    consonant: matched.symbols[i],
                    followingVowel: vowels[i],
                });
            }

            const word = _TODO_ToConjugationVocalized({
                items,
            });

            const input: AugmentedRootSymbolInput[] = [];
            for (const element of word)
            {
                input.push({
                    letter: element.letter,
                    symbolName: SymbolName.Infix,
                    tashkil: element.tashkil,
                });
            }
            let rIdx = -1;
            const rSyms = [SymbolName.R1, SymbolName.R2, SymbolName.R3, SymbolName.R4];
            let arrIdx = 0;
            for (const radical of verb.root.radicalsAsSeparateLetters)
            {
                const foundIndex = input.findIndex( (x, i) => (i > rIdx) && (x.symbolName === SymbolName.Infix) && (x.letter === radical));
                if(foundIndex !== -1)
                {
                    rIdx = foundIndex;
                    (input[rIdx] as any).symbolName = rSyms[arrIdx++];
                }
            }

            const augmentedRoot = new AugmentedRoot(input, verb.root);

            return {
                augmentedRoot,
                suffix
            };
        }

        const maybeAugmentedRoot = AugmentRoot(verb.stem, verb.root, params);
        if(maybeAugmentedRoot === undefined)
            throw new Error("TODO: can't form augmented root");
        
        const augmentedRoot = new AugmentedRoot(maybeAugmentedRoot, verb.root);

        ApplyRootTashkil(augmentedRoot, verb, params);

        const suffix = _TODO_DeriveSuffix(params);
        augmentedRoot.ApplyRadicalTashkil(verb.root.radicalsAsSeparateLetters.length as any, suffix.preSuffixTashkil);

        switch(verb.type)
        {
            case VerbType.Assimilated:
                AlterAssimilatedPrefix(augmentedRoot, verb, params);
            break;
            case VerbType.AssimilatedAndDefective:
                if(verb.stem === 1)
                    AlterAssimilatedPrefix(augmentedRoot, verb, params);
                AlterDefectiveSuffix(params, verb, suffix.suffix);
                AlterDefectiveEnding(augmentedRoot, verb, params);
            break;
            case VerbType.Defective:
                if(IsSpeciallyIrregularDefective(verb.root, verb.stem))
                    AlterSpeciallyIrregularDefective(verb.root, augmentedRoot, suffix.suffix, verb, params);
                else
                {
                    AlterDefectiveSuffix(params, verb, suffix.suffix);
                    AlterDefectiveEnding(augmentedRoot, verb, params);
                }
            break;
            case VerbType.HamzaOnR1:
                AlterHamzaOnR1(augmentedRoot, verb, params);
                break;
            case VerbType.Hollow:
                ShortenOrAlefizeR2(augmentedRoot, verb, params);
            break;
            case VerbType.Geminate:
                GeminateDoubledConsonant(augmentedRoot, verb, params);
            break;
        }

        if(verb.stem === 8)
            Stem8AssimilateTaVerb(augmentedRoot, params.tense);
        return {
            augmentedRoot,
            suffix
        };
    }
}