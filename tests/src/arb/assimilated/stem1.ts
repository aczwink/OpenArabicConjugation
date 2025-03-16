/**
 * OpenArabicConjugation
 * Copyright (C) 2024-2025 Amir Czwink (amir130@hotmail.de)
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
import { RunConjugationTest } from "../../shared";
import { ModernStandardArabicStem1ParametersType } from "openarabicconjugation/dist/dialects/msa/conjugation/r2tashkil";

It("Stem 1", () => {
    throw new Error("TODO verbal noun test :)");

    RunConjugationTest("و-ع-ل", ModernStandardArabicStem1ParametersType.PastA_PresentU, [
        { expected: "وَعَلَ" },
        { expected: "يَعُلُ", tense: "present" },
        { expected: "عُلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);
    RunConjugationTest("و-ع-ل", ModernStandardArabicStem1ParametersType.PastI_PresentA, [
        { expected: "وَعِلَ" },
        { expected: "يَعَلُ", tense: "present" },
        { expected: "عَلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);
    RunConjugationTest("و-ع-ل", ModernStandardArabicStem1ParametersType.RegularOrHollow_PastU_PresentU, [
        { expected: "وَعُلَ" },
        { expected: "يَعُلُ", tense: "present" },
        { expected: "عُلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);

    throw new Error("TODO :)");
});