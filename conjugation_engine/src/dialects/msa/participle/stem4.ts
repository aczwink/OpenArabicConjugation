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

import { Letter, Tashkil, Voice } from "../../../Definitions";
import { Verb } from "../../../Verb";
import { RootType } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";
import { AugmentedRoot } from "../AugmentedRoot";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";
import { _Legacy_GenerateParticipleDefective } from "./regular";

export function GenerateParticipleStem4(verb: Verb<ModernStandardArabicStem1ParametersType>, baseForm: AugmentedRoot, voice: Voice): ConjugationVocalized[]
{
    const voicingTashkil = (voice === Voice.Active) ? Tashkil.Kasra : Tashkil.Fatha;
    switch(baseForm.type)
    {
        case RootType.FinalWeak:
            if((verb.root.r1 === Letter.Ra) && (verb.root.r2 === Letter.Hamza) && (verb.root.r3 === Letter.Ya))
                break; //TODO: Ara / Yuri is special
            baseForm.symbols.Remove(0); //remove the hamza
            return _Legacy_GenerateParticipleDefective(baseForm, voice);
            
        case RootType.MiddleWeak:
            return [
                { letter: Letter.Mim, tashkil: Tashkil.Dhamma },
                { letter: baseForm.r1.letter, tashkil: voicingTashkil },
                { letter: (voice === Voice.Active) ? Letter.Ya : Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                { letter: baseForm.r3.letter, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.SecondConsonantDoubled:
            return [
                { letter: Letter.Mim, tashkil: Tashkil.Dhamma },
                { letter: baseForm.r1.letter, tashkil: voicingTashkil },
                { letter: baseForm.r2.letter, tashkil: Tashkil.Sukun },
                { letter: baseForm.r2.letter, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.HamzaOnR1:
        case RootType.Regular:
            return [
                { letter: Letter.Mim, tashkil: Tashkil.Dhamma },
                { letter: baseForm.r1.letter, tashkil: Tashkil.Sukun },
                { letter: baseForm.r2.letter, tashkil: voicingTashkil },
                { letter: baseForm.r3.letter, tashkil: Tashkil.EndOfWordMarker },
            ];
    }
    return [
        {
            letter: ("TODO: implement me: " + baseForm.type) as any,
            tashkil: Tashkil.EndOfWordMarker
        }
    ];
}