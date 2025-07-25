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
import { It } from "acts-util-test";
import { ConjugationTest, _Legacy_RunConjugationTest } from "../../shared";
import { ModernStandardArabicStem1ParametersType } from "openarabicconjugation/dist/dialects/msa/conjugation/r2tashkil";

It("Double hamza initially", () => {
    const conjugations: ConjugationTest[] = [
        { expected: "أُؤَلِّهُ", tense: "present", person: "first" }
    ];

    _Legacy_RunConjugationTest("ء-ل-ه", 2, conjugations);
});

It("Alif madda initially", () => {
    const stem = ModernStandardArabicStem1ParametersType.PastU_PresentU;

    const conjugations: ConjugationTest[] = [
        { expected: "آصُلُ", tense: "present", person: "first" }
    ];

    _Legacy_RunConjugationTest("ء-ص-ل", stem, conjugations);
});

It("Alif madda stem 3 with hamza on r1", () => {
    const conjugations: ConjugationTest[] = [
        { expected: "آخَذَ" }
    ];

    _Legacy_RunConjugationTest("ء-خ-ذ", 3, conjugations);
});