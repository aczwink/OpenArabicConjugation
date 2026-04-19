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
import { ConjugationTest, RunConjugationTest, VerbTestData } from "../../shared";
import { ModernStandardArabicStem1ParametersType } from "../../../dist/dialects/msa/conjugation/r2tashkil";
import { DialectType } from "../../../dist/Dialects";

//Source: https://en.wiktionary.org/wiki/%D8%AC%D8%A7%D8%A1

It("Long i (ya) before and after hamza", () => {
    const verbTestData: VerbTestData = {
        dialect: DialectType.ModernStandardArabic,
        rootRadicals: "ج-ي-ء",
        stem: ModernStandardArabicStem1ParametersType.PastI_PresentI,
    };

    const conjugations: ConjugationTest[] = [
        { expected: "تَجِيئِي", gender: "female", mood: "subjunctive", numerus: "singular", person: "second", tense: "present", voice: "active" },
    ];

    RunConjugationTest(verbTestData, conjugations);
});