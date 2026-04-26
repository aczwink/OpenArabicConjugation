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
import { ConjugatedWord, FinalVowel, Vowel } from "../../../Conjugation";
import { Letter, VerbType } from "../../../Definitions";
import { Verb } from "../../../Verb";
import { VerbRoot } from "../../../VerbRoot";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";

export function GenerateVerbalNounStem9(verb: Verb<ModernStandardArabicStem1ParametersType>): ConjugatedWord
{
    const root = verb.root;

    switch(verb.type)
    {
        case VerbType.Sound:
        {
            return {
                elements: [
                    { consonant: Letter.Alef, followingVowel: Vowel.ShortI },
                    { consonant: root.r1, followingVowel: Vowel.Sukun },
                    { consonant: root.r2, followingVowel: Vowel.ShortI },
                    { consonant: root.r3, followingVowel: Vowel.LongA },
                ],
                ending: {
                    consonant: root.r3,
                    finalVowel: FinalVowel.None
                }
            };
        }
    }

    throw new Error("not implemented");
}