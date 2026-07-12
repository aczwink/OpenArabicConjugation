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
import { ConjugatedWord, FinalVowel, SpecialInitial, Vowel } from "./Conjugation";
import { Gender, Letter, Numerus } from "./Definitions";
import { IsSunLetter } from "./Util";

export class TransformableWord
{
    constructor(private _word: ConjugatedWord, private _numerus: Numerus, private _gender: Gender)
    {
    }

    //Properties
    public get finalVowel()
    {
        return this._word.ending?.finalVowel;
    }

    public get gender()
    {
        return this._gender;
    }

    public get numerus()
    {
        return this._numerus;
    }

    public get word()
    {
        return this._word;
    }

    //Public methods
    public IsSoundMasculinePlural()
    {
        if(this._gender === Gender.Female)
            return false;
        if(this._numerus !== Numerus.Plural)
            return false;

        if(this._word.ending === undefined)
            return false;

        return (this._word.ending.consonant === Letter.Nun) && (this._word.elements.Last().followingVowel === Vowel.LongU);
    }

    public WithFathatanEnding()
    {
        if(this._word.ending !== undefined)
        {
            return new TransformableWord({
                elements: this._word.elements,
                ending: {
                    consonant: this._word.ending.consonant,
                    finalVowel: (this._word.ending.consonant === Letter.TaMarbuta) ? FinalVowel.Fathatan : FinalVowel.FathatanWithAlef
                },
            }, this._numerus, this._gender);
        }

        return new TransformableWord({
            elements: this._word.elements.slice(0, this._word.elements.length - 1),
            ending: {
                consonant: this._word.elements.Last().consonant,
                finalVowel: FinalVowel.FathatanWithAlef
            }
        }, this._numerus, this._gender);
    }

    public WithLastTrimmed(): TransformableWord
    {
        if(this._word.ending === undefined)
        {
            return new TransformableWord({
                elements: this._word.elements.slice(0, this._word.elements.length - 1),
                initial: this._word.initial,
            }, this._numerus, this._gender);
        }

        return new TransformableWord({
            elements: this._word.elements,
            initial: this._word.initial,
        }, this._numerus, this._gender);
    }

    public WithPrependedArticle(): TransformableWord
    {
        if(IsSunLetter(this._word.elements[0].consonant))
        {
            return new TransformableWord({
                elements: [
                    { consonant: this.word.elements[0].consonant, followingVowel: Vowel.Sukun },
                    ...this._word.elements
                ],
                ending: this._word.ending,
                initial: SpecialInitial.AlefLam,
            }, this._numerus, this._gender);
        }

        return new TransformableWord({
            elements: [
                { consonant: Letter.Lam, followingVowel: Vowel.Sukun, },
                ...this._word.elements
            ],
            ending: this._word.ending,
            initial: SpecialInitial.Alef,
        }, this._numerus, this._gender);
    }

    public WithReplacedEnding(finalVowel: Vowel | FinalVowel)
    {
        if(this._word.ending === undefined)
        {
            const last = this._word.elements.Last();

            return new TransformableWord({
                elements: this._word.elements.slice(0, this._word.elements.length - 1),
                ending: {
                    consonant: last.consonant,
                    finalVowel
                },
                initial: this._word.initial,
            }, this._numerus, this._gender);
        }

        return new TransformableWord({
            elements: [
                ...this._word.elements,
            ],
            ending: {
                consonant: this._word.ending.consonant,
                finalVowel: finalVowel
            },
            initial: this._word.initial
        }, this._numerus, this._gender);
    }

    public WithReplacedSilentEnding(vowel: Vowel, consonant: Letter)
    {
        if(this._word.ending === undefined)
        {
            return new TransformableWord({
                elements: [
                    ...this._word.elements.slice(0, this._word.elements.length - 1),
                    {
                        consonant: this._word.elements.Last().consonant,
                        followingVowel: vowel
                    },
                ],
                ending: {
                    consonant,
                    finalVowel: FinalVowel.None
                },
                initial: this._word.initial
            }, this._numerus, this._gender);
        }

        return new TransformableWord({
            elements: [
                ...this._word.elements,
                {
                    consonant: (this._word.ending.consonant === Letter.TaMarbuta) ? Letter.Ta : this._word.ending.consonant,
                    followingVowel: vowel
                },
            ],
            ending: {
                consonant,
                finalVowel: FinalVowel.None
            },
            initial: this._word.initial
        }, this._numerus, this._gender);
    }

    public WithStandardFemaleEnding()
    {
        if(this._gender === Gender.Female)
            throw new Error("word is already female");

        const ending = this.WithReplacedSilentEnding(Vowel.ShortA, Letter.TaMarbuta);

        return new TransformableWord(ending._word, ending._numerus, Gender.Female);
    }
}