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

import { ConjugationItem, Vowel } from "../../Conjugation";
import { ConjugationParams, Numerus, Person, Letter, Gender, Tense, VerbType } from "../../Definitions";
import { Verb } from "../../Verb";
import { DoesPresentSuffixStartWithWawOrYa } from "../msa/conjugation/suffix";
import { LebaneseStem1Context } from "./LebaneseDialectMetadata";

export interface SuffixResult
{
    final?: Letter | ConjugationItem;
    prefinal?: ConjugationItem;
    previousVowel: Vowel;
}

function DeriveSuffixPerfect(params: ConjugationParams): SuffixResult
{
    if(params.numerus === Numerus.Plural)
    {
        switch(params.person)
        {
            case Person.First:
                return {
                    previousVowel: Vowel.Sukun,
                    final: {
                        consonant: Letter.Nun,
                        followingVowel: Vowel.LongA,
                    }
                };

            case Person.Second:
                return {
                    previousVowel: Vowel.Sukun,
                    final: Letter.Alef,
                    prefinal: {
                        consonant: Letter.Ta,
                        followingVowel: Vowel.LongU
                    }
                };

            case Person.Third:
                return {
                    previousVowel: Vowel.LongU,
                    final: Letter.Alef,
                };
        }
    }

    switch(params.person)
    {
        case Person.Second:
            if(params.gender === Gender.Female)
            {
                return {
                    previousVowel: Vowel.Sukun,
                    final: {
                        consonant: Letter.Ta,
                        followingVowel: Vowel.LongI
                    },
                };
            }
            break;
            
        case Person.Third:
            if(params.gender === Gender.Male)
            {
                return {
                    previousVowel: Vowel.Sukun
                };   
            }
            break;
    }

    return {
        previousVowel: Vowel.ShortI,
        final: {
            consonant: Letter.Ta,
            followingVowel: Vowel.Sukun
        }
    };
}

function DeriveSuffixPerfectDefective(params: ConjugationParams): SuffixResult
{
    if((params.person === Person.Third) && (params.numerus === Numerus.Singular) && (params.gender === Gender.Male))
    {
        return {
            previousVowel: Vowel.BrokenA,
        };
    }
    else if(params.person !== Person.Third)
    {
        const result = DeriveSuffixPerfect(params);
        result.previousVowel = Vowel.DiphtongAj;
        return result;
    }
    return DeriveSuffixPerfect(params);
}

function DeriveSuffixPresent(params: ConjugationParams): SuffixResult
{
    if(params.numerus === Numerus.Plural)
    {
        switch(params.person)
        {
            case Person.Second:
            case Person.Third:
                return {
                    final: Letter.Alef,
                    previousVowel: Vowel.LongU
                };
        }
    }
    else
    {
        if((params.person === Person.Second) && (params.gender === Gender.Female))
        {
            return {
                previousVowel: Vowel.LongI,
            };
        }
    }

    return {
        previousVowel: Vowel.Sukun
    };
}

function DeriveSuffixPresentDefective(verb: Verb<LebaneseStem1Context>, params: ConjugationParams): SuffixResult
{
    const regular = DeriveSuffixPresent(params);
    if((params.numerus === Numerus.Plural) && (params.person !== Person.First))
    {
        return regular;
    }
    const stem1Cond1 = (verb.stem === 1) && (verb.stemParameterization === LebaneseStem1Context.PastI_PresentA) && !DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender);
    const stem1Cond2 = (verb.stem === 1) && (verb.stemParameterization === LebaneseStem1Context.PastA_PresentA) && !DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender);
    if(stem1Cond1 || stem1Cond2)
        regular.previousVowel = Vowel.BrokenA;
    else
        regular.previousVowel = Vowel.LongI;
    return regular;
}

export function DeriveSuffix(verb: Verb<LebaneseStem1Context>, params: ConjugationParams): SuffixResult
{
    switch(verb.type)
    {
        case VerbType.Defective:
        case VerbType.QuadriliteralAndDefective:
            if(params.tense === Tense.Present)
                return DeriveSuffixPresentDefective(verb, params);
            return DeriveSuffixPerfectDefective(params);
    }

    if(params.tense === Tense.Present)
        return DeriveSuffixPresent(params);
    return DeriveSuffixPerfect(params);
}