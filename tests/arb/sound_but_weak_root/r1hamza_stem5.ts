/**
 * OpenArabicConjugation
 * Copyright (C) 2026 Amir Czwink (amir130@hotmail.de)
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
import { It } from "@aczwink/acts-util-test";
import { DialectType } from "../../../dist/Dialects";
import { VerbTestData, RunConjugationTest, RunParticipleTest } from "../../shared";

//Sources: https://en.wiktionary.org/wiki/%D8%AA%D8%A3%D9%84%D9%82
//Passive generated from https://en.wiktionary.org/wiki/%D8%AA%D8%A3%D9%84%D9%82 by editing and adding the "pass" flag and saving the preview

It("R1:ء stem 5", () => {
    const verbData: VerbTestData = {
        rootRadicals: "ء-ل-ق",
        dialect: DialectType.ModernStandardArabic,
        stem: 5,
    };

    throw new Error("TODO: missing verbal noun");
    RunParticipleTest(verbData, "مُتَأَلِّق", "مُتَأَلَّق");

    RunConjugationTest(verbData, [
        //active past
        { voice: "active", expected: "تَأَلَّقَ", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَأَلَّقَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَأَلَّقْتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَأَلَّقْتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَأَلَّقْتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "تَأَلَّقَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَأَلَّقَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَأَلَّقْتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "تَأَلَّقُوا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَأَلَّقْنَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَأَلَّقْتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَأَلَّقْتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "تَأَلَّقْنَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //active indicative
        { voice: "active", expected: "يَتَأَلَّقُ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَأَلَّقُ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَأَلَّقُ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَأَلَّقِينَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "أَتَأَلَّقُ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يَتَأَلَّقَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَأَلَّقَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَأَلَّقَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يَتَأَلَّقُونَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "يَتَأَلَّقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَأَلَّقُونَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَتَأَلَّقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "نَتَأَلَّقُ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //active subjunctive
        { voice: "active", expected: "يَتَأَلَّقَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَأَلَّقَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَأَلَّقَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَأَلَّقِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "أَتَأَلَّقَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يَتَأَلَّقَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَأَلَّقَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَأَلَّقَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يَتَأَلَّقُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "يَتَأَلَّقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَأَلَّقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَتَأَلَّقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "نَتَأَلَّقَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //active jussive
        { voice: "active", expected: "يَتَأَلَّقْ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَأَلَّقْ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَأَلَّقْ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَأَلَّقِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "أَتَأَلَّقْ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يَتَأَلَّقَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَأَلَّقَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَأَلَّقَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يَتَأَلَّقُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "يَتَأَلَّقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَأَلَّقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَتَأَلَّقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "نَتَأَلَّقْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { voice: "active", expected: "تَأَلَّقْ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "imperative" },
        { voice: "active", expected: "تَأَلَّقِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "imperative" },

        { voice: "active", expected: "تَأَلَّقَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { voice: "active", expected: "تَأَلَّقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { voice: "active", expected: "تَأَلَّقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //passive past
        { voice: "passive", expected: "تُؤُلِّقَ", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُؤُلِّقَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُؤُلِّقْتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُؤُلِّقْتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُؤُلِّقْتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "passive", expected: "تُؤُلِّقَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُؤُلِّقَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُؤُلِّقْتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "passive", expected: "تُؤُلِّقُوا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُؤُلِّقْنَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُؤُلِّقْتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُؤُلِّقْتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "تُؤُلِّقْنَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //passive indicative
        { voice: "passive", expected: "يُتَأَلَّقُ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَأَلَّقُ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَأَلَّقُ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَأَلَّقِينَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "أُتَأَلَّقُ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "passive", expected: "يُتَأَلَّقَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَأَلَّقَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَأَلَّقَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "passive", expected: "يُتَأَلَّقُونَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "يُتَأَلَّقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَأَلَّقُونَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُتَأَلَّقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "نُتَأَلَّقُ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //passive subjunctive
        { voice: "passive", expected: "يُتَأَلَّقَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَأَلَّقَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَأَلَّقَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَأَلَّقِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُتَأَلَّقَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُتَأَلَّقَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَأَلَّقَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَأَلَّقَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُتَأَلَّقُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُتَأَلَّقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَأَلَّقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَأَلَّقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُتَأَلَّقَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //passive jussive
        { voice: "passive", expected: "يُتَأَلَّقْ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَأَلَّقْ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَأَلَّقْ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَأَلَّقِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُتَأَلَّقْ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُتَأَلَّقَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَأَلَّقَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَأَلَّقَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُتَأَلَّقُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُتَأَلَّقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَأَلَّقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَأَلَّقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُتَأَلَّقْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ]);
});