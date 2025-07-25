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

//Source: https://en.wiktionary.org/wiki/%D8%A3%D9%83%D8%AA%D8%A8#Arabic

It("Stem 4: أَكْتَبَ - يُكْتِبُ", () => {
    const root = "ك-ت-ب"
    const stem = 4;

    RunVerbalNounTest(root, stem, "إِكْتَاب");
    _Legacy_RunParticipleTest(root, stem, "مُكْتِب", "مُكْتَب");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "أَكْتَبَ", gender: "male", person: "third", },
        { expected: "أَكْتَبَتْ", gender: "female", person: "third", },
        { expected: "أَكْتَبْتَ", gender: "male", person: "second" },
        { expected: "أَكْتَبْتِ", gender: "female", person: "second" },
        { expected: "أَكْتَبْتُ", gender: "male", person: "first" },

        { expected: "أَكْتَبَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "أَكْتَبَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "أَكْتَبْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "أَكْتَبُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "أَكْتَبْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "أَكْتَبْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "أَكْتَبْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "أَكْتَبْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يُكْتِبُ", gender: "male", person: "third", tense: "present" },
        { expected: "تُكْتِبُ", gender: "female", person: "third", tense: "present" },
        { expected: "تُكْتِبُ", gender: "male", person: "second", tense: "present" },
        { expected: "تُكْتِبِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أُكْتِبُ", gender: "male", person: "first", tense: "present" },

        { expected: "يُكْتِبَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُكْتِبَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُكْتِبَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يُكْتِبُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يُكْتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تُكْتِبُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تُكْتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نُكْتِبُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يُكْتِبَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُكْتِبَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُكْتِبَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تُكْتِبِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أُكْتِبَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يُكْتِبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُكْتِبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُكْتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يُكْتِبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يُكْتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُكْتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُكْتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نُكْتِبَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يُكْتِبْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُكْتِبْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُكْتِبْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تُكْتِبِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أُكْتِبْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يُكْتِبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُكْتِبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُكْتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يُكْتِبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يُكْتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُكْتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُكْتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نُكْتِبْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "أَكْتِبْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "أَكْتِبِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "أَكْتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "أَكْتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "أَكْتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "أُكْتِبَ", gender: "male", person: "third", },
        { voice: "passive", expected: "أُكْتِبَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "أُكْتِبْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "أُكْتِبْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "أُكْتِبْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "أُكْتِبَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "أُكْتِبَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "أُكْتِبْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "أُكْتِبُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "أُكْتِبْنَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "أُكْتِبْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "أُكْتِبْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "أُكْتِبْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُكْتَبُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُكْتَبُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُكْتَبُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُكْتَبِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُكْتَبُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُكْتَبَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُكْتَبَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُكْتَبَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُكْتَبُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُكْتَبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُكْتَبُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُكْتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُكْتَبُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُكْتَبَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَبَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَبَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَبِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُكْتَبَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُكْتَبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُكْتَبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُكْتَبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُكْتَبَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُكْتَبْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَبْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَبْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَبِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُكْتَبْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُكْتَبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُكْتَبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُكْتَبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُكْتَبْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    _Legacy_RunConjugationTest("ك-ت-ب", 4, conjugations);
});