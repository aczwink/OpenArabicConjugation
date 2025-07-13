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
//Table: 67

It("Stem 1 defective", () => {
    const root = "ف-ر-ج-ي";
    const stem = LebaneseStem1Context.Quadrilateral;

    RunActiveParticipleTest(root, stem, "مْفَرْجِي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "فَرْجَى" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "فَرْجِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "فَرْجَيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "فَرْجَيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "فَرْجَيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "فَرْجُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "فَرْجَيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "فَرْجَيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِيفَرْجِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتْفَرْجِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتْفَرْجِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتْفَرْجِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْفَرْجِي" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِيفَرْجُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتْفَرْجُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنْفَرْجِي" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْفَرْجِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْفَرْجِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْفَرْجِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْفَرْجِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "فَرْجِي" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْفَرْجُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْفَرْجُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْفَرْجِي" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "فَرْجِي" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "فَرْجِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "فَرْجُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});