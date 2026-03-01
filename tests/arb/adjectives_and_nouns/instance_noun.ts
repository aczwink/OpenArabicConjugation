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
import { Gender, Numerus } from "../../../dist/Definitions";
import { NounTestData, RunDerivationTest } from "./shared";

//Sources: https://en.wikipedia.org/wiki/Arabic_nouns_and_adjectives#Instance_nouns
//https://en.wiktionary.org/wiki/%D9%86%D8%AF%D9%88#Arabic
//https://en.wiktionary.org/wiki/%D9%86%D8%AF%D9%88%D8%A9

It("Instance noun", () => {
    //instance noun is simply feminine of verbal noun

    const verbalNoun: NounTestData = {
        base: "نَدْو",
        gender: Gender.Male,
        numerus: Numerus.Singular,
        isDefinite: false
    };

    RunDerivationTest(verbalNoun, "feminine", "نَدْوَة");
});