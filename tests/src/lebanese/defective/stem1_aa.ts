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
import { LebaneseStem1Context } from "openarabicconjugation/dist/dialects/lebanese/LebaneseDialectMetadata";
import { VerbType } from "openarabicconjugation/dist/Definitions";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 74

It("Lebanese: Stem1 Past:a Present:a", () => {
    const root = "ق-ر-ء";
    const stem = LebaneseStem1Context.PastA_PresentA;
    const verbType = VerbType.Defective;

    RunActiveParticipleTest(root, stem, "قَارِي", DialectType.Lebanese, verbType);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "قَرَى" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "قَرِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "قَرَيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "قَرَيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "قَرَيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "قَرُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "قَرَيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "قَرَيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِقْرَى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِقْرَى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِقْرَى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِقْرِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِقْرَى" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِقْرُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِقْرُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِقْرَى" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِقْرَى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِقْرَى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِقْرَى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِقْرِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِقْرَى" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِقْرُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِقْرُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِقْرَى" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "قْرَى" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "قْرِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "قْرُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese, verbType);
});