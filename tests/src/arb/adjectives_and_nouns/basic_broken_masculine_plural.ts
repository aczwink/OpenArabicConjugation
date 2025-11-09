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
import { NounDeclensionTest, NounTestData, RunNounDeclensionTest } from "./shared";
import { Gender, Numerus } from "openarabicconjugation/dist/Definitions";

//Source: https://en.wiktionary.org/wiki/%D8%B8%D8%B1%D9%81

It("Basic broken masculine plural", () => {
    const noun: NounTestData = {
        base: "ظُرُوف",
        gender: Gender.Male,
        numerus: Numerus.Plural
    };

    const declensions: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "ظُرُوف" },
        { case: "informal", state: "definite", expected: "الظُّرُوف" },
        { case: "informal", state: "construct", expected: "ظُرُوف" },

        { case: "nominative", state: "indefinite", expected: "ظُرُوفٌ" },
        { case: "nominative", state: "definite", expected: "الظُّرُوفُ" },
        { case: "nominative", state: "construct", expected: "ظُرُوفُ" },

        { case: "accusative", state: "indefinite", expected: "ظُرُوفًا" },
        { case: "accusative", state: "definite", expected: "الظُّرُوفَ" },
        { case: "accusative", state: "construct", expected: "ظُرُوفَ" },

        { case: "genitive", state: "indefinite", expected: "ظُرُوفٍ" },
        { case: "genitive", state: "definite", expected: "الظُّرُوفِ" },
        { case: "genitive", state: "construct", expected: "ظُرُوفِ" },
    ];

    RunNounDeclensionTest(noun, declensions);
});