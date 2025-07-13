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
//Table: 94

It("Stem1 Past:ii Present:a", () => {
    const root = "و-ق-ع";
    const stem = LebaneseStem1Context.AssimilatedPastII_PresentA;

    RunActiveParticipleTest(root, stem, "وَاقِع", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "وِقِعْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "وِقْعِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "وْقِعِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "وْقِعْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "وْقِعِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "وِقْعُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "وْقِعْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "وْقِعْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيُوقَعْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتُوقَعْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتُوقَعْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتُوقَعِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بُوقَعْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيُوقَعُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتُوقَعُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنُوقَعْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يُوقَعْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تُوقَعْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تُوقَعْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تُوقَعِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "أُوقَعْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يُوقَعُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تُوقَعُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نُوقَعْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "وْقَاعْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "وْقَعِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "وْقَعُوا" },
    ];

    _Legacy_RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});