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
//Table: 57

It("Stem1 Past:a Present:u PresentPrefix:i PresentR1:i Imperative:u", () => {
    const root = "ط-ل-ب";
    const stem = LebaneseStem1Context.RegularPastA_PresentIIUU;

    _Legacy_RunActiveParticipleTest(root, stem, "طَالِب", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "طَلَبْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "طَلَبِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "طَلَبِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "طَلَبْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "طَلَبِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "طَلَبُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "طَلَبْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "طَلَبْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِطْلُبْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِطْلُبْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِطْلُبْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِطِلْبِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِطْلُبْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِطِلْبُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِطِلْبُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِطْلُبْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِطْلُبْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِطْلُبْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِطْلُبْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِطِلْبِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِطْلُبْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِطِلْبُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِطِلْبُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِطْلُبْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "طْلُوبْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "طْلُبِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "طْلُبُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});