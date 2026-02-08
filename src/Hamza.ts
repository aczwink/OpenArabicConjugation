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

import { ConjugatedWord, ConjugationElement, FinalVowel, ToConjugationVocalized, Vowel } from "./Conjugation";
import { Letter, Tashkil } from "./Definitions";
import { ConjugationVocalized } from "./Vocalization";

//Source: https://en.wikipedia.org/wiki/Hamza#Detailed_description

function HamzaShortVowelPrecedence(t1: Vowel, t2: Vowel)
{
    if( (t1 === Vowel.ShortI) || (t2 === Vowel.ShortI) )
        return Vowel.ShortI;
    if( (t1 === Vowel.ShortU) || (t2 === Vowel.ShortU) )
        return Vowel.ShortU;
    return Vowel.ShortA;
}

function ToShortVowel(vowel: Vowel)
{
    switch(vowel)
    {
        case Vowel.LongI:
            return Vowel.ShortI;
        case Vowel.LongU:
            return Vowel.ShortU;
    }

    return vowel;
}

function DetermineHamzaSeat(hamza: ConjugationElement, isFinal: boolean, previousVowel?: Vowel)
{
    if(previousVowel === undefined)
    {
        //hamza is initial
        if(ToShortVowel(hamza.followingVowel) === Vowel.ShortI)
            return Letter.AlefHamzaBelow;
        return Letter.AlefHamza;
    }

    let decidingVowel: (Vowel.ShortA | Vowel.ShortI | Vowel.ShortU | null);
    
    if(isFinal)
    {
        switch(previousVowel)
        {
            case Vowel.ShortA:
            case Vowel.ShortI:
            case Vowel.ShortU:
                decidingVowel = previousVowel;
                break;
            default:
                decidingVowel = null;
        }
    }
    else
    {
        //hamza is medial
        const followingShortVowel = ToShortVowel(hamza.followingVowel);
        switch(previousVowel)
        {
            case Vowel.DiphtongAj:
            case Vowel.DiphtongAw:
            case Vowel.LongA:
            case Vowel.LongI:
            case Vowel.LongU:
                if( (followingShortVowel === Vowel.ShortI) || (followingShortVowel === Vowel.ShortU) )
                    decidingVowel = followingShortVowel;
                else if((previousVowel === Vowel.DiphtongAj) || (previousVowel === Vowel.LongI))
                    decidingVowel = Vowel.ShortI;
                else
                    decidingVowel = null;
                break;
            default:
                decidingVowel = HamzaShortVowelPrecedence(followingShortVowel, previousVowel);
        }
    }

    switch(decidingVowel)
    {
        case null:
            return Letter.Hamza;
        case Vowel.ShortA:
            return Letter.AlefHamza;
        case Vowel.ShortI:
            return Letter.YaHamza;
        case Vowel.ShortU:
            return Letter.WawHamza;
    }
}

function FinalVowelToTashkil(finalVowel: Vowel | FinalVowel)
{
    switch(finalVowel)
    {
        case Vowel.Sukun:
            return Tashkil.Sukun;
        case FinalVowel.Kasratan:
            return Tashkil.Kasratan;
        case FinalVowel.None:
            return Tashkil.EndOfWordMarker;
        default:
            throw new Error("TODO: FinalVowelToTashkil" + finalVowel);
    }
}

export function Hamzate(word: ConjugatedWord)
{
    const result: ConjugationVocalized[] = [];
    for(let i = 0; i < word.elements.length; i++)
    {
        const prev = word.elements[i - 1];
        const current = word.elements[i];

        const prevIsHamza = prev?.consonant === Letter.Hamza;
        const currentIsHamza = current.consonant === Letter.Hamza;
        const isFinal = (word.ending === undefined) && (i === (word.elements.length - 1));
        const seat = DetermineHamzaSeat(current, isFinal, prev?.followingVowel);

        if(currentIsHamza && prevIsHamza && (current.followingVowel === Vowel.Sukun) && (prev.followingVowel === Vowel.ShortA))
        {
            result.pop(); //remove predecessor
            result.push({ letter: Letter.AlefMadda, tashkil: Tashkil.LongVowelMarker, emphasis: current.emphasis });
        }
        else if(currentIsHamza && (seat === Letter.AlefHamza) && (current.followingVowel === Vowel.LongA))
            result.push({ letter: Letter.AlefMadda, tashkil: Tashkil.LongVowelMarker, emphasis: current.emphasis });
        else
        {
            const next = (current.consonant === Letter.Hamza) ? { ...current, consonant: seat } : current;
            
            result.push(...ToConjugationVocalized(next));
        }
    }

    if(word.ending !== undefined)
    {
        if(word.ending.finalVowel === FinalVowel.AlefMaksuraWithFathatan)
        {
            result.push({ letter: word.ending.consonant, tashkil: Tashkil.Fathatan });
            result.push({ letter: Letter.AlefMaksura, tashkil: Tashkil.EndOfWordMarker });
        }
        else if(word.ending.consonant === Letter.Hamza)
        {
            const prev = word.elements[word.elements.length - 1];
            const hamza = DetermineHamzaSeat({ consonant: word.ending.consonant, followingVowel: Vowel.BrokenA, emphasis: false }, true, prev.followingVowel); //the vowel on the final hamza is irrelevant

            result.push({ letter: hamza, tashkil: FinalVowelToTashkil(word.ending.finalVowel) });
        }
        else
            result.push({ letter: word.ending.consonant, tashkil: FinalVowelToTashkil(word.ending.finalVowel) });
    }

    return result;
}