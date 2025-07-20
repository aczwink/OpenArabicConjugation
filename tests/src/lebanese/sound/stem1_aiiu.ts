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
import { ConjugationTest, _Legacy_RunActiveParticipleTest, _Legacy_RunConjugationTest } from "../../shared";
import { DialectType } from "openarabicconjugation/dist/Dialects";
import { LebaneseStem1Context } from "openarabicconjugation/dist/dialects/lebanese/LebaneseDialectMetadata";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 31

It("Stem1 Past:a Present:u PresentPrefix:i PresentR1:i", () => {
    const root = "د-ر-س";
    const stem = LebaneseStem1Context.RegularPastA_PresentIIU;

    _Legacy_RunActiveParticipleTest(root, stem, "دَارِس", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "دَرَسْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "دَرَسِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "دَرَسِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "دَرَسْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "دَرَسِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "دَرَسُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "دَرَسْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "دَرَسْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِدْرُسْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِدْرُسْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِدْرُسْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِدِرْسِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِدْرُسْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِدِرْسُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِدِرْسُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِدْرُسْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِدْرُسْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِدْرُسْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِدْرُسْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِدِرْسِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِدْرُسْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِدِرْسُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِدِرْسُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِدْرُسْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "دْرُوسْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "دْرِسِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "دْرِسُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});