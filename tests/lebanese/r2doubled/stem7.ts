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

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 87

It("Stem 7", () => {
    const root = "ض-م-م";
    const stem = 7;

    _Legacy_RunActiveParticipleTest(root, stem, "مِنْضَمّْ", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "نْضَمّْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "نْضَمِّتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "نْضَمَّيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "نْضَمَّيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "نْضَمَّيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "نْضَمُّوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "نْضَمَّيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "نْضَمَّيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِنْضَمّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِنْضَمّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِنْضَمّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِنْضَمِّي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِنْضَمّْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِنْضَمُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِنْضَمُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِنْضَمّْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِنْضَمّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِنْضَمّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِنْضَمّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِنْضَمِّي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِنْضَمّْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِنْضَمُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِنْضَمُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِنْضَمّْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "نْضَمّْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "نْضَمِّي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "نْضَمُّوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});