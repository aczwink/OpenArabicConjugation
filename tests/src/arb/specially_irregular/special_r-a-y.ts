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
import { ConjugationTest, _Legacy_RunConjugationTest, _Legacy_RunParticipleTest, RunVerbalNounPatternTest, RunVerbalNounTest, VerbTestData, RunConjugationTest } from "../../shared";
import { ModernStandardArabicStem1ParametersType } from "openarabicconjugation/dist/dialects/msa/conjugation/r2tashkil";
import { DialectType } from "openarabicconjugation/dist/Dialects";

//Source: https://en.wiktionary.org/wiki/%D8%B1%D8%A3%D9%89
It("Specially irregular defective رَأَى", () => {
    const verbTestData: VerbTestData = {
        dialect: DialectType.ModernStandardArabic,
        rootRadicals: "ر-ء-ي",
        stem: ModernStandardArabicStem1ParametersType.PastA_PresentI,
    }
    const root = "ر-ء-ي"
    const stem = ModernStandardArabicStem1ParametersType.PastA_PresentI;

    RunVerbalNounPatternTest(stem, [
        { expected: "رَأْي", rootRadicals: root },
        { expected: "رُؤْيَة", rootRadicals: root },
    ])
    _Legacy_RunParticipleTest(root, stem, "رَاءٍ", "مَرْئِيّ");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "رَأَى", gender: "male", person: "third", },
        { expected: "رَأَتْ", gender: "female", person: "third", },
        { expected: "رَأَيْتَ", gender: "male", person: "second" },
        { expected: "رَأَيْتِ", gender: "female", person: "second" },
        { expected: "رَأَيْتُ", gender: "male", person: "first" },

        { expected: "رَأَيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "رَأَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "رَأَيْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "رَأَوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "رَأَيْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "رَأَيْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "رَأَيْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "رَأَيْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَرَى", gender: "male", person: "third", tense: "present" },
        { expected: "تَرَى", gender: "female", person: "third", tense: "present" },
        { expected: "تَرَى", gender: "male", person: "second", tense: "present" },
        { expected: "تَرَيْنَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَرَى", gender: "male", person: "first", tense: "present" },

        { expected: "يَرَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَرَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَرَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَرَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَرَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَرَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَرَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَرَى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَرَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَرَى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَرَى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَرَيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَرَى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَرَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَرَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَرَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَرَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَرَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَرَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَرَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَرَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَرَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَرَ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَرَ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَرَيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَرَ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَرَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَرَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَرَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَرَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَرَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَرَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَرَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَرَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "رَ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "رَيْ", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "رَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "رَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "رَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "رُئِيَ", gender: "male", person: "third", },
        { voice: "passive", expected: "رُئِيَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "رُئِيتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "رُئِيتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "رُئِيتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "رُئِيَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "رُئِيَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "رُئِيتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "رُؤُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "رُئِينَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "رُئِيتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "رُئِيتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "رُئِينَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُرَى", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُرَى", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُرَى", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُرَيْنَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُرَى", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُرَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُرَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُرَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُرَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُرَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُرَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُرَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُرَى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُرَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُرَى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُرَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُرَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُرَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُرَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُرَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُرَ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُرَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُرَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُرَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُرَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest(verbTestData, conjugations);
});

//Source: https://en.wiktionary.org/wiki/%D8%A3%D8%B1%D9%89#Arabic

It("Specially irregular defective أَرَى", () => {
    const root = "ر-ء-ي"
    const stem = 4;

    RunVerbalNounTest(root, stem, "إِرَاءَة");
    _Legacy_RunParticipleTest(root, stem, "مُرٍ", "مُرًى");
    
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "أَرَى", gender: "male", person: "third", },
        { expected: "أَرَتْ", gender: "female", person: "third", },
        { expected: "أَرَيْتَ", gender: "male", person: "second" },
        { expected: "أَرَيْتِ", gender: "female", person: "second" },
        { expected: "أَرَيْتُ", gender: "male", person: "first" },

        { expected: "أَرَيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "أَرَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "أَرَيْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "أَرَوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "أَرَيْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "أَرَيْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "أَرَيْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "أَرَيْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يُرِي", gender: "male", person: "third", tense: "present" },
        { expected: "تُرِي", gender: "female", person: "third", tense: "present" },
        { expected: "تُرِي", gender: "male", person: "second", tense: "present" },
        { expected: "تُرِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أُرِي", gender: "male", person: "first", tense: "present" },

        { expected: "يُرِيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُرِيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُرِيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يُرُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يُرِينَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تُرُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تُرِينَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نُرِي", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يُرِيَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُرِيَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُرِيَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تُرِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أُرِيَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يُرِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُرِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُرِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يُرُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يُرِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُرُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُرِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نُرِيَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يُرِ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُرِ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُرِ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تُرِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أُرِ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يُرِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُرِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُرِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يُرُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يُرِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُرُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُرِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نُرِ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "أَرِ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "أَرِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "أَرِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "أَرُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "أَرِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "أُرِيَ", gender: "male", person: "third", },
        { voice: "passive", expected: "أُرِيَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "أُرِيتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "أُرِيتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "أُرِيتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "أُرِيَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "أُرِيَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "أُرِيتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "أُرُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "أُرِينَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "أُرِيتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "أُرِيتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "أُرِينَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُرَى", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُرَى", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُرَى", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُرَيْنَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُرَى", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُرَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُرَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُرَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُرَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُرَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُرَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُرَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُرَى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُرَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُرَى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُرَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُرَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُرَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُرَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُرَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُرَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُرَ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُرَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُرَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُرَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُرَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُرَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations);
});