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
import { ConjugationTest, RunActiveParticipleTest, RunConjugationTest } from "../../shared";
import { DialectType } from "openarabicconjugation/dist/Dialects";
import { LebaneseStem1Context } from "openarabicconjugation/dist/dialects/lebanese/LebaneseDialectMetadata";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 35

It("Stem1 Past:a Present:u PresentPrefix:u PresentR1:s", () => {
    const root = "ر-ب-ط";
    const stem = LebaneseStem1Context.RegularPastA_PresentUSU;

    RunActiveParticipleTest(root, stem, "رَابِط", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "رَبَطْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "رَبَطِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "رَبَطِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "رَبَطْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "رَبَطِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "رَبَطُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "رَبَطْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "رَبَطْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيُرْبُطْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتُرْبُطْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتُرْبُطْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتُرْبْطِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بُرْبُطْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيُرْبْطُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتُرْبْطُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنُرْبُطْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يُرْبُطْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تُرْبُطْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تُرْبُطْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تُرْبْطِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "أُرْبُطْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يُرْبْطُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تُرْبْطُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نُرْبُطْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "رْبُوطْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "رْبُطِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "رْبُطُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});