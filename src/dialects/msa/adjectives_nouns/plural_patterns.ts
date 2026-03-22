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
import { FinalVowel, Vowel } from "../../../Conjugation";
import { Letter } from "../../../Definitions";
import { ApplyPattern, MatchPatternAgainstWord, PatternSymbol, WordPattern } from "../../../Pattern";
import { DisplayVocalized } from "../../../Vocalization";

interface PluralPatterns
{
    singular: WordPattern;
    plurals: WordPattern[];
}

export function DeriveNounPluralPatternsImpl(singular: DisplayVocalized[])
{
    const fa3: PluralPatterns = {
        singular: {
            elements: [
                { consonant: Letter.AlefHamza, followingVowel: Vowel.ShortA },
            ],
            ending: {
                consonant: PatternSymbol.R2,
                finalVowel: FinalVowel.None
            }
        },
        plurals: [
            {
                elements: [
                    { consonant: Letter.Hamza, followingVowel: Vowel.LongA },
                    { consonant: PatternSymbol.R2, followingVowel: Vowel.LongA },
                ],
                ending: { consonant: Letter.Hamza, finalVowel: FinalVowel.None }
            }
        ]
    };

    const maf3al: PluralPatterns = {
        singular: {
            elements: [
                { consonant: Letter.Mim, followingVowel: Vowel.ShortA },
                { consonant: PatternSymbol.R1, followingVowel: Vowel.Sukun },
                { consonant: PatternSymbol.R2, followingVowel: Vowel.ShortA },
            ],
            ending: { consonant: PatternSymbol.R3, finalVowel: FinalVowel.None }
        },
        plurals: [
            {
                elements: [
                    { consonant: Letter.Mim, followingVowel: Vowel.ShortA },
                    { consonant: PatternSymbol.R1, followingVowel: Vowel.LongA },
                    { consonant: PatternSymbol.R2, followingVowel: Vowel.ShortI },
                ],
                ending: { consonant: PatternSymbol.R3, finalVowel: FinalVowel.None }
            }
        ]
    };

    const allPatterns = [fa3, maf3al];
    for (const patterns of allPatterns)
    {
        const result = MatchPatternAgainstWord(patterns.singular, singular);
        if(result !== null)
            return patterns.plurals.map(x => ApplyPattern(x, result));
    }
    
    return [];
}