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

It("Feminine with ة, Sound feminine plural", () => {
    const singular_masculine: NounTestData = {
        base: "مُعَلِّم",
        gender: Gender.Male,
        numerus: Numerus.Singular
    };

    const singular: NounTestData = {
        base: "مُعَلِّمَة",
        gender: Gender.Female,
        numerus: Numerus.Singular
    };    
    RunDerivationTest(singular_masculine, "feminine", singular.base);

    const declensions_singular: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "مُعَلِّمَة" },
        { case: "informal", state: "definite", expected: "الْمُعَلِّمَة" },
        { case: "informal", state: "construct", expected: "مُعَلِّمَة" },

        { case: "nominative", state: "indefinite", expected: "مُعَلِّمَةٌ" },
        { case: "nominative", state: "definite", expected: "الْمُعَلِّمَةُ" },
        { case: "nominative", state: "construct", expected: "مُعَلِّمَةُ" },

        { case: "accusative", state: "indefinite", expected: "مُعَلِّمَةً" },
        { case: "accusative", state: "definite", expected: "الْمُعَلِّمَةَ" },
        { case: "accusative", state: "construct", expected: "مُعَلِّمَةَ" },

        { case: "genitive", state: "indefinite", expected: "مُعَلِّمَةٍ" },
        { case: "genitive", state: "definite", expected: "الْمُعَلِّمَةِ" },
        { case: "genitive", state: "construct", expected: "مُعَلِّمَةِ" },
    ];

    RunNounDeclensionTest(singular, declensions_singular);

    const dual: NounTestData = {
        base: "مُعَلِّمَتَيْن",
        gender: Gender.Female,
        numerus: Numerus.Dual
    };

    RunDerivationTest(singular, "dual", dual.base);

    const declensions_dual: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "مُعَلِّمَتَيْن" },
        { case: "informal", state: "definite", expected: "الْمُعَلِّمَتَيْن" },
        { case: "informal", state: "construct", expected: "مُعَلِّمَتَيْ" },

        { case: "nominative", state: "indefinite", expected: "مُعَلِّمَتَانِ" },
        { case: "nominative", state: "definite", expected: "الْمُعَلِّمَتَانِ" },
        { case: "nominative", state: "construct", expected: "مُعَلِّمَتَا" },

        { case: "accusative", state: "indefinite", expected: "مُعَلِّمَتَيْنِ" },
        { case: "accusative", state: "definite", expected: "الْمُعَلِّمَتَيْنِ" },
        { case: "accusative", state: "construct", expected: "مُعَلِّمَتَيْ" },

        { case: "genitive", state: "indefinite", expected: "مُعَلِّمَتَيْنِ" },
        { case: "genitive", state: "definite", expected: "الْمُعَلِّمَتَيْنِ" },
        { case: "genitive", state: "construct", expected: "مُعَلِّمَتَيْ" },
    ];

    RunNounDeclensionTest(dual, declensions_dual);

    const plural: NounTestData = {
        base: "مُعَلِّمَات",
        gender: Gender.Female,
        numerus: Numerus.Plural
    };

    RunDerivationTest(singular, "plural", plural.base);

    const declensions_plural: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "مُعَلِّمَات" },
        { case: "informal", state: "definite", expected: "الْمُعَلِّمَات" },
        { case: "informal", state: "construct", expected: "مُعَلِّمَات" },

        { case: "nominative", state: "indefinite", expected: "مُعَلِّمَاتٌ" },
        { case: "nominative", state: "definite", expected: "الْمُعَلِّمَاتُ" },
        { case: "nominative", state: "construct", expected: "مُعَلِّمَاتُ" },

        { case: "accusative", state: "indefinite", expected: "مُعَلِّمَاتٍ" },
        { case: "accusative", state: "definite", expected: "الْمُعَلِّمَاتِ" },
        { case: "accusative", state: "construct", expected: "مُعَلِّمَاتِ" },

        { case: "genitive", state: "indefinite", expected: "مُعَلِّمَاتٍ" },
        { case: "genitive", state: "definite", expected: "الْمُعَلِّمَاتِ" },
        { case: "genitive", state: "construct", expected: "مُعَلِّمَاتِ" },
    ];

    RunNounDeclensionTest(plural, declensions_plural);
});