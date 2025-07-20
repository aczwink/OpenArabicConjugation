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

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 85

It("Stem 7", () => {
    const root = "ب-س-ط";
    const stem = 7;

    _Legacy_RunActiveParticipleTest(root, stem, "مَبْسُوط", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "نْبَسَطْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "نْبَسَطِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "نْبَسَطِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "نْبَسَطْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "نْبَسَطِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "نْبَسَطُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "نْبَسَطْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "نْبَسَطْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيُنْبُسِطْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتُنْبُسِطْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتُنْبُسِطْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتُنْبُسْطِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بُنْبُسِطْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيُنْبُسْطُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتُنْبُسْطُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنُنْبُسِطْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يُنْبُسِطْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تُنْبُسِطْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تُنْبُسِطْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تُنْبُسْطِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "أُنْبُسِطْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يُنْبُسْطُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تُنْبُسْطُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نُنْبُسِطْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "نْبُسِطْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "نْبُسْطِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "نْبُسْطُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});