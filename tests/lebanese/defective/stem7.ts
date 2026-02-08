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
//Table: 90

It("Stem 7", () => {
    const root = "ل-غ-و";
    const stem = 7;

    _Legacy_RunActiveParticipleTest(root, stem, "مِلْغِي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "نْلَغَى" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "نْلَغِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "نْلَغَيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "نْلَغَيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "نْلَغَيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "نْلَغُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "نْلَغَيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "نْلَغَيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِنْلِغِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِنْلِغِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِنْلِغِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِنْلِغِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِنْلِغِي" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِنْلِغُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِنْلِغُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِنْلِغِي" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِنْلِغِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِنْلِغِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِنْلِغِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِنْلِغِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِنْلِغِي" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِنْلِغُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِنْلِغُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِنْلِغِي" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);

    throw new Error("TODO: imperative is missing");
});