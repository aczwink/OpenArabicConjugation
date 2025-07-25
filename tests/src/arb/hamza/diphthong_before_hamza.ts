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
import { DialectType } from "openarabicconjugation/dist/Dialects";
import { VerbType } from "openarabicconjugation/dist/Definitions";

It("Diphthong before hamza", () => {
    const conjugations: ConjugationTest[] = [
        { expected: "يَيْئَسُ", tense: "present" }
    ];

    _Legacy_RunConjugationTest("ي-ء-س", ModernStandardArabicStem1ParametersType.PastI_PresentA, conjugations, DialectType.ModernStandardArabic, VerbType.Sound);
});