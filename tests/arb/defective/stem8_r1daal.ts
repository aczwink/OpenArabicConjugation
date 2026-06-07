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
import { ConjugationTest, RunConjugationTest, VerbTestData, RunVerbalNounTest, RunParticipleTest } from "../../shared";
import { DialectType } from "../../../dist/Dialects";

//Source: https://en.wiktionary.org/wiki/%D8%A7%D8%AF%D8%B9%D9%89#Arabic
//and https://en.wikipedia.org/wiki/Arabic_verbs#Form_VIII_assimilations

It("Stem 8 with R1 = Daal assimilation", () => {
    const verb: VerbTestData = {
        dialect: DialectType.ModernStandardArabic,
        rootRadicals: "د-ع-و",
        stem: 8,
    };
    
    RunVerbalNounTest(verb, "اِدِّعَاء");
    RunParticipleTest(verb, "مُدَّعٍ", "مُدَّعًى");

    const conjugations: ConjugationTest[] = [
        //active past
        { voice: "active", expected: "اِدَّعَى", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِدَّعَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِدَّعَيْتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِدَّعَيْتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِدَّعَيْتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "اِدَّعَيَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِدَّعَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِدَّعَيْتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "اِدَّعَوْا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِدَّعَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِدَّعَيْتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِدَّعَيْتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "اِدَّعَيْنَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //active indicative
        { voice: "active", expected: "يَدَّعِي", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَدَّعِي", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَدَّعِي", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَدَّعِينَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "أَدَّعِي", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يَدَّعِيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَدَّعِيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَدَّعِيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يَدَّعُونَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "يَدَّعِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَدَّعُونَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَدَّعِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "نَدَّعِي", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //active subjunctive
        { voice: "active", expected: "يَدَّعِيَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَدَّعِيَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَدَّعِيَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَدَّعِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "أَدَّعِيَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يَدَّعِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَدَّعِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَدَّعِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يَدَّعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "يَدَّعِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَدَّعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَدَّعِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "نَدَّعِيَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //active jussive
        { voice: "active", expected: "يَدَّعِ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَدَّعِ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَدَّعِ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَدَّعِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "أَدَّعِ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يَدَّعِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَدَّعِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَدَّعِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يَدَّعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "يَدَّعِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَدَّعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَدَّعِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "نَدَّعِ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { voice: "active", expected: "اِدَّعِ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "imperative" },
        { voice: "active", expected: "اِدَّعِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "imperative" },

        { voice: "active", expected: "اِدَّعِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { voice: "active", expected: "اِدَّعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { voice: "active", expected: "اِدَّعِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //passive past
        { voice: "passive", expected: "اُدُّعِيَ", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "اُدُّعِيَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "اُدُّعِيتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "اُدُّعِيتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "اُدُّعِيتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "passive", expected: "اُدُّعِيَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "اُدُّعِيَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "اُدُّعِيتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "passive", expected: "اُدُّعُوا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "اُدُّعِينَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "اُدُّعِيتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "اُدُّعِيتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "اُدُّعِينَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //passive indicative
        { voice: "passive", expected: "يُدَّعَى", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُدَّعَى", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُدَّعَى", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُدَّعَيْنَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "أُدَّعَى", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "passive", expected: "يُدَّعَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُدَّعَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُدَّعَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "passive", expected: "يُدَّعَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "يُدَّعَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُدَّعَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُدَّعَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "نُدَّعَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //passive subjunctive
        { voice: "passive", expected: "يُدَّعَى", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُدَّعَى", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُدَّعَى", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُدَّعَيْ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُدَّعَى", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُدَّعَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُدَّعَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُدَّعَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُدَّعَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُدَّعَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُدَّعَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُدَّعَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُدَّعَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //passive jussive
        { voice: "passive", expected: "يُدَّعَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُدَّعَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُدَّعَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُدَّعَيْ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُدَّعَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُدَّعَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُدَّعَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُدَّعَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُدَّعَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُدَّعَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُدَّعَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُدَّعَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُدَّعَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest(verb, conjugations);
});