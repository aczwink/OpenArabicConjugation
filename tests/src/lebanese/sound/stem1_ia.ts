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
//Table: 24

It("Stem1 Past:i Present:a", () => {
    const root = "ح-ض-ر";
    const stem = LebaneseStem1Context.PastI_PresentA;

    _Legacy_RunActiveParticipleTest(root, stem, "حَاضِر", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "حِضِرْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "حِضْرِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "حْضِرِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "حْضِرْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "حْضِرِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "حِضْرُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "حْضِرْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "حْضِرْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِحْضَرْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِحْضَرْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِحْضَرْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِحْضَرِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِحْضَرْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِحْضَرُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِحْضَرُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِحْضَرْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِحْضَرْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِحْضَرْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِحْضَرْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِحْضَرِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِحْضَرْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِحْضَرُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِحْضَرُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِحْضَرْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "حْضَارْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "حْضَرِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "حْضَرُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});