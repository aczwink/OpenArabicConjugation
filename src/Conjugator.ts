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
import { Hamzate } from "./Hamza";
import { DialectConjugator, TargetAdjectiveNounDerivation } from "./DialectConjugator";
import { MSAConjugator } from "./dialects/msa/MSAConjugator";
import { ConjugationVocalized, DisplayVocalized } from "./Vocalization";
import { ConjugationParams, Tashkil, Tense, Voice, Mood, Person, AdjectiveOrNounDeclensionParams, Gender, Numerus, AdjectiveOrNounInput, VerbType } from "./Definitions";
import { LebaneseConjugator } from "./dialects/lebanese/LebaneseConjugator";
import { DialectType } from "./Dialects";
import { Verb } from "./Verb";
import { SouthLevantineConjugator } from "./dialects/south-levantine/SouthLevantineConjugator";
import { ConjugationVocalizedToConjugatedWord, ConjugatedWord, ConjugationElement, ConjugationRuleMatchResult, FinalVowel, SuffixResult } from "./Conjugation";

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
        return this.ExecuteWordTransformationPipeline(word);
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

        return dialectConjugator.DeclineAdjectiveOrNoun(input, params);
    }

    public DeriveFromNoun(singular: DisplayVocalized[], target: TargetNounBasedDerivationPatterns)
    {
        const dialectConjugator = new MSAConjugator;
        switch(target)
        {
            case TargetNounBasedDerivationPatterns.PluralPatterns:
                const patterns = dialectConjugator.DeriveNounPluralPatterns(singular);
                return patterns.map(this.ExecuteWordTransformationPipeline.bind(this));
        }
    }

    /**
     * 
     * @returns 
     * - For @constant TargetVerbBasedDerivationPatterns.ActiveParticiples, index 0 is the standard form and index 1 is the stative form (fa3iil) if it exists.
     */
    public DeriveFromVerb(verb: Verb<string>, target: TargetVerbBasedDerivationPatterns)
    {
        const dialectConjugator = this.CreateDialectConjugator(verb.dialect);
        const msaVerb = verb as Verb<any>;

        let patterns;
        switch(target)
        {
            case TargetVerbBasedDerivationPatterns.ActiveParticiples:
            {
                const pattern = dialectConjugator.ConjugateParticiple(verb, Voice.Active, this.ConjugateBaseForm.bind(this, verb));
                patterns = [pattern];

                if((verb.dialect === DialectType.ModernStandardArabic) && (verb.stem === 1))
                {
                    //TODO: refactor this
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
                const dialectConjugator = new MSAConjugator;
                const pattern = dialectConjugator.DeriveNounOfPlace(msaVerb);
                patterns = [pattern];
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

        return patterns.map(pattern => this.ExecuteWordTransformationPipeline(this._LegacyPatch(pattern)));
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
    public DeriveSoundAdjectiveOrNoun(singular: DisplayVocalized[], singularGender: Gender, target: TargetAdjectiveNounDerivation, dialect: DialectType): DisplayVocalized[]
    {
        const dialectConjugator = new MSAConjugator;
        return dialectConjugator.DeriveSoundAdjectiveOrNoun(singular, singularGender, target);
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

    private ConjugateInternal(verb: Verb<string>, params: ConjugationParams)
    {
        const dialectConjugator = this.CreateDialectConjugator(verb.dialect);
        const result = dialectConjugator.Conjugate(verb, params);

        if(Array.isArray(result))
            return ConjugationVocalizedToConjugatedWord(result);

        const constructed = this.ConstructWord(result.matchResult, result.prefix, result.suffix);
        return constructed;
    }

    private ConstructWord(rule: ConjugationRuleMatchResult, prefix: ConjugationElement[], suffix: SuffixResult): ConjugatedWord
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
                    elements: items,
                    ending: {
                        consonant: suffix.final,
                        finalVowel: FinalVowel.None
                    }
                };
            }
            else
                items.push(suffix.final);
        }

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

    private ExecuteWordTransformationPipeline(word: ConjugatedWord)
    {
        const hamzated = Hamzate(word);

        return this.ToDisplayVocalized(hamzated);
    }

    private _LegacyPatch(pattern: ConjugationVocalized[] | ConjugatedWord)
    {
        return Array.isArray(pattern) ? ConjugationVocalizedToConjugatedWord(pattern) : pattern;
    }

    private ToDisplayVocalized(vocalized: ConjugationVocalized[])
    {
        const result: DisplayVocalized[] = [];
        for(let i = 0; i < vocalized.length; i++)
        {
            const v = vocalized[i];
            const next: (ConjugationVocalized | undefined) = vocalized[i + 1];

            const shadda = (v.letter === next?.letter) && (v.tashkil === Tashkil.Sukun) && (i > 0);
            const tashkil = shadda ? next.tashkil : v.tashkil;
            result.push({
                emphasis: (v.emphasis === true) || (shadda && (next.emphasis === true)),
                letter: v.letter,
                shadda,
                tashkil: (typeof tashkil === "string") ? tashkil : undefined
            });

            if(shadda)
                i++;
        }

        return result;
    }
}
