/**
 * OpenArabicConjugation
 * Copyright (C) 2024 Amir Czwink (amir130@hotmail.de)
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
import { ConjugationTest, _Legacy_RunConjugationTest, _Legacy_RunParticipleTest, RunVerbalNounTest } from "../../shared";

//Source: https://en.wiktionary.org/wiki/%D8%A7%D8%B3%D8%AA%D8%AD%D8%A7%D9%84#Arabic

It("Hollow stem 10 test", () => {
    const root = "ح-و-ل"
    const stem = 10;

    RunVerbalNounTest(root, stem, "اِسْتِحَالَة");
    _Legacy_RunParticipleTest(root, stem, "مُسْتَحِيل", "مُسْتَحَال");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "اِسْتَحَالَ", gender: "male", person: "third", },
        { expected: "اِسْتَحَالَتْ", gender: "female", person: "third", },
        { expected: "اِسْتَحَلْتَ", gender: "male", person: "second" },
        { expected: "اِسْتَحَلْتِ", gender: "female", person: "second" },
        { expected: "اِسْتَحَلْتُ", gender: "male", person: "first" },

        { expected: "اِسْتَحَالَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "اِسْتَحَالَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "اِسْتَحَلْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "اِسْتَحَالُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "اِسْتَحَلْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "اِسْتَحَلْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "اِسْتَحَلْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "اِسْتَحَلْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَسْتَحِيلُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَسْتَحِيلُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَسْتَحِيلُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَسْتَحِيلِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَسْتَحِيلُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَسْتَحِيلَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَسْتَحِيلَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَسْتَحِيلَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَسْتَحِيلُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَسْتَحِلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَسْتَحِيلُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَسْتَحِلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَسْتَحِيلُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَسْتَحِيلَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَحِيلَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَحِيلَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَحِيلِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَسْتَحِيلَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَسْتَحِيلَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَحِيلَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَحِيلَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَسْتَحِيلُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَسْتَحِلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَحِيلُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَحِلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَسْتَحِيلَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَسْتَحِلْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَسْتَحِلْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَسْتَحِلْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَسْتَحِيلِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَسْتَحِلْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَسْتَحِيلَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَسْتَحِيلَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَسْتَحِيلَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَسْتَحِيلُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَسْتَحِلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَسْتَحِيلُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَسْتَحِلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَسْتَحِلْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِسْتَحِلْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِسْتَحِيلِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِسْتَحِيلَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِسْتَحِيلُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِسْتَحِلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "اُسْتُحِيلَ", gender: "male", person: "third", },
        { voice: "passive", expected: "اُسْتُحِيلَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "اُسْتُحِلْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "اُسْتُحِلْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "اُسْتُحِلْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "اُسْتُحِيلَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "اُسْتُحِيلَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "اُسْتُحِلْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "اُسْتُحِيلُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُحِلْنَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُحِلْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُحِلْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُحِلْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُسْتَحَالُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُسْتَحَالُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُسْتَحَالُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُسْتَحَالِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُسْتَحَالُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُسْتَحَالَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُسْتَحَالَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُسْتَحَالَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُسْتَحَالُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُسْتَحَلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُسْتَحَالُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُسْتَحَلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُسْتَحَالُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُسْتَحَالَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَحَالَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَحَالَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَحَالِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُسْتَحَالَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُسْتَحَالَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَحَالَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَحَالَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُسْتَحَالُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُسْتَحَلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَحَالُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَحَلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُسْتَحَالَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُسْتَحَلْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَحَلْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَحَلْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَحَالِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُسْتَحَلْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُسْتَحَالَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَحَالَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَحَالَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُسْتَحَالُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُسْتَحَلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَحَالُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَحَلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُسْتَحَلْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    _Legacy_RunConjugationTest("ح-و-ل", 10, conjugations);
});