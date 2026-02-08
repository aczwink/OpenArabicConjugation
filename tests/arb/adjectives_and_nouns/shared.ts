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
import { Conjugator } from "../../../dist/Conjugator";
import { AdjectiveOrNounState, Case, Gender, Numerus } from "../../../dist/Definitions";
import { DialectType } from "../../../dist/Dialects";
import { ParseVocalizedText } from "../../../dist/Vocalization";
import { ShouldEqual } from "../../shared";
import { NumerusToString } from "../../../dist/Util";
import { TargetAdjectiveNounDerivation } from "../../../dist/DialectConjugator";

export interface NounDeclensionTest
{
    case: "accusative" | "genitive" | "informal" | "nominative";
    expected: string;
    state: "construct" | "definite" | "indefinite";
}

export interface NounTestData
{
    base: string;
    gender: Gender;
    numerus: Numerus;
}

function MapCase(entry: NounDeclensionTest): Case
{
    switch(entry.case)
    {
        case "accusative":
            return Case.Accusative;
        case "genitive":
            return Case.Genitive;
        case "informal":
            return Case.Informal;
        case "nominative":
            return Case.Nominative;
    }
}

function MapDerivation(derivation: "dual" | "feminine" | "plural"): TargetAdjectiveNounDerivation
{
    switch(derivation)
    {
        case "dual":
            return TargetAdjectiveNounDerivation.DeriveDualSameGender;
        case "feminine":
            return TargetAdjectiveNounDerivation.DeriveFeminineSingular;
        case "plural":
            return TargetAdjectiveNounDerivation.DerivePluralSameGender;
    }
}

function MapState(entry: NounDeclensionTest): AdjectiveOrNounState
{
    switch(entry.state)
    {
        case "construct":
            return AdjectiveOrNounState.Construct;
        case "definite":
            return AdjectiveOrNounState.Definite;
        case "indefinite":
            return AdjectiveOrNounState.Indefinite;
    }
}

export function RunDerivationTest(singular: NounTestData, derivation: "dual" | "feminine" | "plural", expected: string)
{
    const c = new Conjugator();

    const baseParsed = ParseVocalizedText(singular.base);

    const got = c.DeriveSoundAdjectiveOrNoun(baseParsed, singular.gender, MapDerivation(derivation), DialectType.ModernStandardArabic);
    ShouldEqual(expected, got, () => []);
}

export function RunNounDeclensionTest(noun: NounTestData, declensions: NounDeclensionTest[])
{
    const c = new Conjugator();

    const baseParsed = ParseVocalizedText(noun.base);
    for (const entry of declensions)
    {
        const declined = c.DeclineAdjectiveOrNoun({
            gender: noun.gender,
            numerus: noun.numerus,
            vocalized: baseParsed,
        }, {
            case: MapCase(entry),
            state: MapState(entry),
        }, DialectType.ModernStandardArabic);

        ShouldEqual(entry.expected, declined, () => [NumerusToString(noun.numerus), entry.case, entry.state]);
    }
}