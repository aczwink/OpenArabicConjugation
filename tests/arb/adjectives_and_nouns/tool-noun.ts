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

//Sources: https://en.wikipedia.org/wiki/Arabic_nouns_and_adjectives#Tool_nouns

It("Tool noun assimilated", () => {
    const root = new VerbRoot("وزن");
    const verb = CreateVerb(DialectType.ModernStandardArabic, root, ModernStandardArabicStem1ParametersType.PastA_PresentI);
    const c = new Conjugator();

    const result = c.DeriveFromVerb(verb, TargetVerbBasedDerivationPatterns.ToolNouns);

    Expect(result.length).ToBe(1);
    ShouldEqual("مِيزَان", result[0], () => []);
});

It("Tool noun feminine", () => {
    const root = new VerbRoot("طرق");
    const verb = CreateVerb(DialectType.ModernStandardArabic, root, ModernStandardArabicStem1ParametersType.PastA_PresentU);
    const c = new Conjugator();

    const result = c.DeriveFromVerb(verb, TargetVerbBasedDerivationPatterns.ToolNouns);

    Expect(result.length).ToBe(2);
    ShouldEqual("مِطْرَقَة", result[0], () => []);
});

It("Tool noun modern", () => {
    const root = new VerbRoot("دوس");
    const verb = CreateVerb(DialectType.ModernStandardArabic, root, ModernStandardArabicStem1ParametersType.PastU_PresentU);
    const c = new Conjugator();

    const result = c.DeriveFromVerb(verb, TargetVerbBasedDerivationPatterns.ToolNouns);

    Expect(result.length).ToBe(2);
    ShouldEqual("دَوَّاسَة", result[1], () => []);
});