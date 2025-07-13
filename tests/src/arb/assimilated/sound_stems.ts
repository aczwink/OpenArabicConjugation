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
import { VerbTestData, RunSoundEqualityTest } from "../../shared";

//Source: https://en.wikipedia.org/wiki/Arabic_verbs#Assimilated_(first-weak)_verbs

It("Sound stems", () => {
    const verbData: VerbTestData = {
        rootRadicals: "و-د-ع",
        dialect: DialectType.ModernStandardArabic,
        stem: 2,
    };

    RunSoundEqualityTest(verbData);
});