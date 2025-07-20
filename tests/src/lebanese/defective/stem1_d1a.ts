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
//Table: 61

It("Lebanese: Stem1 Past:a Present:i Present_prefix:a", () => {
    const root = "ع-ط-و";
    const stem = LebaneseStem1Context.DefectiveType1WithPrefixA;

    _Legacy_RunActiveParticipleTest(root, stem, "عَاطِي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "عَطَى" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "عَطِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "عَطَيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "عَطَيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "عَطَيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "عَطُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "عَطَيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "عَطَيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيَعْطِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتَعْطِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتَعْطِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتَعْطِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بَعْطِي" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيَعْطُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتَعْطُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنَعْطِي" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يَعْطِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تَعْطِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تَعْطِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تَعْطِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "أَعْطِي" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يَعْطُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تَعْطُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نَعْطِي" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "عْطِي" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "عْطِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "عْطُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});