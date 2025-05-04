/**
 * OpenArabicConjugation
 * Copyright (C) 2025 Amir Czwink (amir130@hotmail.de)
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
import { It } from "acts-util-test";
import { RunConjugationTest, RunVerbalNounPatternTest } from "../../shared";
import { ModernStandardArabicStem1ParametersType } from "openarabicconjugation/dist/dialects/msa/conjugation/r2tashkil";

//Source: https://en.wiktionary.org/wiki/%D9%88%D9%81%D9%82#Verb

It("Stem 1 - Type Past:u Present:u", () => {
    const stem = ModernStandardArabicStem1ParametersType.RegularOrHollow_PastU_PresentU;

    RunVerbalNounPatternTest(stem, [
        { expected: "يُسْر", rootRadicals: "ي-س-ر" },
        { expected: "وَشْك", rootRadicals: "و-ش-ك" },
    ]);

    RunConjugationTest("و-ع-ل", stem, [
        { expected: "وَعُلَ" },
        { expected: "يَعُلُ", tense: "present" },
        { expected: "عُلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);
});