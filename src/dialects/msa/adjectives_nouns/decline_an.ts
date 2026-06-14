/**
 * OpenArabicConjugation
 * Copyright (C) 2025-2026 Amir Czwink (amir130@hotmail.de)
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

import { Vowel } from "../../../Conjugation";
import { AdjectiveOrNounDeclensionParams, AdjectiveOrNounState, Case, Letter } from "../../../Definitions";
import { TransformableWord } from "../../../TransformableWord";

export function DeclineAdjectiveAnSuffix(input: TransformableWord, params: AdjectiveOrNounDeclensionParams): TransformableWord
{
    if((params.state === AdjectiveOrNounState.Indefinite) && (params.case !== Case.Informal))
        return input;

    return input.WithReplacedSilentEnding(Vowel.ShortA, Letter.AlefMaksura);
}