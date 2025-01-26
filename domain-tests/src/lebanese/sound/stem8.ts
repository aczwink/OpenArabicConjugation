/**
 * OpenArabicConjugation
 * Copyright (C) 2024 Amir Czwink (amir130@hotmail.de)
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
import { ConjugationTest, RunActiveParticipleTest, RunConjugationTest } from "../../shared";
import { DialectType } from "arabdict-domain/dist/Conjugator";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 21

It("Stem 8", () => {
    const root = "ح-ف-ل";
    const stem = 8;

    RunActiveParticipleTest(root, stem, "مِحْتِفِلْ", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "حْتَفَلْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "حْتَفَلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "حْتَفَلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "حْتَفَلْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "حْتَفَلِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "حْتَفَلُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "حْتَفَلْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "حْتَفَلْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِحْتِفِلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِحْتِفِلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِحْتِفِلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِحْتِفْلِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِحْتِفِلْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِحْتِفْلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِحْتِفْلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِحْتِفِلْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِحْتِفِلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِحْتِفِلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِحْتِفِلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِحْتِفْلِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِحْتِفِلْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِحْتِفْلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِحْتِفْلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِحْتِفِلْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "حْتِفِلْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "حْتِفْلِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "حْتِفْلُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});