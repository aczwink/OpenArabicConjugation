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
//Table: 34

It("رَاحْ", () => {
    const root = "ر-و-ح";
    const stem = LebaneseStem1Context.PastI_PresentU;

    RunActiveParticipleTest(root, stem, "رَايِح", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "رَاحْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "رَاحِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "رِحِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "رِحْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "رِحِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "رَاحُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "رِحْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "رِحْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِيرُوحْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتْرُوحْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتْرُوحْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتْرُوحِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْرُوحْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِيرُوحُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتْرُوحُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنْرُوحْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْرُوحْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْرُوحْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْرُوحْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْرُوحِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "رُوحْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْرُوحُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْرُوحُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْرُوحْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "رُوحْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "رُوحِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "رُوحُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});