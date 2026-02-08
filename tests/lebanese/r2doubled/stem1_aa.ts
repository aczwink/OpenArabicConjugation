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
import { It } from "@aczwink/acts-util-test";
import { ConjugationTest, _Legacy_RunActiveParticipleTest, _Legacy_RunConjugationTest } from "../../shared";
import { DialectType } from "../../../dist/Dialects";
import { LebaneseStem1Context } from "../../../dist/dialects/lebanese/LebaneseDialectMetadata";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 55

It("Stem 1 Past:a, Present:a", () => {
    const root = "ض-ل-ل";
    const stem = LebaneseStem1Context.PastA_PresentA;

    _Legacy_RunActiveParticipleTest(root, stem, "ضَالِل", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "ضَلّْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "ضَلِّتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "ضَلَّيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "ضَلَّيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "ضَلَّيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "ضَلُّوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "ضَلَّيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "ضَلَّيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِيضَلّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتْضَلّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتْضَلّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتْضَلِّي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْضَلّْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِيضَلُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتْضَلُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنْضَلّْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْضَلّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْضَلّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْضَلّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْضَلِّي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "ضَلّْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْضَلُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْضَلُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْضَلّْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "ضَلّْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "ضَلِّي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "ضَلُّوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});