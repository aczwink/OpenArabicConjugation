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
import { Hamzate } from "./Hamza";
import { AdjectiveOrNounInput, DialectConjugator, TargetAdjectiveNounDerivation } from "./DialectConjugator";
import { MSAConjugator } from "./dialects/msa/MSAConjugator";
import { ConjugationVocalized, DisplayVocalized } from "./Vocalization";
import { ConjugationParams, Tashkil, Tense, Voice, Mood, Person, AdjectiveOrNounDeclensionParams, Gender, Numerus } from "./Definitions";
import { LebaneseConjugator } from "./dialects/lebanese/LebaneseConjugator";
import { DialectType } from "./Dialects";
import { Verb } from "./Verb";
import { ModernStandardArabicStem1ParametersType } from "./dialects/msa/conjugation/r2tashkil";
import { SouthLevantineConjugator } from "./dialects/south-levantine/SouthLevantineConjugator";
import { _TODO_ConjugationVocalizedToConjugatedWord, _TODO_ToConjugationVocalized, ConjugatedWord, ConjugationElement, ConjugationRuleMatchResult, FinalVowel, SuffixResult } from "./Conjugation";

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

    public ConjugateParticiple(verb: Verb<string>, voice: Voice): DisplayVocalized[]
    {
        const dialectConjugator = this.CreateDialectConjugator(verb.dialect);
        const pattern = dialectConjugator.ConjugateParticiple(verb as any, voice, this.ConjugateBaseForm.bind(this, verb));

        return this.ExecuteWordTransformationPipeline(Array.isArray(pattern) ? _TODO_ConjugationVocalizedToConjugatedWord(pattern) : pattern);
    }

    public DeclineAdjectiveOrNoun(input: AdjectiveOrNounInput, params: AdjectiveOrNounDeclensionParams, dialect: DialectType)
    {
        const dialectConjugator = new MSAConjugator;

        return dialectConjugator.DeclineAdjectiveOrNoun(input, params);
    }

    public DeriveSoundAdjectiveOrNoun(singular: DisplayVocalized[], singularGender: Gender, target: TargetAdjectiveNounDerivation, dialect: DialectType): DisplayVocalized[]
    {
        const dialectConjugator = new MSAConjugator;
        return dialectConjugator.DeriveSoundAdjectiveOrNoun(singular, singularGender, target);
    }

    public DeclineStativeActiveParticiple(verb: Verb<string>): DisplayVocalized[]
    {
        const dialectConjugator = this.CreateDialectConjugator(DialectType.ModernStandardArabic);
        if(!(dialectConjugator instanceof MSAConjugator))
            throw new Error("This does only work for Modern Standard Arabic!");

        const pattern = dialectConjugator.DeclineStativeActiveParticiple(this.VerifyIsMSA(verb));

        return this.ExecuteWordTransformationPipeline(_TODO_ConjugationVocalizedToConjugatedWord(pattern));
    }

    public GenerateAllPossibleVerbalNouns(verb: Verb<string>): DisplayVocalized[][]
    {
        const dialectConjugator = new MSAConjugator;
        const patterns = dialectConjugator.GenerateAllPossibleVerbalNouns(verb as Verb<any>);

        return patterns.map(x => this.ExecuteWordTransformationPipeline(_TODO_ConjugationVocalizedToConjugatedWord(x)));
    }

    public HasPotentiallyMultipleVerbalNounForms(verb: Verb<string>)
    {
        const dialectConjugator = new MSAConjugator;
        return dialectConjugator.HasPotentiallyMultipleVerbalNounForms(verb as Verb<any>);
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
            return _TODO_ConjugationVocalizedToConjugatedWord(result);

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

    private VerifyIsMSA(verb: Verb<string>): Verb<ModernStandardArabicStem1ParametersType>
    {
        if(verb.stem === 1)
        {
            switch(verb.stemParameterization)
            {
                case ModernStandardArabicStem1ParametersType.DefectiveType1:
                case ModernStandardArabicStem1ParametersType.DefectiveType2:
                case ModernStandardArabicStem1ParametersType.DefectiveType3:
                case ModernStandardArabicStem1ParametersType.IrregularHayiya:
                case ModernStandardArabicStem1ParametersType.IrregularLaysa:
                case ModernStandardArabicStem1ParametersType.PastA_PresentA:
                case ModernStandardArabicStem1ParametersType.PastI_PresentI:
                case ModernStandardArabicStem1ParametersType.PastU_PresentU:
                case ModernStandardArabicStem1ParametersType.Quadrilateral:
                    return verb as Verb<ModernStandardArabicStem1ParametersType>;
                default:
                    throw new Error("Wrong stem parameterization!");
            }
        }
        return verb as Verb<ModernStandardArabicStem1ParametersType>;
    }
}
