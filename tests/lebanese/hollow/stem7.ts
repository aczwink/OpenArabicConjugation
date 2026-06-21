/**
 * OpenArabicConjugation
 * Copyright (C) 2025-2026 Amir Czwink (amir130@hotmail.de)
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
import { ConjugationTest, RunActiveParticipleTest, RunConjugationTest, VerbTestData } from "../../shared";
import { DialectType } from "../../../dist/Dialects";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 89

It("Stem 7", () => {
    const verb: VerbTestData = {
        dialect: DialectType.Lebanese,
        rootRadicals: "ق-و-ل",
        stem: 7,
    };

    RunActiveParticipleTest(verb, "مِنْقَالْ");
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "نْقَالْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "نْقَالِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "نْقَالُوا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِنْقَالْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِنْقَالْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِنْقَالُوا" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِنْقَالْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِنْقَالْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِنْقَالُوا" },
    ];

    RunConjugationTest(verb, conjugations);

    //the following are actually missing in the source but have been generated based on the consistency of hollow verb conjugation together with https://www.aoi.uzh.ch/dandanat/en/Musterverb_45_vok
    const conjugations2: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "نْقِلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "نْقِلْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "نْقِلِتْ" },

        { tense: "perfect", numerus: "plural", person: "second", expected: "نْقِلْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "نْقِلْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِنْقَالْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِنْقَالِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِنْقَالْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِنْقَالُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِنْقَالْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِنْقَالْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِنْقَالِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِنْقَالْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِنْقَالُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِنْقَالْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "نْقَالْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "نْقَالِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "نْقَالُوا" },
    ];

    RunConjugationTest(verb, conjugations2);
});