/**
 * OpenArabicConjugation
 * Copyright (C) 2024-2025 Amir Czwink (amir130@hotmail.de)
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
//Table: 77

It("أمر", () => {
    const root = "ء-م-ر";
    const stem = LebaneseStem1Context.PastA_PresentU;

    _Legacy_RunActiveParticipleTest(root, stem, "آمِر", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "أَمَرْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "أَمَرِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "أَمَرِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "أَمَرْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "أَمَرِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "أَمَرُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "أَمَرْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "أَمَرْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيُؤْمُرْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتُؤْمُرْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتُؤْمُرْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتُؤْمْرِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بُؤْمُرْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيُؤْمْرُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتُؤْمْرُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنُؤْمُرْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يُؤْمُرْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تُؤْمُرْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تُؤْمُرْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تُؤْمْرِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "أُؤْمُرْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يُؤْمْرُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تُؤْمْرُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نُؤْمُرْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "أْمُورْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "أْمُرِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "أْمُرُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});