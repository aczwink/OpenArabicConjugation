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
import { ConjugationVocalized } from "./Vocalization";
import { ConjugationParams, Voice } from "./Definitions";
import { Verb } from "./Verb";
import { ConjugatedWord, ConjugationElement, ConjugationRuleMatchResult, SuffixResult } from "./Conjugation";

export enum TargetAdjectiveNounDerivation
{
    DeriveFeminineSingular,
    DeriveDualSameGender,
    DeriveNisbaSameGender,
    DerivePluralSameGender,
}

export interface ConjugationResult
{
    matchResult: ConjugationRuleMatchResult;
    prefix: ConjugationElement[];
    suffix: SuffixResult;
}

export interface DialectConjugator<T extends string>
{
    Conjugate(verb: Verb<T>, params: ConjugationParams): ConjugationVocalized[] | ConjugationResult;
    ConjugateParticiple(verb: Verb<T>, voice: Voice, requestBaseForm: () => ConjugatedWord): ConjugationVocalized[] | ConjugatedWord;
}