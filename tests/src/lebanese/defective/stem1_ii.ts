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
//Table: 26

It("Lebanese: Stem1 Past:i Present:i", () => {
    const root = "ح-ك-ي";
    const stem = LebaneseStem1Context.PastI_PresentI;

    _Legacy_RunActiveParticipleTest(root, stem, "حَاكِي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "حِكِي" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "حِكْيِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "حْكِيتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "حْكِيتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "حْكِيتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "حِكْيُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "حْكِيتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "حْكِينَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِحْكِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِحْكِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِحْكِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِحْكِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِحْكِي" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِحْكُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِحْكُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِحْكِي" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِحْكِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِحْكِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِحْكِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِحْكِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِحْكِي" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِحْكُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِحْكُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِحْكِي" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "حْكِي" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "حْكِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "حْكُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});