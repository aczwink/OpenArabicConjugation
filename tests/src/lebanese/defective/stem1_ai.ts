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
//Table: 39

It("Lebanese: Stem1 Past:a Present:i", () => {
    const root = "ر-م-ي";
    const stem = LebaneseStem1Context.PastA_PresentI;

    RunActiveParticipleTest(root, stem, "رَامِي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "رَمَى" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "رَمِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "رَمَيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "رَمَيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "رَمَيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "رَمُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "رَمَيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "رَمَيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِرْمِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِرْمِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِرْمِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِرْمِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِرْمِي" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِرْمُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِرْمُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِرْمِي" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِرْمِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِرْمِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِرْمِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِرْمِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِرْمِي" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِرْمُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِرْمُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِرْمِي" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "رْمِي" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "رْمِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "رْمُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});