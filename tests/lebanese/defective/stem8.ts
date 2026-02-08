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
//Table: 49

It("Stem 8", () => {
    const root = "ش-ر-ي";
    const stem = 8;

    _Legacy_RunActiveParticipleTest(root, stem, "مِشْتْرِي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "شْتَرَى" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "شْتَرِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "شْتَرَيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "شْتَرَيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "شْتَرَيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "شْتَرُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "شْتَرَيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "شْتَرَيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِشْتْرِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِشْتْرِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِشْتْرِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِشْتْرِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِشْتْرِي" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِشْتْرُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِشْتْرُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِشْتْرِي" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِشْتْرِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِشْتْرِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِشْتْرِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِشْتْرِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِشْتْرِي" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِشْتْرُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِشْتْرُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِشْتْرِي" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "شْتِرِي" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "شْتِرِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "شْتِرُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});