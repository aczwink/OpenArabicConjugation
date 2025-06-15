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
import { ConjugationTest, RunActiveParticipleTest, RunConjugationTest } from "../../shared";
import { DialectType } from "openarabicconjugation/dist/Dialects";
import { LebaneseStem1Context } from "openarabicconjugation/dist/dialects/lebanese/LebaneseDialectMetadata";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 84
//Differences: The 1st person present indicative plural form uses shadda here

It("Stem 1 past:i present:a", () => {
    const root = "ن-و-م";
    const stem = LebaneseStem1Context.PastI_PresentA;

    RunActiveParticipleTest(root, stem, "نَايِم", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "نَامْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "نَامِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "نِمِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "نِمْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "نِمِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "نَامُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "نِمْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "نِمْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِينَامْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتْنَامْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتْنَامْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتْنَامِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْنَامْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِينَامُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتْنَامُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنَّامْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْنَامْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْنَامْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْنَامْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْنَامِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "نَامْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْنَامُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْنَامُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْنَامْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "نَامْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "نَامِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "نَامُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});