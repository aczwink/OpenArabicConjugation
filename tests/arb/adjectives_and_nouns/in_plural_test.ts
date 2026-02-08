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
import { NounTestData, NounDeclensionTest, RunNounDeclensionTest } from "./shared";

//Source: https://en.wiktionary.org/wiki/%D9%85%D9%82%D9%87%D9%89#Noun

It("Kasratan-type plural", () => {
    const plural: NounTestData = {
        base: "مَقَاهٍ",
        gender: Gender.Male,
        numerus: Numerus.Plural
    };

    const declensions: NounDeclensionTest[] = [
        { case: "informal", state: "indefinite", expected: "مَقَاهِي" },
        { case: "informal", state: "definite", expected: "الْمَقَاهِي" },
        { case: "informal", state: "construct", expected: "مَقَاهِي" },

        { case: "nominative", state: "indefinite", expected: "مَقَاهٍ" },
        { case: "nominative", state: "definite", expected: "الْمَقَاهِي" },
        { case: "nominative", state: "construct", expected: "مَقَاهِي" },

        { case: "accusative", state: "indefinite", expected: "مَقَاهِيَ" },
        { case: "accusative", state: "definite", expected: "الْمَقَاهِيَ" },
        { case: "accusative", state: "construct", expected: "مَقَاهِيَ" },

        { case: "genitive", state: "indefinite", expected: "مَقَاهٍ" },
        { case: "genitive", state: "definite", expected: "الْمَقَاهِي" },
        { case: "genitive", state: "construct", expected: "مَقَاهِي" },
    ];

    RunNounDeclensionTest(plural, declensions);
});