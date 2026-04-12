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

//Sources: https://en.wikipedia.org/wiki/Arabic_nouns_and_adjectives#Nouns_of_place
//https://en.wiktionary.org/wiki/Appendix:Arabic_nominals#Nouns_of_place

It("Nouns of place stem 1 maf3al", () => {
    const root = new VerbRoot("كتب");
    const verb = CreateVerb(DialectType.ModernStandardArabic, root, ModernStandardArabicStem1ParametersType.PastA_PresentU);
    const c = new Conjugator();

    const result = c.DeriveFromVerb(verb, TargetVerbBasedDerivationPatterns.NounOfPlace);

    Expect(result.length).ToBe(3);
    ShouldEqual("مَكْتَب", result[0], () => []);
});

It("Nouns of place stem 1 maf3ala", () => {
    const root = new VerbRoot("زرع");
    const verb = CreateVerb(DialectType.ModernStandardArabic, root, ModernStandardArabicStem1ParametersType.PastA_PresentA);
    const c = new Conjugator();

    const result = c.DeriveFromVerb(verb, TargetVerbBasedDerivationPatterns.NounOfPlace);

    Expect(result.length).ToBe(3);
    ShouldEqual("مَزْرَعَة", result[1], () => []);
});

It("Nouns of place stem 1 maf3il", () => {
    const root = new VerbRoot("جلس");
    const verb = CreateVerb(DialectType.ModernStandardArabic, root, ModernStandardArabicStem1ParametersType.PastA_PresentI);
    const c = new Conjugator();

    const result = c.DeriveFromVerb(verb, TargetVerbBasedDerivationPatterns.NounOfPlace);

    Expect(result.length).ToBe(3);
    ShouldEqual("مَجْلِس", result[2], () => []);
});

It("Noun of place stem > 1", () => {
    const root = new VerbRoot("فرق");
    const verb = CreateVerb(DialectType.ModernStandardArabic, root, 8);
    const c = new Conjugator();

    const result = c.DeriveFromVerb(verb, TargetVerbBasedDerivationPatterns.NounOfPlace);

    Expect(result.length).ToBe(2);
    ShouldEqual("مُفْتَرَق", result[0], () => []);
});

It("Noun of place stem > 1 female", () => {
    const root = new VerbRoot("عمر");
    const verb = CreateVerb(DialectType.ModernStandardArabic, root, 10);
    const c = new Conjugator();

    const result = c.DeriveFromVerb(verb, TargetVerbBasedDerivationPatterns.NounOfPlace);

    Expect(result.length).ToBe(2);
    ShouldEqual("مُسْتَعْمَرَة", result[1], () => []);
});