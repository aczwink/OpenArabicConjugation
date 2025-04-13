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
import { ConjugationTest, RunActiveParticipleTest, RunConjugationTest } from "../../shared";
import { DialectType } from "openarabicconjugation/dist/Dialects";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 41

It("Stem 3", () => {
    const root = "س-ع-د";
    const stem = 3;

    RunActiveParticipleTest(root, stem, "مْسَاعِدْ", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "سَاعَدْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "سَاعَدِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "سَاعَدِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "سَاعَدْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "سَاعَدِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "سَاعَدُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "سَاعَدْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "سَاعَدْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِيسَاعِدْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتْسَاعِدْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتْسَاعِدْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتْسَاعْدِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْسَاعِدْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِيسَاعْدُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتْسَاعْدُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنْسَاعِدْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْسَاعِدْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْسَاعِدْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْسَاعِدْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْسَاعْدِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "سَاعِدْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْسَاعْدُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْسَاعْدُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْسَاعِدْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "سَاعِدْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "سَاعْدِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "سَاعْدُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});