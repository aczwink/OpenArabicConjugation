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
import { ConjugationTest, _Legacy_RunConjugationTest, _Legacy_RunParticipleTest, RunVerbalNounTest } from "../../shared";

//Source: https://en.wiktionary.org/wiki/%D8%A7%D9%86%D9%83%D8%AA%D8%A8#Arabic

It("Stem 7: اِنْكَتَبَ - يَنْكَتِبُ", () => {
    const root = "ك-ت-ب";
    const stem = 7;

    RunVerbalNounTest(root, stem, "اِنْكِتَاب");
    _Legacy_RunParticipleTest(root, stem, "مُنْكَتِب", "مُنْكَتَب");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "اِنْكَتَبَ", gender: "male", person: "third", },
        { expected: "اِنْكَتَبَتْ", gender: "female", person: "third", },
        { expected: "اِنْكَتَبْتَ", gender: "male", person: "second" },
        { expected: "اِنْكَتَبْتِ", gender: "female", person: "second" },
        { expected: "اِنْكَتَبْتُ", gender: "male", person: "first" },

        { expected: "اِنْكَتَبَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "اِنْكَتَبَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "اِنْكَتَبْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "اِنْكَتَبُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "اِنْكَتَبْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "اِنْكَتَبْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "اِنْكَتَبْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "اِنْكَتَبْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَنْكَتِبُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَنْكَتِبُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَنْكَتِبُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَنْكَتِبِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَنْكَتِبُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَنْكَتِبَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَنْكَتِبَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَنْكَتِبَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَنْكَتِبُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَنْكَتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَنْكَتِبُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَنْكَتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَنْكَتِبُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَنْكَتِبَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَنْكَتِبَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَنْكَتِبَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَنْكَتِبِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَنْكَتِبَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَنْكَتِبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَنْكَتِبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَنْكَتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَنْكَتِبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَنْكَتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَنْكَتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَنْكَتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَنْكَتِبَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَنْكَتِبْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَنْكَتِبْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَنْكَتِبْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَنْكَتِبِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَنْكَتِبْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَنْكَتِبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَنْكَتِبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَنْكَتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَنْكَتِبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَنْكَتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَنْكَتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَنْكَتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَنْكَتِبْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِنْكَتِبْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِنْكَتِبِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِنْكَتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِنْكَتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِنْكَتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    _Legacy_RunConjugationTest("ك-ت-ب", 7, conjugations);
});