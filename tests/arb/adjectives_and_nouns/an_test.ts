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
import { It } from "@aczwink/acts-util-test";
import { Gender, Numerus } from "../../../dist/Definitions";
import { NounTestData, NounDeclensionTest, RunNounDeclensionTest, RunDerivationTest } from "./shared";

//Source: https://en.wiktionary.org/wiki/%D9%85%D9%82%D9%87%D9%89#Noun

It("Fathatan-type, with dual", () => {
    const singular: NounTestData = {
        base: "مَقْهًى",
        gender: Gender.Male,
        numerus: Numerus.Singular
    };
    
    const declensions_singular: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "مَقْهَى" },
        { case: "informal", state: "definite", expected: "الْمَقْهَى" },
        { case: "informal", state: "construct", expected: "مَقْهَى" },

        { case: "nominative", state: "indefinite", expected: "مَقْهًى" },
        { case: "nominative", state: "definite", expected: "الْمَقْهَى" },
        { case: "nominative", state: "construct", expected: "مَقْهَى" },

        { case: "accusative", state: "indefinite", expected: "مَقْهًى" },
        { case: "accusative", state: "definite", expected: "الْمَقْهَى" },
        { case: "accusative", state: "construct", expected: "مَقْهَى" },

        { case: "genitive", state: "indefinite", expected: "مَقْهًى" },
        { case: "genitive", state: "definite", expected: "الْمَقْهَى" },
        { case: "genitive", state: "construct", expected: "مَقْهَى" },
    ];

    RunNounDeclensionTest(singular, declensions_singular);

    const dual: NounTestData = {
        base: "مَقْهَيَيْن",
        gender: Gender.Male,
        numerus: Numerus.Dual
    };

    RunDerivationTest(singular, "dual", dual.base);

    const declensions_dual: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "مَقْهَيَيْن" },
        { case: "informal", state: "definite", expected: "الْمَقْهَيَيْن" },
        { case: "informal", state: "construct", expected: "مَقْهَيَيْ" },

        { case: "nominative", state: "indefinite", expected: "مَقْهَيَانِ" },
        { case: "nominative", state: "definite", expected: "الْمَقْهَيَانِ" },
        { case: "nominative", state: "construct", expected: "مَقْهَيَا" },

        { case: "accusative", state: "indefinite", expected: "مَقْهَيَيْنِ" },
        { case: "accusative", state: "definite", expected: "الْمَقْهَيَيْنِ" },
        { case: "accusative", state: "construct", expected: "مَقْهَيَيْ" },

        { case: "genitive", state: "indefinite", expected: "مَقْهَيَيْنِ" },
        { case: "genitive", state: "definite", expected: "الْمَقْهَيَيْنِ" },
        { case: "genitive", state: "construct", expected: "مَقْهَيَيْ" },
    ];

    RunNounDeclensionTest(dual, declensions_dual);
});