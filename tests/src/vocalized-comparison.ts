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
import { Expect, It } from "acts-util-test";
import { CompareVocalized, ParseVocalizedText } from "openarabicconjugation/dist/Vocalization";

function Cmp(a: string, b: string)
{
    return CompareVocalized(ParseVocalizedText(a), ParseVocalizedText(b));
}

It("With shadda match should be higher than without", () => {
    const with_shadda = "تحدّث";

    const stem1_present_2nd_person = "تَحْدُثُ";
    const stem5 = "تَحَدَّثَ";

    const r1 = Cmp(with_shadda, stem1_present_2nd_person);
    const r2 = Cmp(with_shadda, stem5);

    Expect(r1).ToBeLessThan(r2);
});