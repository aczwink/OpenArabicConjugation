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
//Table: 79

It("Stem 3", () => {
    const root = "ل-ق-ي";
    const stem = 3;

    RunActiveParticipleTest(root, stem, "مْلَاقِي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "لَاقَى" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "لَاقِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "لَاقَيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "لَاقَيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "لَاقَيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "لَاقُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "لَاقَيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "لَاقَيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِيلَاقِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتْلَاقِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتْلَاقِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتْلَاقِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْلَاقِي" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِيلَاقُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتْلَاقُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنْلَاقِي" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْلَاقِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْلَاقِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْلَاقِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْلَاقِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "لَاقِي" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْلَاقُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْلَاقُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْلَاقِي" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "لَاقِي" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "لَاقِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "لَاقُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});