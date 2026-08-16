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
import { RunPluralTest } from "./shared";

It("Plural patterns", () => {
    const patterns = [
        { singular: "أَب", plural: "آبَاء" },
        { singular: "أَثَر", plural: "آثَار" },
        { singular: "أَجْر", plural: "أُجُور" },
        { singular: "أُذُن", plural: "آذَان" },
        { singular: "مَئْذَنَة", plural: "مَآذِن" },
        { singular: "أَرْض", plural: "أَرَاضٍ" },
        { singular: "مَشْعَر", plural: "مَشَاعِر" },
    ];

    for (const pattern of patterns)
    {
        RunPluralTest(pattern.singular, pattern.plural);
    }
});