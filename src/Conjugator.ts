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
import { DialectConjugator, TargetAdjectiveNounDerivation } from "./DialectConjugator";
import { MSAConjugator } from "./dialects/msa/MSAConjugator";
import { ConjugationVocalized, ConvertFullyVocalized, DisplayVocalized } from "./Vocalization";
import { ConjugationParams, Tense, Voice, Mood, Person, AdjectiveOrNounDeclensionParams, Gender, Numerus, AdjectiveOrNounInput, VerbType } from "./Definitions";
import { LebaneseConjugator } from "./dialects/lebanese/LebaneseConjugator";
import { DialectType } from "./Dialects";
import { Verb } from "./Verb";
import { SouthLevantineConjugator } from "./dialects/south-levantine/SouthLevantineConjugator";
import { ConjugationVocalizedToConjugatedWord, ConjugatedWord, ConjugationRuleMatchResult, Vowel, FinalVowel, ConjugatedWordToDisplayVocalized, ConjugationElement } from "./Conjugation";
import { ConjugationRuleMatcher } from "./ConjugationRuleMatcher";
import { TransformableWord } from "./TransformableWord";
import { VerbRoot } from "./VerbRoot";

export enum TargetNounBasedDerivationPatterns
{
    PluralPatterns,
}

export enum TargetVerbBasedDerivationPatterns
{
    ActiveParticiples,
    CharacteristicNoun,
    NounOfPlace,
    PassiveParticiple,
    ToolNouns,
    VerbalNouns
}

export class Conjugator
{
    //Public methods
    public Conjugate(verb: Verb<string>, params: ConjugationParams)
    {
        if( (params.tense === Tense.Present) && (params.mood === Mood.Imperative) )
        {
            if(params.voice === Voice.Passive)
                throw new Error("imperative and passive does not exist");
            if(params.person !== Person.Second)
                throw new Error("imperative does only exist for second person");
        }
        
        const word = this.ConjugateInternal(verb, params);
        return ConjugatedWordToDisplayVocalized(word);
    }

    /**
     * Normally the input is expected to be in informal form.
     * Masculine sound plural must be given in nominative form but without the trailing fatha, i.e. the -un form (e.g. بَانُون).
     * For the following word types the input must be given in nominative form:
     * - Words ending in fathatan with alef maksura in singular nominative (e.g. مَقْهًى)
     * - Words ending in kasratan in singular nominative (e.g. بَانٍ)
     */
    public DeclineAdjectiveOrNoun(input: AdjectiveOrNounInput, params: AdjectiveOrNounDeclensionParams, dialect: DialectType)
    {
        const dialectConjugator = new MSAConjugator;
        const transformed = dialectConjugator.DeclineAdjectiveOrNoun(input, params);

        return ConjugatedWordToDisplayVocalized(transformed.word);
    }

    public DeriveFromNoun(singular: DisplayVocalized[], target: TargetNounBasedDerivationPatterns)
    {
        const dialectConjugator = new MSAConjugator;
        switch(target)
        {
            case TargetNounBasedDerivationPatterns.PluralPatterns:
                const patterns = dialectConjugator.DeriveNounPluralPatterns(singular);
                return patterns.map(x => ConjugatedWordToDisplayVocalized(x));
        }
    }

    /**
     * 
     * @returns 
     * - For @constant TargetVerbBasedDerivationPatterns.ActiveParticiples, index 0 is the standard form and index 1 is the stative form (fa3iil) if it exists.
     */
    public DeriveFromVerb(verb: Verb<string>, target: TargetVerbBasedDerivationPatterns): DisplayVocalized[][]
    {
        const dialectConjugator = this.CreateDialectConjugator(verb.dialect);
        const msaVerb = verb as Verb<any>;

        let patterns: Array<ConjugationVocalized[] | ConjugatedWord>;
        switch(target)
        {
            case TargetVerbBasedDerivationPatterns.ActiveParticiples:
            {
                const pattern = dialectConjugator.ConjugateParticiple(verb, Voice.Active, this.ConjugateBaseForm.bind(this, verb));
                patterns = [pattern];

                if((verb.dialect === DialectType.ModernStandardArabic) && (verb.stem === 1))
                {
                    //refactor this
                    switch(verb.type)
                    {
                        case VerbType.Assimilated:
                        case VerbType.Sound:
                            const msaConjugator = new MSAConjugator;
                            const result = msaConjugator.DeclineStativeActiveParticiple(msaVerb);
                            patterns.push(result);
                            break;
                    }
                }
            }
            break;
            case TargetVerbBasedDerivationPatterns.CharacteristicNoun:
            {
                const dialectConjugator = new MSAConjugator;
                const pattern = dialectConjugator.DeriveCharacteristicNoun(msaVerb);
                patterns = [pattern];
            }
            break;
            case TargetVerbBasedDerivationPatterns.NounOfPlace:
            {
                if(verb.stem > 1)
                {
                    const passiveParticiple = this.DeriveFromVerb(verb, TargetVerbBasedDerivationPatterns.PassiveParticiple);
                    const reverted = ConjugationVocalizedToConjugatedWord(ConvertFullyVocalized(passiveParticiple[0]));
                    return [passiveParticiple[0], this.DeriveSoundAdjectiveOrNoun(reverted, Gender.Male, TargetAdjectiveNounDerivation.DeriveFeminineSingular, DialectType.ModernStandardArabic)];
                }
                
                const dialectConjugator = new MSAConjugator;
                patterns = dialectConjugator.DeriveNounsOfPlace(msaVerb);
            }
            break;
            case TargetVerbBasedDerivationPatterns.PassiveParticiple:
            {
                const pattern = dialectConjugator.ConjugateParticiple(verb, Voice.Passive, this.ConjugateBaseForm.bind(this, verb));
                patterns = [pattern];
            }
            break;
            case TargetVerbBasedDerivationPatterns.ToolNouns:
            {
                const dialectConjugator = new MSAConjugator;
                patterns = dialectConjugator.DeriveToolNouns(msaVerb);
            }
            break;
            case TargetVerbBasedDerivationPatterns.VerbalNouns:
            {
                const dialectConjugator = new MSAConjugator;
                patterns = dialectConjugator.GenerateAllPossibleVerbalNouns(msaVerb);
            }
            break;
        }

        return patterns.map(pattern => ConjugatedWordToDisplayVocalized(this._LegacyPatch(pattern)));
    }

    /**
     * 
     * @param singular The same rules apply as for method @method DeclineAdjectiveOrNoun.
     * @returns
     * - For @constant TargetAdjectiveNounDerivation.DeriveFeminineSingular the informal indefinite.
     * - For @constant TargetAdjectiveNounDerivation.DeriveDualSameGender the informal indefinite.
     * - For @constant TargetAdjectiveNounDerivation.DeriveNisbaSameGender the informal indefinite.
     * - For @constant TargetAdjectiveNounDerivation.DerivePluralSameGender and masculine gender the -un form is returned (see also @method DeclineAdjectiveOrNoun), for female it is the informal indefinite.
     */
    public DeriveSoundAdjectiveOrNoun(singular: ConjugatedWord, singularGender: Gender, target: TargetAdjectiveNounDerivation, dialect: DialectType): DisplayVocalized[]
    {
        const transformable = new TransformableWord(singular, Numerus.Singular, singularGender);
        const dialectConjugator = new MSAConjugator;
        const transformed = dialectConjugator.DeriveSoundAdjectiveOrNoun(transformable, target);

        return ConjugatedWordToDisplayVocalized(transformed.word);
    }

    //Private methods
    private ConjugateBaseForm(verb: Verb<string>)
    {
        return this.ConjugateInternal(verb, {
            gender: Gender.Male,
            numerus: Numerus.Singular,
            person: Person.Third,
            tense: Tense.Perfect,
            voice: Voice.Active
        });
    }

    private ConjugateInternal(verb: Verb<string>, params: ConjugationParams): ConjugatedWord
    {
        const dialectConjugator = this.CreateDialectConjugator(verb.dialect);
        const result = dialectConjugator.Conjugate(verb, params);

        if(Array.isArray(result))
            return ConjugationVocalizedToConjugatedWord(result);

        const suffixMatch = new ConjugationRuleMatcher<string>(false, false).Match(result.suffix, verb, params);
        const match = new ConjugationRuleMatcher<string>(suffixMatch.prefixVowel === Vowel.Sukun, false).Match(result.template, verb, params);
        if(match.base !== undefined)
        {
            return this.ConjugateInternal({
                dialect: verb.dialect,
                root: (match.base.root === undefined) ? verb.root : new VerbRoot(match.base.root.join("")),
                stem: verb.stem as any,
                stemParameterization: (verb.stem === 1) ? (match.base.stemParameterization as any ?? verb.stemParameterization) : undefined,
                type: match.base.verbType ?? verb.type
            }, params);
        }
        const prefixMatch = new ConjugationRuleMatcher<string>(match.prefixVowel === Vowel.Sukun, match.vowels[0] === Vowel.Sukun).Match(result.prefix, verb, params);
        if(prefixMatch.prefixVowel !== undefined)
            throw new Error("The prefix can not have a vowel before it");

        const constructed = this.ConstructWord(match, prefixMatch, suffixMatch);
        return constructed;
    }

    private ConstructWord(rule: ConjugationRuleMatchResult, prefix: ConjugationRuleMatchResult, suffix: ConjugationRuleMatchResult): ConjugatedWord
    {
        const vowels = [...prefix.vowels];

        if(prefix.symbols.length !== prefix.vowels.length)
        {
            if(rule.prefixVowel !== undefined)
                vowels.push(rule.prefixVowel);
        }
        vowels.push(...rule.vowels);

        if(suffix.prefixVowel !== undefined)
            vowels.push(suffix.prefixVowel);
        vowels.push(...suffix.vowels);

        const symbols = [...prefix.symbols, ...rule.symbols, ...suffix.symbols];

        let symbolIndex = 0;
        const items: ConjugationElement[] = vowels.map((v,i)=> ({
            consonant: symbols[symbolIndex++],
            followingVowel: v,
            emphasis: (i === rule.emphasize) ? true : undefined
        }));

        if(prefix.dontShaddadize !== undefined)
            items[prefix.dontShaddadize].dontShaddadize = true;

        if((vowels.length+1) === symbols.length)
        {
            return {
                elements: items,
                ending: {
                    consonant: symbols.Last(),
                    finalVowel: FinalVowel.None
                }
            };
        }

        if(vowels.length !== symbols.length)
            throw new Error("Invalid combination of vowels and symbols. #Symbols: " + symbols.length + ", #Vowels: " + vowels.length);

        return {
            elements: items
        };
    }

    private CreateDialectConjugator(dialect: DialectType): DialectConjugator<string>
    {
        switch(dialect)
        {
            case DialectType.ModernStandardArabic:
                return new MSAConjugator;
            case DialectType.Lebanese:
                return new LebaneseConjugator;
            case DialectType.SouthLevantine:
                return new SouthLevantineConjugator;
        }
    }

    private _LegacyPatch(pattern: ConjugationVocalized[] | ConjugatedWord)
    {
        return Array.isArray(pattern) ? ConjugationVocalizedToConjugatedWord(pattern) : pattern;
    }
}
