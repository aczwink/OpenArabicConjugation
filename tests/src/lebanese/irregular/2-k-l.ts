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
//Table: 4

It("أكل", () => {
    const root = "ء-ك-ل";
    const stem = LebaneseStem1Context.PastA_PresentU;

    _Legacy_RunActiveParticipleTest(root, stem, "آكِل", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "أَكَلْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "أَكَلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "أَكَلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "أَكَلْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "أَكَلِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "أَكَلُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "أَكَلْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "أَكَلْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيَاكُلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتَاكُلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتَاكُلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتَاكْلِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بَاكُلْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيَاكْلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتَاكْلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنَاكُلْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يَاكُلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تَاكُلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تَاكُلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تَاكْلِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "آكُلْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يَاكْلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تَاكْلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نَاكُلْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "كُلْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "كِلِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "كِلُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});