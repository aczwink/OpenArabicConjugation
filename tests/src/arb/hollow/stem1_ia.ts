/**
 * OpenArabicConjugation
 * Copyright (C) 2023-2025 Amir Czwink (amir130@hotmail.de)
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
import { ModernStandardArabicStem1ParametersType } from "openarabicconjugation/dist/dialects/msa/conjugation/r2tashkil";

//Source: https://en.wiktionary.org/wiki/%D8%AE%D8%A7%D9%81#Verb

It("Stem 1 past:i, present:a", () => {
    const root = "خ-و-ف";
    const stem = ModernStandardArabicStem1ParametersType.PastI_PresentA;

    RunVerbalNounTest("ح-ي-ر", stem, "حَيْرَة"); //Source: http://ejtaal.net/aa/#hw4=271
    _Legacy_RunParticipleTest(root, stem, "خَائِف", "مَخُوف");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "خَافَ", gender: "male", person: "third", },
        { expected: "خَافَتْ", gender: "female", person: "third", },
        { expected: "خِفْتَ", gender: "male", person: "second" },
        { expected: "خِفْتِ", gender: "female", person: "second" },
        { expected: "خِفْتُ", gender: "male", person: "first" },

        { expected: "خَافَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "خَافَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "خِفْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "خَافُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "خِفْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "خِفْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "خِفْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "خِفْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَخَافُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَخَافُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَخَافُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَخَافِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَخَافُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَخَافَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَخَافَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَخَافَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَخَافُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَخَفْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَخَافُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَخَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَخَافُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَخَافَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَخَافَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَخَافَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَخَافِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَخَافَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَخَافَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَخَافَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَخَافَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَخَافُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَخَفْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَخَافُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَخَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَخَافَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَخَفْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَخَفْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَخَفْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَخَافِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَخَفْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَخَافَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَخَافَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَخَافَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَخَافُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَخَفْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَخَافُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَخَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَخَفْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "خَفْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "خَافِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "خَافَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "خَافُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "خَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "خِيفَ", gender: "male", person: "third", },
        { voice: "passive", expected: "خِيفَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "خِفْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "خِفْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "خِفْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "خِيفَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "خِيفَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "خِفْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "خِيفُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "خِفْنَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "خِفْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "خِفْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "خِفْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُخَافُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُخَافُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُخَافُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُخَافِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُخَافُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُخَافَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُخَافَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُخَافَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُخَافُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُخَفْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُخَافُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُخَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُخَافُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُخَافَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَافَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَافَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَافِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُخَافَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُخَافَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَافَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَافَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُخَافُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُخَفْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَافُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُخَافَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُخَفْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَفْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَفْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَافِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُخَفْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُخَافَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَافَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَافَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُخَافُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُخَفْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَافُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُخَفْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations);
});