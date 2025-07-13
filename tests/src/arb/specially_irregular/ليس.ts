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
import { ConjugationTest, _Legacy_RunConjugationTest } from "../../shared";
import { ModernStandardArabicStem1ParametersType } from "openarabicconjugation/dist/dialects/msa/conjugation/r2tashkil";
import { DialectType } from "openarabicconjugation/dist/Dialects";
import { VerbType } from "openarabicconjugation/dist/Definitions";

//Source: https://en.wiktionary.org/wiki/%D9%84%D9%8A%D8%B3

It("ليس", () => {
    const root = "ل-ي-س"
    const stem = ModernStandardArabicStem1ParametersType.IrregularLaysa;

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "لَيْسَ", gender: "male", person: "third", },
        { expected: "لَيْسَتْ", gender: "female", person: "third", },
        { expected: "لَسْتَ", gender: "male", person: "second" },
        { expected: "لَسْتِ", gender: "female", person: "second" },
        { expected: "لَسْتُ", gender: "male", person: "first" },

        { expected: "لَيْسَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "لَيْسَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "لَسْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "لَيْسُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "لَسْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "لَسْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "لَسْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "لَسْنَا", gender: "male", person: "first", numerus: "plural" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.ModernStandardArabic, VerbType.Irregular);
});