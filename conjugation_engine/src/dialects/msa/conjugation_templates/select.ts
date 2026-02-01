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

import { ConjugationRule } from "../../../Conjugation";
import { Letter, VerbType, Voice } from "../../../Definitions";
import { Verb } from "../../../Verb";
import { RootType } from "../../../VerbRoot";
import { ModernStandardArabicStem1ParametersType } from "../conjugation/r2tashkil";
import { AssimilatedStem1Template } from "./assimilated_stem1";
import { AssimilatedStem10Template } from "./assimilated_stem10";
import { GeminateStem1Template } from "./geminate_stem1";
import { GeminateStem10Template } from "./geminate_stem10";
import { GeminateStem4Template } from "./geminate_stem4";
import { GeminateStem8Template } from "./geminate_stem8";
import { HollowStem1Template } from "./hollow_stem1";
import { IrregularAhyaTemplate } from "./irregular_ahya";
import { IrregularHayiyaTemplate } from "./irregular_hayiya";
import { IrregularLaysaTemplate } from "./irregular_laysa";
import { QuadriliteralStem2Template } from "./quadriliteral_stem2";
import { QuadriliteralStem4Template } from "./quadriliteral_stem4";
import { SoundStem9Template } from "./sound_stem9";

export function SelectTemplate(stemData: Verb<ModernStandardArabicStem1ParametersType>, voice: Voice): ConjugationRule[] | undefined
{
    switch(stemData.stem)
    {
        case 1:
            switch(stemData.type)
            {
                case VerbType.Assimilated:
                    return AssimilatedStem1Template(stemData.root, stemData);
                case VerbType.Geminate:
                    return GeminateStem1Template(stemData.root, stemData, voice);
                case VerbType.Hollow:
                    return HollowStem1Template(stemData.root, stemData, voice);
                case VerbType.Irregular:
                {
                    switch(stemData.stemParameterization)
                    {
                        case ModernStandardArabicStem1ParametersType.IrregularHayiya:
                            return IrregularHayiyaTemplate(stemData, voice);
                        case ModernStandardArabicStem1ParametersType.IrregularLaysa:
                            return IrregularLaysaTemplate(stemData);
                    }
                }
                break;
            }
        break;
        case 2:
        {
            switch(stemData.type)
            {
                case VerbType.SoundQuadriliteral:
                    return QuadriliteralStem2Template(stemData.root, voice);
            }
        }
        break;
        case 4:
        {
            switch(stemData.type)
            {
                case VerbType.Irregular:
                    if(stemData.root.type === RootType.DoublyWeak_WawOrYaOnR2AndR3)
                    {
                        if(stemData.root.radicalsAsSeparateLetters.Equals([Letter.Hha, Letter.Ya, Letter.Waw]))
                            return IrregularAhyaTemplate();
                        throw new Error("TODO: implement me!");
                    }
                    break;
                case VerbType.Geminate:
                    return GeminateStem4Template(stemData, voice);
                case VerbType.SoundQuadriliteral:
                    return QuadriliteralStem4Template(stemData.root, voice);
            }
        }
        break;
        case 8:
        {
            switch(stemData.type)
            {
                case VerbType.Geminate:
                    return GeminateStem8Template(stemData, voice);
            }
        }
        break;
        case 9:
        {
            switch(stemData.type)
            {
                case VerbType.Sound:
                    return SoundStem9Template(stemData, voice);
            }
        }
        break;
        case 10:
        {
            switch(stemData.type)
            {
                case VerbType.Assimilated:
                    return AssimilatedStem10Template(stemData.root);
                case VerbType.Geminate:
                    return GeminateStem10Template(stemData, voice);
            }
        }
        break;
    }
    return undefined;
}