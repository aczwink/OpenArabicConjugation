/**
 * OpenArabicConjugation
 * Copyright (C) 2026 Amir Czwink (amir130@hotmail.de)
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
import { ConjugationVocalizedToConjugatedWord } from "./Conjugation";
import { Conjugator, TargetVerbBasedDerivationPatterns } from "./Conjugator";
import { Letter } from "./Definitions";
import { DialectType, GetAllConjugatableDialects } from "./Dialects";
import { ModernStandardArabicStem1ParametersType } from "./dialects/msa/conjugation/r2tashkil";
import { GetDialectMetadata } from "./DialectsMetadata";
import { IsArabicPhrase } from "./Util";
import { VerbRoot } from "./VerbRoot";
import { CompareVocalized, ConvertFullyVocalized, EqualsVocalized, ParseVocalizedPhrase } from "./Vocalization";

export {
    Conjugator,
    DialectType,
    Letter,
    ModernStandardArabicStem1ParametersType,
    TargetVerbBasedDerivationPatterns,
    VerbRoot
};

export class ArabicText
{
    static CompareVocalized = CompareVocalized;
    static ConjugationVocalizedToConjugatedWord = ConjugationVocalizedToConjugatedWord;
    static ConvertFullyVocalized = ConvertFullyVocalized;
    static EqualsVocalized = EqualsVocalized;
    static IsArabicPhrase = IsArabicPhrase;
    static ParseVocalizedPhrase = ParseVocalizedPhrase;
}

export class Dialects
{
    static GetAllConjugatableDialects = GetAllConjugatableDialects;
    static GetDialectMetadata = GetDialectMetadata;
}