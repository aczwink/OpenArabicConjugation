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
import { It } from "@aczwink/acts-util-test";
import { RunVerbalNounPatternTest, VerbTestData } from "../../shared";
import { ModernStandardArabicStem1ParametersType } from "../../../dist/dialects/msa/conjugation/r2tashkil";
import { DialectType } from "../../../dist/Dialects";
import { VerbType } from "../../../dist/Definitions";

It("R1:و Stem 1 Sound Past:u Present:u", () => {
    const verb: VerbTestData = {
        dialect: DialectType.ModernStandardArabic,
        rootRadicals: "و-ق-ح",
        stem: ModernStandardArabicStem1ParametersType.PastU_PresentU,
        verbType: VerbType.Sound
    };

    RunVerbalNounPatternTest(verb.stem, [
        { expected: "وَقَاحَة", rootRadicals: verb.rootRadicals, }, //Source: http://ejtaal.net/aa/#hw4=1288
        { expected: "وَشْك", rootRadicals: "و-ش-ك", },
        { expected: "وُشْك", rootRadicals: "و-ش-ك", },
    ], verb.verbType)
});