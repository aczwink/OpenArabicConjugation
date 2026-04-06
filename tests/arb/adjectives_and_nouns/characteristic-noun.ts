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
import { Expect, It } from "@aczwink/acts-util-test";
import { Conjugator, TargetVerbBasedDerivationPatterns } from "../../../dist/Conjugator";
import { CreateVerb } from "../../../dist/Verb";
import { DialectType } from "../../../dist/Dialects";
import { ModernStandardArabicStem1ParametersType } from "../../../dist/dialects/msa/conjugation/r2tashkil";
import { VerbRoot } from "../../../dist/VerbRoot";
import { ShouldEqual } from "../../shared";

//Sources: https://en.wikipedia.org/wiki/Arabic_nouns_and_adjectives#Occupational_and_characteristic_nouns
//https://en.wiktionary.org/wiki/Appendix:Arabic_nominals#Characteristic_nouns_and_adjectives

It("Characteristic noun", () => {
    const root = new VerbRoot("كذب");
    const verb = CreateVerb(DialectType.ModernStandardArabic, root, ModernStandardArabicStem1ParametersType.PastA_PresentI);
    const c = new Conjugator();

    const result = c.DeriveFromVerb(verb, TargetVerbBasedDerivationPatterns.CharacteristicNoun);

    Expect(result.length).ToBe(1);
    ShouldEqual("كَذَّاب", result[0], () => []);
});