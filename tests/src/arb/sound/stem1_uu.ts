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
import { RunVerbalNounPatternTest } from "../../shared";
import { ModernStandardArabicStem1ContextType } from "openarabicconjugation/dist/DialectsMetadata";

It("Stem 1 past:u, present:u", () => {
    const stem = ModernStandardArabicStem1ContextType.RegularOrHollow_PastU_PresentU;

    RunVerbalNounPatternTest(stem, [
        { rootRadicals: "ب-ع-د", expected: "بُعْد" }, //Source: https://en.wiktionary.org/wiki/%D8%A8%D8%B9%D8%AF
        { rootRadicals: "ج-م-ل", expected: "جَمَال" }, //Source: https://en.wiktionary.org/wiki/%D8%AC%D9%85%D9%84
        { rootRadicals: "ك-ر-م", expected: "كَرَم" }, //Source: https://en.wiktionary.org/wiki/%D9%83%D8%B1%D9%85
        { rootRadicals: "ك-ث-ر", expected: "كَثْرَة" }, //Source: https://en.wiktionary.org/wiki/%D9%83%D8%AB%D8%B1
    ]);
});