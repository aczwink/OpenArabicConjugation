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

//Source: https://en.wiktionary.org/wiki/%D8%A8%D8%A7%D9%86#Noun

It("Kasratan-type, Sound plural", () => {
    const singular: NounTestData = {
        base: "بَانٍ",
        gender: Gender.Male,
        numerus: Numerus.Singular
    };
    
    const declensions_singular: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "بَانِي" },
        { case: "informal", state: "definite", expected: "الْبَانِي" },
        { case: "informal", state: "construct", expected: "بَانِي" },

        { case: "nominative", state: "indefinite", expected: "بَانٍ" },
        { case: "nominative", state: "definite", expected: "الْبَانِي" },
        { case: "nominative", state: "construct", expected: "بَانِي" },

        { case: "accusative", state: "indefinite", expected: "بَانِيًا" },
        { case: "accusative", state: "definite", expected: "الْبَانِيَ" },
        { case: "accusative", state: "construct", expected: "بَانِيَ" },

        { case: "genitive", state: "indefinite", expected: "بَانٍ" },
        { case: "genitive", state: "definite", expected: "الْبَانِي" },
        { case: "genitive", state: "construct", expected: "بَانِي" },
    ];

    RunNounDeclensionTest(singular, declensions_singular);

    RunDerivationTest(singular, "feminine", "بَانِيَة");

    const dual: NounTestData = {
        base: "بَانِيَيْن",
        gender: Gender.Male,
        numerus: Numerus.Dual
    };

    RunDerivationTest(singular, "dual", dual.base);

    const declensions_dual: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "بَانِيَيْن" },
        { case: "informal", state: "definite", expected: "الْبَانِيَيْن" },
        { case: "informal", state: "construct", expected: "بَانِيَيْ" },

        { case: "nominative", state: "indefinite", expected: "بَانِيَانِ" },
        { case: "nominative", state: "definite", expected: "الْبَانِيَانِ" },
        { case: "nominative", state: "construct", expected: "بَانِيَا" },

        { case: "accusative", state: "indefinite", expected: "بَانِيَيْنِ" },
        { case: "accusative", state: "definite", expected: "الْبَانِيَيْنِ" },
        { case: "accusative", state: "construct", expected: "بَانِيَيْ" },

        { case: "genitive", state: "indefinite", expected: "بَانِيَيْنِ" },
        { case: "genitive", state: "definite", expected: "الْبَانِيَيْنِ" },
        { case: "genitive", state: "construct", expected: "بَانِيَيْ" },
    ];

    RunNounDeclensionTest(dual, declensions_dual);

    const plural: NounTestData = {
        base: "بَانُون",
        gender: Gender.Male,
        numerus: Numerus.Plural
    };

    RunDerivationTest(singular, "plural", plural.base);

    const declensions_plural: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "بَانِين" },
        { case: "informal", state: "definite", expected: "الْبَانِين" },
        { case: "informal", state: "construct", expected: "بَانِي" },

        { case: "nominative", state: "indefinite", expected: "بَانُونَ" },
        { case: "nominative", state: "definite", expected: "الْبَانُونَ" },
        { case: "nominative", state: "construct", expected: "بَانُو" },

        { case: "accusative", state: "indefinite", expected: "بَانِينَ" },
        { case: "accusative", state: "definite", expected: "الْبَانِينَ" },
        { case: "accusative", state: "construct", expected: "بَانِي" },

        { case: "genitive", state: "indefinite", expected: "بَانِينَ" },
        { case: "genitive", state: "definite", expected: "الْبَانِينَ" },
        { case: "genitive", state: "construct", expected: "بَانِي" },
    ];

    RunNounDeclensionTest(plural, declensions_plural);
});