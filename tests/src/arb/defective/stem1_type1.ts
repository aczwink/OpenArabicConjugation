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
import { ConjugationTest, RunDefectiveConjugationTest, RunDefectiveParticipleTest, RunVerbalNounPatternTest } from "../../shared";
import { ModernStandardArabicStem1ParametersType } from "openarabicconjugation/dist/dialects/msa/conjugation/r2tashkil";

//Source: https://en.wikipedia.org/wiki/Arabic_verbs#Defective_(third-weak)_roots
//and for verbal noun: https://en.wiktionary.org/wiki/%D9%82%D8%B6%D9%89#Arabic
//and for participles: https://en.wikipedia.org/wiki/Arabic_verbs#Defective_(third-weak)_verbs

It("Wikipedia defective stem1 type 1", () => {
    const stem = ModernStandardArabicStem1ParametersType.DefectiveType1;

    RunVerbalNounPatternTest(stem, [
        { rootRadicals: "ق-ض-ي", expected: "قَضَاء"}, //Source: https://en.wiktionary.org/wiki/%D9%82%D8%B6%D9%89
        { rootRadicals: "ب-ن-ي", expected: "بِنَاء" }, //Source: https://en.wiktionary.org/wiki/%D8%A8%D9%86%D9%89
        { rootRadicals: "م-ش-و", expected: "مَشْي" }, //Source: https://en.wiktionary.org/wiki/%D9%85%D8%B4%D9%89#Arabic
        { rootRadicals: "ك-ف-ي", expected: "كِفَايَة" }, //Source: https://en.wiktionary.org/wiki/%D9%83%D9%81%D9%89
        { rootRadicals: "ع-ص-ي", expected: "عِصْيَان" }, //Source: https://en.wiktionary.org/wiki/%D8%B9%D8%B5%D9%89
    ]);

    RunDefectiveParticipleTest("ف-ع", stem, "فَاعٍ", "مَفْعِيّ");
    
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "رَمَى", gender: "male", person: "third", },
        { expected: "رَمَتْ", gender: "female", person: "third", },
        { expected: "رَمَيْتَ", gender: "male", person: "second" },
        { expected: "رَمَيْتِ", gender: "female", person: "second" },
        { expected: "رَمَيْتُ", gender: "male", person: "first" },

        { expected: "رَمَيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "رَمَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "رَمَيْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "رَمَوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "رَمَيْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "رَمَيْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "رَمَيْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "رَمَيْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَرْمِي", gender: "male", person: "third", tense: "present" },
        { expected: "تَرْمِي", gender: "female", person: "third", tense: "present" },
        { expected: "تَرْمِي", gender: "male", person: "second", tense: "present" },
        { expected: "تَرْمِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَرْمِي", gender: "male", person: "first", tense: "present" },

        { expected: "يَرْمِيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَرْمِيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَرْمِيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَرْمُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَرْمِينَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَرْمُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَرْمِينَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَرْمِي", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَرْمِيَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمِيَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمِيَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَرْمِيَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَرْمِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَرْمُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَرْمِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَرْمِيَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَرْمِ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَرْمِ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَرْمِ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَرْمِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَرْمِ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَرْمِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَرْمِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَرْمِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَرْمُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَرْمِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَرْمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَرْمِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَرْمِ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِرْمِ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِرْمِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِرْمِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِرْمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِرْمِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunDefectiveConjugationTest("ر-م", stem, conjugations);
});