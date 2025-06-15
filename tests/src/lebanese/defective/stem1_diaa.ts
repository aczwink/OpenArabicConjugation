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
//Table: 86
//Modifications: Alef Maksura instead of the Alef as suffix

It("Past:i Present:a Imperative:a", () => {
    const root = "ن-س-ي";
    const stem = LebaneseStem1Context.DefectiveWithImperativeA;

    RunActiveParticipleTest(root, stem, "نَاسِي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "نِسِي" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "نِسْيِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "نْسِيتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "نْسِيتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "نْسِيتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "نِسْيُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "نْسِيتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "نْسِينَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِنْسَى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِنْسَى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِنْسَى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِنْسِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِنْسَى" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِنْسُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِنْسُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِنْسَى" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِنْسَى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِنْسَى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِنْسَى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِنْسِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِنْسَى" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِنْسُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِنْسُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِنْسَى" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "نْسَى" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "نْسِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "نْسُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});