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
import { ConjugationTest, _Legacy_RunActiveParticipleTest, _Legacy_RunConjugationTest } from "../../shared";
import { DialectType } from "openarabicconjugation/dist/Dialects";
import { LebaneseStem1Context } from "openarabicconjugation/dist/dialects/lebanese/LebaneseDialectMetadata";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 80

It("Stem1 Past:i Present:u", () => {
    const root = "ل-ب-س";
    const stem = LebaneseStem1Context.PastI_PresentU;

    _Legacy_RunActiveParticipleTest(root, stem, "لَابِس", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "لِبِسْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "لِبْسِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "لْبِسِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "لْبِسْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "لْبِسِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "لِبْسُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "لْبِسْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "لْبِسْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِلْبُسْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِلْبُسْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِلْبُسْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِلْبْسِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِلْبُسْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِلْبْسُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِلْبْسُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِلْبُسْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِلْبُسْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِلْبُسْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِلْبُسْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِلْبْسِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِلْبُسْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِلْبْسُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِلْبْسُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِلْبُسْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "لْبُوسْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "لْبِسِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "لْبِسُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});