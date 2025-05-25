/**
 * OpenArabicConjugation
 * Copyright (C) 2024-2025 Amir Czwink (amir130@hotmail.de)
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
import { ConjugationTest, RunActiveParticipleTest, RunDefectiveConjugationTest } from "../../shared";
import { DialectType } from "openarabicconjugation/dist/Dialects";

//Source: https://en.wiktionary.org/wiki/%D8%A7%D9%86%D8%A8%D8%BA%D9%89

It("Stem 7", () => {
    const root = "ب-غ";
    const stem = 7;
    
    throw new Error("TODO verbal noun test :)");
    RunActiveParticipleTest(root + "-و", stem, "مُنْبَغٍ", DialectType.ModernStandardArabic);
    RunActiveParticipleTest(root + "-ي", stem, "مُنْبَغٍ", DialectType.ModernStandardArabic);
    
    const conjugations: ConjugationTest[] = [
        //active past
        { voice: "active", expected: "اِنْبَغَى", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِنْبَغَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِنْبَغَيْتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِنْبَغَيْتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِنْبَغَيْتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "اِنْبَغَيَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِنْبَغَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِنْبَغَيْتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "اِنْبَغَوْا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِنْبَغَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِنْبَغَيْتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِنْبَغَيْتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِنْبَغَيْنَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //active indicative
        { voice: "active", expected: "يَنْبَغِي", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَنْبَغِي", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَنْبَغِي", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَنْبَغِينَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "أَنْبَغِي", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يَنْبَغِيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَنْبَغِيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَنْبَغِيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يَنْبَغُونَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "يَنْبَغِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَنْبَغُونَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَنْبَغِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "نَنْبَغِي", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //active subjunctive
        { voice: "active", expected: "يَنْبَغِيَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَنْبَغِيَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَنْبَغِيَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَنْبَغِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "أَنْبَغِيَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يَنْبَغِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَنْبَغِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَنْبَغِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يَنْبَغُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "يَنْبَغِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَنْبَغُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَنْبَغِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "نَنْبَغِيَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //active jussive
        { voice: "active", expected: "يَنْبَغِ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَنْبَغِ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَنْبَغِ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَنْبَغِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "أَنْبَغِ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يَنْبَغِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَنْبَغِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَنْبَغِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يَنْبَغُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "يَنْبَغِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَنْبَغُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَنْبَغِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "نَنْبَغِ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { voice: "active", expected: "اِنْبَغِ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "imperative" },
        { voice: "active", expected: "اِنْبَغِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "imperative" },

        { voice: "active", expected: "اِنْبَغِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { voice: "active", expected: "اِنْبَغُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { voice: "active", expected: "اِنْبَغِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunDefectiveConjugationTest(root, stem, conjugations);
});