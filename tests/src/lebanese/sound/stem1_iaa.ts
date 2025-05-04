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
//Table: 62

It("Stem1 Past:i Present:a Present_prefix:a", () => {
    const root = "ع-م-ل";
    const stem = LebaneseStem1Context.RegularPastI_PresentAA;

    RunActiveParticipleTest(root, stem, "عَامِل", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "عِمِلْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "عِمْلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "عْمِلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "عْمِلْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "عْمِلِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "عِمْلُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "عْمِلْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "عْمِلْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيَعْمِلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتَعْمِلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتَعْمِلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتَعْمْلِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بَعْمِلْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيَعْمْلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتَعْمْلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنَعْمِلْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يَعْمِلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تَعْمِلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تَعْمِلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تَعْمْلِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "أَعْمِلْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يَعْمْلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تَعْمْلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نَعْمِلْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "عْمُولْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "عْمِلِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "عْمِلُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});