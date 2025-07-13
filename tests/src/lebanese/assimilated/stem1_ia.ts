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
import { LebaneseStem1Context } from "openarabicconjugation/dist/dialects/lebanese/LebaneseDialectMetadata";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 92

It("Stem1 Past:i Present:a", () => {
    const root = "و-ص-ل";
    const stem = LebaneseStem1Context.PastI_PresentA;

    RunActiveParticipleTest(root, stem, "وَاصِل", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "وُصِلْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "وُصْلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "وْصُلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "وْصُلْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "وْصُلِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "وُصْلُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "وْصُلْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "وْصُلْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيُوصَلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتُوصَلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتُوصَلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتُوصَلِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بُوصَلْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيُوصَلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتُوصَلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنُوصَلْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يُوصَلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تُوصَلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تُوصَلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تُوصَلِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "أُوصَلْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يُوصَلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تُوصَلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نُوصَلْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "وْصَالْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "وْصَلِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "وْصَلُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});