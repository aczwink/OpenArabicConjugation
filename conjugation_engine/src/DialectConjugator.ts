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
import { ConjugationVocalized, DisplayVocalized } from "./Vocalization";
import { ConjugationParams, Gender, Numerus, Voice } from "./Definitions";
import { Verb } from "./Verb";
import { ConjugatedWord, ConjugationItem, ConjugationRuleMatchResult, SuffixResult } from "./Conjugation";

export enum TargetAdjectiveNounDerivation
{
    DeriveFeminineSingular,
    DeriveDualSameGender,
    DerivePluralSameGender,
}

export interface AdjectiveOrNounInput
{
    vocalized: DisplayVocalized[];
    gender: Gender;
    numerus: Numerus;
}

export interface ConjugationResult
{
    matchResult: ConjugationRuleMatchResult;
    prefix: ConjugationItem[];
    suffix: SuffixResult;
}

export interface DialectConjugator<T extends string>
{
    Conjugate(verb: Verb<T>, params: ConjugationParams): ConjugationVocalized[] | ConjugationResult;
    ConjugateParticiple(verb: Verb<T>, voice: Voice, requestBaseForm: (verb: Verb<T>) => ConjugatedWord): ConjugationVocalized[];
}