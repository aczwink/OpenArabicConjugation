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

//Source: https://en.wiktionary.org/wiki/%D8%A3%D8%B9%D8%AF%D9%89#South_Levantine_Arabic

It("Stem 4", () => {
    const verb: VerbTestData = {
        dialect: DialectType.SouthLevantine,
        rootRadicals: "ع-د-و",
        stem: 4,
    };
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "أَعْدَى" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "أَعْدَتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "أَعْدَيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "أَعْدَيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "أَعْدَيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "أَعْدُو" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "أَعْدَيْتُو" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "أَعْدَيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِعْدِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِعْدِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِعْدِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِعْدِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بَعْدِي" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِعْدُو" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِعْدُو" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِعْدِي" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِعْدِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِعْدِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِعْدِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِعْدِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "أَعْدِي" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِعْدُو" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِعْدُو" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِعْدِي" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "اِعْدِي" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "اِعْدِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "اِعْدُو" },
    ];

    RunConjugationTest(verb, conjugations);
});