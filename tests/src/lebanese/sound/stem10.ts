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
import { ConjugationTest, RunActiveParticipleTest, _Legacy_RunConjugationTest } from "../../shared";
import { DialectType } from "openarabicconjugation/dist/Dialects";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 43

It("Stem 10", () => {
    const root = "ع-م-ل";
    const stem = 10;

    RunActiveParticipleTest(root, stem, "مِسْتَعْمِل", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "سْتَعْمَلْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "سْتَعْمَلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "سْتَعْمَلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "سْتَعْمَلْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "سْتَعْمَلِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "سْتَعْمَلُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "سْتَعْمَلْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "سْتَعْمَلْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِسْتَعْمِلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِسْتَعْمِلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِسْتَعْمِلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِسْتَعْمْلِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِسْتَعْمِلْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِسْتَعْمْلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِسْتَعْمْلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِسْتَعْمِلْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِسْتَعْمِلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِسْتَعْمِلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِسْتَعْمِلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِسْتَعْمْلِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِسْتَعْمِلْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِسْتَعْمْلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِسْتَعْمْلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِسْتَعْمِلْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "سْتَعْمِلْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "سْتَعْمْلِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "سْتَعْمْلُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});