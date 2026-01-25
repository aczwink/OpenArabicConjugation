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
import { It } from "acts-util-test";
import { ConjugationTest, VerbTestData, RunConjugationTest, RunParticipleTest } from "../../shared";
import { DialectType } from "openarabicconjugation/dist/Dialects";
import { VerbType } from "openarabicconjugation/dist/Definitions";

//Source: https://en.wiktionary.org/wiki/%D8%A3%D8%AD%D9%8A%D8%A7#Arabic

It("Special: ح-ي-و, Stem 4", () => {
    const verbTestData: VerbTestData = {
        dialect: DialectType.ModernStandardArabic,
        rootRadicals: "ح-ي-و",
        stem: 4,
        verbType: VerbType.Irregular,
    };

    throw new Error("TODO: verbal noun test");
    RunParticipleTest(verbTestData, "مُحْيٍ", "مُحْيًى");

    const conjugations: ConjugationTest[] = [
        //active past
        { voice: "active", expected: "أَحْيَا", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَحْيَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَحْيَيْتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَحْيَيْتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَحْيَيْتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "أَحْيَيَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَحْيَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَحْيَيْتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "أَحْيَوْا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَحْيَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَحْيَيْتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَحْيَيْتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَحْيَيْنَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //active indicative
        { voice: "active", expected: "يُحْيِي", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تُحْيِي", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تُحْيِي", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تُحْيِينَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "أُحْيِي", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يُحْيِيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تُحْيِيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تُحْيِيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يُحْيُونَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "يُحْيِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تُحْيُونَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تُحْيِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "نُحْيِي", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //active subjunctive
        { voice: "active", expected: "يُحْيِيَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تُحْيِيَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تُحْيِيَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تُحْيِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "أُحْيِيَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يُحْيِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تُحْيِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تُحْيِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يُحْيُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "يُحْيِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تُحْيُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تُحْيِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "نُحْيِيَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //active jussive
        { voice: "active", expected: "يُحْيِ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تُحْيِ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تُحْيِ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تُحْيِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "أُحْيِ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يُحْيِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تُحْيِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تُحْيِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يُحْيُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "يُحْيِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تُحْيُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تُحْيِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "نُحْيِ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { voice: "active", expected: "أَحْيِ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "imperative" },
        { voice: "active", expected: "أَحْيِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "imperative" },

        { voice: "active", expected: "أَحْيِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { voice: "active", expected: "أَحْيُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { voice: "active", expected: "أَحْيِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //passive past
        { voice: "passive", expected: "أُحْيِيَ", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُحْيِيَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُحْيِيتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُحْيِيتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُحْيِيتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "passive", expected: "أُحْيِيَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُحْيِيَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُحْيِيتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "passive", expected: "أُحْيُوا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُحْيِينَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُحْيِيتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُحْيِيتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُحْيِينَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //passive indicative
        { voice: "passive", expected: "يُحْيَا", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُحْيَا", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُحْيَا", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُحْيَيْنَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "أُحْيَا", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "passive", expected: "يُحْيَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُحْيَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُحْيَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "passive", expected: "يُحْيَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "يُحْيَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُحْيَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُحْيَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "نُحْيَا", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //passive subjunctive
        { voice: "passive", expected: "يُحْيَا", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُحْيَا", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُحْيَا", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُحْيَيْ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُحْيَا", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُحْيَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُحْيَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُحْيَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُحْيَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُحْيَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُحْيَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُحْيَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُحْيَا", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //passive jussive
        { voice: "passive", expected: "يُحْيَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُحْيَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُحْيَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُحْيَيْ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُحْيَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُحْيَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُحْيَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُحْيَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُحْيَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُحْيَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُحْيَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُحْيَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُحْيَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest(verbTestData, conjugations);
});