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
import { ConjugationTest, RunConjugationTest, RunParticipleTest, RunVerbalNounPatternTest } from "../../shared";
import { ModernStandardArabicStem1ParametersType } from "openarabicconjugation/dist/dialects/msa/conjugation/r2tashkil";

//Source: https://en.wiktionary.org/wiki/%D8%AD%D8%B8

It("Stem 1 Past:a Present:i", () => {
    const root = "ح-ظ-ظ";
    const stem = ModernStandardArabicStem1ParametersType.PastA_PresentA;

    RunVerbalNounPatternTest(stem, [
        { rootRadicals: root, expected: "حَظّ" },
    ]);
    RunParticipleTest(root, stem, "حَاظّ", "مَحْظُوظ");

    const conjugations: ConjugationTest[] = [
        //TODO
    ];

    RunConjugationTest(root, stem, conjugations);
});