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
import { It } from "@aczwink/acts-util-test";
import { ConjugationTest, _Legacy_RunActiveParticipleTest, _Legacy_RunConjugationTest } from "../../shared";
import { DialectType } from "../../../dist/Dialects";
import { LebaneseStem1Context } from "../../../dist/dialects/lebanese/LebaneseDialectMetadata";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 93

It("Stem1 Past:a Present:i", () => {
    const root = "و-ع-د";
    const stem = LebaneseStem1Context.PastA_PresentI;

    _Legacy_RunActiveParticipleTest(root, stem, "وَاعِد", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "وَعَدْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "وَعَدِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "وْعَدِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "وْعَدْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "وْعَدِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "وَعَدُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "وْعَدْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "وْعَدْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيُوعِدْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتُوعِدْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتُوعِدْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتُوعْدِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بُوعِدْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيُوعْدُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتُوعْدُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنُوعِدْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يُوعِدْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تُوعِدْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تُوعِدْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تُوعْدِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "أُوعِدْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يُوعْدُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تُوعْدُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نُوعِدْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "وْعَادْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "وْعِدِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "وْعِدُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});