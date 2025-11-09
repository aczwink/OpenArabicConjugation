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
import { ConjugationTest, RunConjugationTest, VerbTestData } from "../../shared";
import { DialectType } from "openarabicconjugation/dist/Dialects";

//Source: https://en.wiktionary.org/wiki/%D8%A7%D9%86%D9%82%D8%A7%D9%84

It("Stem 7", () => {
    const verb: VerbTestData = {
        dialect: DialectType.SouthLevantine,
        rootRadicals: "ق-و-ل",
        stem: 7,
    };
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "اِنْقَالْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "اِنْقَالَتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "اِنْقَلْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "اِنْقَلْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "اِنْقَلْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "اِنْقَالُو" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "اِنْقَلْتُو" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "اِنْقَلْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِنْقَالْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِنْقَالْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِنْقَالْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِنْقَالِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بَنْقَالْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِنْقَالُو" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِنْقَالُو" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِنْقَالْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِنْقَالْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِنْقَالْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِنْقَالْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِنْقَالِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "أَنْقَالْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِنْقَالُو" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِنْقَالُو" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِنْقَالْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "اِنْقَالْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "اِنْقَالِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "اِنْقَالُو" },
    ];

    RunConjugationTest(verb, conjugations);
});