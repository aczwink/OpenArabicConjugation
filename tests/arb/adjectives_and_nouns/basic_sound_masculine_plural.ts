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
import { NounDeclensionTest, NounTestData, RunDerivationTest, RunNounDeclensionTest } from "./shared";
import { Gender, Numerus } from "../../../dist/Definitions";

//Source: https://en.wiktionary.org/wiki/%D9%85%D8%B9%D9%84%D9%85#Noun

It("Basic type, Sound masculine plural", () => {
    const singular: NounTestData = {
        base: "مُعَلِّم",
        gender: Gender.Male,
        numerus: Numerus.Singular
    };

    const declensions_singular: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "مُعَلِّم" },
        { case: "informal", state: "definite", expected: "الْمُعَلِّم" },
        { case: "informal", state: "construct", expected: "مُعَلِّم" },

        { case: "nominative", state: "indefinite", expected: "مُعَلِّمٌ" },
        { case: "nominative", state: "definite", expected: "الْمُعَلِّمُ" },
        { case: "nominative", state: "construct", expected: "مُعَلِّمُ" },

        { case: "accusative", state: "indefinite", expected: "مُعَلِّمًا" },
        { case: "accusative", state: "definite", expected: "الْمُعَلِّمَ" },
        { case: "accusative", state: "construct", expected: "مُعَلِّمَ" },

        { case: "genitive", state: "indefinite", expected: "مُعَلِّمٍ" },
        { case: "genitive", state: "definite", expected: "الْمُعَلِّمِ" },
        { case: "genitive", state: "construct", expected: "مُعَلِّمِ" },
    ];

    RunNounDeclensionTest(singular, declensions_singular);

    const dual: NounTestData = {
        base: "مُعَلِّمَيْن",
        gender: Gender.Male,
        numerus: Numerus.Dual
    };

    RunDerivationTest(singular, "dual", dual.base);

    const declensions_dual: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "مُعَلِّمَيْن" },
        { case: "informal", state: "definite", expected: "الْمُعَلِّمَيْن" },
        { case: "informal", state: "construct", expected: "مُعَلِّمَيْ" },

        { case: "nominative", state: "indefinite", expected: "مُعَلِّمَانِ" },
        { case: "nominative", state: "definite", expected: "الْمُعَلِّمَانِ" },
        { case: "nominative", state: "construct", expected: "مُعَلِّمَا" },

        { case: "accusative", state: "indefinite", expected: "مُعَلِّمَيْنِ" },
        { case: "accusative", state: "definite", expected: "الْمُعَلِّمَيْنِ" },
        { case: "accusative", state: "construct", expected: "مُعَلِّمَيْ" },

        { case: "genitive", state: "indefinite", expected: "مُعَلِّمَيْنِ" },
        { case: "genitive", state: "definite", expected: "الْمُعَلِّمَيْنِ" },
        { case: "genitive", state: "construct", expected: "مُعَلِّمَيْ" },
    ];

    RunNounDeclensionTest(dual, declensions_dual);

    const plural: NounTestData = {
        base: "مُعَلِّمُون",
        gender: Gender.Male,
        numerus: Numerus.Plural
    };

    RunDerivationTest(singular, "plural", plural.base);

    const declensions_plural: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "مُعَلِّمِين" },
        { case: "informal", state: "definite", expected: "الْمُعَلِّمِين" },
        { case: "informal", state: "construct", expected: "مُعَلِّمِي" },

        { case: "nominative", state: "indefinite", expected: "مُعَلِّمُونَ" },
        { case: "nominative", state: "definite", expected: "الْمُعَلِّمُونَ" },
        { case: "nominative", state: "construct", expected: "مُعَلِّمُو" },

        { case: "accusative", state: "indefinite", expected: "مُعَلِّمِينَ" },
        { case: "accusative", state: "definite", expected: "الْمُعَلِّمِينَ" },
        { case: "accusative", state: "construct", expected: "مُعَلِّمِي" },

        { case: "genitive", state: "indefinite", expected: "مُعَلِّمِينَ" },
        { case: "genitive", state: "definite", expected: "الْمُعَلِّمِينَ" },
        { case: "genitive", state: "construct", expected: "مُعَلِّمِي" },
    ];

    RunNounDeclensionTest(plural, declensions_plural);
});