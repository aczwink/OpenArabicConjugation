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
import { It } from "acts-util-test";
import { ConjugationTest, _Legacy_RunActiveParticipleTest, _Legacy_RunConjugationTest } from "../../shared";
import { DialectType } from "openarabicconjugation/dist/Dialects";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 44

It("Stem 10", () => {
    const root = "ه-ن-ي";
    const stem = 10;

    _Legacy_RunActiveParticipleTest(root, stem, "مِسْتْهَنِّي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "سْتْهَنَّى" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "سْتْهَنِّتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "سْتْهَنَّيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "سْتْهَنَّيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "سْتْهَنَّيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "سْتْهَنُّوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "سْتْهَنَّيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "سْتْهَنَّيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِسْتْهَنَّى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِسْتْهَنَّى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِسْتْهَنَّى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِسْتْهَنِّي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِسْتْهَنَّى" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِسْتْهَنُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِسْتْهَنُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِسْتْهَنَّى" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِسْتْهَنَّى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِسْتْهَنَّى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِسْتْهَنَّى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِسْتْهَنِّي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِسْتْهَنَّى" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِسْتْهَنُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِسْتْهَنُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِسْتْهَنَّى" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "سْتْهَنَّى" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "سْتْهَنِّي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "سْتْهَنُّوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});