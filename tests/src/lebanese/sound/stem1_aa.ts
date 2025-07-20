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
//Table: 32

It("Stem1 Past:a Present:a", () => {
    const root = "د-ف-ع";
    const stem = LebaneseStem1Context.PastA_PresentA;

    _Legacy_RunActiveParticipleTest(root, stem, "دَافِع", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "دَفَعْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "دَفَعِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "دَفَعِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "دَفَعْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "دَفَعِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "دَفَعُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "دَفَعْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "دَفَعْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِدْفَعْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِدْفَعْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِدْفَعْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِدْفَعِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِدْفَعْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِدْفَعُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِدْفَعُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِدْفَعْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِدْفَعْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِدْفَعْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِدْفَعْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِدْفَعِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِدْفَعْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِدْفَعُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِدْفَعُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِدْفَعْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "دْفَاعْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "دْفَعِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "دْفَعُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});