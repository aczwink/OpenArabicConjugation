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

It("Stem 2", () => {
    RunVerbalNounPatternTest(2, [
        { expected: "تَقْلِيل", rootRadicals: "ق-ل-ل" }, //Source: https://en.wiktionary.org/wiki/%D9%83%D8%B1%D8%B1#Arabic
        { expected: "تَكْرَار", rootRadicals: "ك-ر-ر" }, //Source: https://en.wiktionary.org/wiki/%D9%83%D8%B1%D8%B1#Arabic
    ]);
});