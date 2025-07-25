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
import { DialectType } from "openarabicconjugation/dist/Dialects";
import { VerbTestData, RunSoundEqualityTest, RunConjugationTest, RunVerbalNounTest, RunActiveParticipleTest } from "../../shared";

//Sources: https://en.wikipedia.org/wiki/Arabic_verbs#Assimilated_(first-weak)_verbs
//https://en.wiktionary.org/wiki/%D8%AA%D9%88%D8%AA%D8%B1
//Passive generated from https://en.wiktionary.org/wiki/%D8%AA%D9%88%D8%AA%D8%B1 by editing and adding the "pass" flag and saving the preview

It("R1:و stem 5", () => {
    const verbData: VerbTestData = {
        rootRadicals: "و-ت-ر",
        dialect: DialectType.ModernStandardArabic,
        stem: 5,
    };

    RunSoundEqualityTest(verbData);

    RunVerbalNounTest(verbData.rootRadicals, verbData.stem, "تَوَتُّر");
    RunActiveParticipleTest(verbData, "مُتَوَتِّر");

    RunConjugationTest(verbData, [
        //active past
        { voice: "active", expected: "تَوَتَّرَ", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَوَتَّرَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَوَتَّرْتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَوَتَّرْتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَوَتَّرْتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "تَوَتَّرَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَوَتَّرَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَوَتَّرْتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "تَوَتَّرُوا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَوَتَّرْنَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَوَتَّرْتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَوَتَّرْتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَوَتَّرْنَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //active indicative
        { voice: "active", expected: "يَتَوَتَّرُ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَوَتَّرُ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَوَتَّرُ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَوَتَّرِينَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "أَتَوَتَّرُ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يَتَوَتَّرَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَوَتَّرَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَوَتَّرَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يَتَوَتَّرُونَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "يَتَوَتَّرْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَوَتَّرُونَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَوَتَّرْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "نَتَوَتَّرُ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //active subjunctive
        { voice: "active", expected: "يَتَوَتَّرَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَوَتَّرَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَوَتَّرَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَوَتَّرِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "أَتَوَتَّرَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يَتَوَتَّرَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَوَتَّرَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَوَتَّرَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يَتَوَتَّرُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "يَتَوَتَّرْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَوَتَّرُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَوَتَّرْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "نَتَوَتَّرَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //active jussive
        { voice: "active", expected: "يَتَوَتَّرْ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَوَتَّرْ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَوَتَّرْ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَوَتَّرِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "أَتَوَتَّرْ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يَتَوَتَّرَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَوَتَّرَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَوَتَّرَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يَتَوَتَّرُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "يَتَوَتَّرْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَوَتَّرُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَوَتَّرْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "نَتَوَتَّرْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { voice: "active", expected: "تَوَتَّرْ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "imperative" },
        { voice: "active", expected: "تَوَتَّرِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "imperative" },

        { voice: "active", expected: "تَوَتَّرَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { voice: "active", expected: "تَوَتَّرُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { voice: "active", expected: "تَوَتَّرْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //passive past
        { voice: "passive", expected: "تُوُتِّرَ", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُوُتِّرَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُوُتِّرْتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُوُتِّرْتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُوُتِّرْتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "passive", expected: "تُوُتِّرَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُوُتِّرَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُوُتِّرْتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "passive", expected: "تُوُتِّرُوا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُوُتِّرْنَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُوُتِّرْتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُوُتِّرْتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُوُتِّرْنَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //passive indicative
        { voice: "passive", expected: "يُتَوَتَّرُ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَوَتَّرُ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَوَتَّرُ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَوَتَّرِينَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "أُتَوَتَّرُ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "passive", expected: "يُتَوَتَّرَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَوَتَّرَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَوَتَّرَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "passive", expected: "يُتَوَتَّرُونَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "يُتَوَتَّرْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَوَتَّرُونَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَوَتَّرْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "نُتَوَتَّرُ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //passive subjunctive
        { voice: "passive", expected: "يُتَوَتَّرَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَوَتَّرَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَوَتَّرَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَوَتَّرِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُتَوَتَّرَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُتَوَتَّرَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَوَتَّرَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَوَتَّرَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُتَوَتَّرُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُتَوَتَّرْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَوَتَّرُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَوَتَّرْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُتَوَتَّرَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //passive jussive
        { voice: "passive", expected: "يُتَوَتَّرْ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَوَتَّرْ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَوَتَّرْ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَوَتَّرِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُتَوَتَّرْ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُتَوَتَّرَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَوَتَّرَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَوَتَّرَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُتَوَتَّرُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُتَوَتَّرْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَوَتَّرُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَوَتَّرْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُتَوَتَّرْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ]);
});