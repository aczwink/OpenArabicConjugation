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
import { NounDeclensionTest, NounTestData, RunDerivationTest, RunNounDeclensionTest } from "./shared";
import { Gender, Numerus } from "../../../dist/Definitions";

//Source: https://en.wiktionary.org/wiki/%D8%A7%D9%85%D8%B1%D8%A3%D8%A9

It("With custom definite form", () => {
    const singular: NounTestData = {
        base: "الْمَرْأَة",
        gender: Gender.Female,
        numerus: Numerus.Singular,
        isDefinite: true
    };

    const declensions: NounDeclensionTest[] = [
        { case: "informal", state: "definite", expected: "الْمَرْأَة" },
        
        { case: "nominative", state: "definite", expected: "الْمَرْأَةُ" },
        
        { case: "accusative", state: "definite", expected: "الْمَرْأَةَ" },
        
        { case: "genitive", state: "definite", expected: "الْمَرْأَةِ" },
    ];

    RunNounDeclensionTest(singular, declensions);

    const dual: NounTestData = {
        base: "الْمَرْأَتَيْن",
        gender: Gender.Female,
        numerus: Numerus.Dual,
        isDefinite: true
    };

    RunDerivationTest(singular, "dual", dual.base);

    const declensions_dual: NounDeclensionTest[] = [
        { case: "informal", state: "definite", expected: "الْمَرْأَتَيْن" },
        
        { case: "nominative", state: "definite", expected: "الْمَرْأَتَانِ" },
        
        { case: "accusative", state: "definite", expected: "الْمَرْأَتَيْنِ" },
        
        { case: "genitive", state: "definite", expected: "الْمَرْأَتَيْنِ" },
    ];

    RunNounDeclensionTest(dual, declensions_dual);
});