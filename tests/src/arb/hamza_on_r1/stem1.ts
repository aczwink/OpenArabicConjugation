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

It("Stem 1", () => {
    RunVerbalNounPatternTest("uu", [
        { rootRadicals: "ء-د-ب", expected: "أَدَب" }, //Source: https://ejtaal.net/aa/#hw4=24
        { rootRadicals: "ء-م-ر", expected: "إِمَارَة" }, //Source: https://ejtaal.net/aa/#hw4=24
        { rootRadicals: "ء-م-ن", expected: "أَمَانَة" }, //Source: https://en.wiktionary.org/wiki/%D8%A3%D9%85%D9%86#Arabic
    ]);
});