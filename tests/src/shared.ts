/**
 * OpenArabicConjugation
 * Copyright (C) 2023-2025 Amir Czwink (amir130@hotmail.de)
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
import "acts-util-core";
import { Fail } from "acts-util-test";
import { Conjugator } from "openarabicconjugation/dist/Conjugator";
import { AdvancedStemNumber, ConjugationParams, Gender, GenderString, Mood, MoodString, Numerus, NumerusString, Person, PersonString, Stem1Context, Tashkil, Tense, TenseString, Voice, VoiceString } from "openarabicconjugation/dist/Definitions";
import { VerbRoot } from "openarabicconjugation/dist/VerbRoot";
import { GenderToString, MoodToString, NumerusToString, PersonToString, TenseToString, VoiceToString } from "openarabicconjugation/dist/Util";
import { DisplayVocalized, ParseVocalizedText, VocalizedToString } from "openarabicconjugation/dist/Vocalization";
import { Buckwalter } from "openarabicconjugation/dist/Transliteration";
import { DialectType } from "openarabicconjugation/dist/Dialects";
import { GetDialectMetadata } from "openarabicconjugation/dist/DialectsMetadata";

function CompareVocalized(a: DisplayVocalized[], b: DisplayVocalized[])
{
    //comparison is of strings is non trivial because the position of the shadda can be before or after the primary tashkil, also we have the emphasis optional field
    if(a.length !== b.length)
        return false;

    for (let i = 0; i < a.length; i++)
    {
        if(a[i].letter !== b[i].letter)
            return false;
        if(a[i].shadda !== b[i].shadda)
            return false;
        if(a[i].tashkil !== b[i].tashkil)
            return false;
    }

    return true;
}

function VocalizedTostring(vocalized: DisplayVocalized[])
{
    const str = vocalized.Values().Map(VocalizedToString).Join("");
    return str;
}

function Test(expected: string[], got: DisplayVocalized[], params: ConjugationParams)
{
    const gotStr = VocalizedTostring(got);
    const anyExpected = expected.Values().Map(ex => CompareVocalized(ParseVocalizedText(ex), got)).AnyTrue();
    if(!anyExpected)
    {
        const stemData = (params.stem === 1) ? (params.stem + " (past:" + Buckwalter.TashkilToString(params.stem1Context._legacy_middleRadicalTashkil) + " present:" + Buckwalter.TashkilToString(params.stem1Context._legacy_middleRadicalTashkilPresent) + ")") : params.stem;
        const context = ["stem " + stemData, TenseToString(params.tense), VoiceToString(params.voice)];
        if(params.tense === Tense.Present)
            context.push(MoodToString(params.mood));
        context.push(NumerusToString(params.numerus), PersonToString(params.person), GenderToString(params.gender));
        const firstExpected = ParseVocalizedText(expected[0]);
        const buckwalterExpected = expected.Values().Map(ex => Buckwalter.ToString(ParseVocalizedText(ex)));
        Fail("expected: " + expected.join(", ") + " / " + buckwalterExpected.Join(", ") + " got: " + gotStr + " / " + Buckwalter.ToString(got) + " " + context.join(" "));
    }
}

function TestParticiple(expected: string, got: DisplayVocalized[], voice: VoiceString)
{
    const a = ParseVocalizedText(expected);
    const gotStr = VocalizedTostring(got);
    if(!CompareVocalized(a, got))
        Fail("expected: " + expected + " / " + Buckwalter.ToString(a) + " got: " + gotStr + " / " + Buckwalter.ToString(got) + " voice: " + voice);
}

function ValidateStem1Context(ctx: Stem1Context, root: VerbRoot, dialectType: DialectType)
{
    const meta = GetDialectMetadata(dialectType);
    const choices = meta.GetStem1ContextChoices(root);
    for (const opt of choices.types)
    {
        if(ctx.type === opt)
            return;
    }
    throw new Error("Illegal stem 1 context");
}

export interface ConjugationTest
{
    expected: string | string[];
    gender?: GenderString;
    mood?: MoodString;
    numerus?: NumerusString;
    person?: PersonString;
    tense?: TenseString;
    voice?: VoiceString;
}
export function RunConjugationTest(rootRadicals: string, stem: AdvancedStemNumber | string, conjugations: ConjugationTest[], dialect: DialectType = DialectType.ModernStandardArabic)
{
    function MapMood(mood: MoodString)
    {
        switch(mood)
        {
            case "imperative":
                return Mood.Imperative;
            case "indicative":
                return Mood.Indicative;
            case "jussive":
                return Mood.Jussive;
            case "subjunctive":
                return Mood.Subjunctive;
        }
    }
    function MapNumerus(numerus: NumerusString)
    {
        switch(numerus)
        {
            case "dual":
                return Numerus.Dual;
            case "plural":
                return Numerus.Plural;
            case "singular":
                return Numerus.Singular;
        }
    }
    function MapPerson(person: PersonString)
    {
        switch(person)
        {
            case "first":
                return Person.First;
            case "second":
                return Person.Second;
            case "third":
                return Person.Third;
        }
    }

    const conjugator = new Conjugator();
    const metadata = GetDialectMetadata(DialectType.ModernStandardArabic);

    const root = new VerbRoot(rootRadicals.split("-").join(""));
    const stem1ctx = typeof stem === "number" ? undefined : metadata.CreateStem1Context(root.type, stem);

    if(stem1ctx !== undefined)
        ValidateStem1Context(stem1ctx, root, dialect);

    for (const test of conjugations)
    {
        const stringParams = {
            gender: test.gender ?? "male",
            numerus: test.numerus ?? "singular",
            person: test.person ?? "third",
            stem1Context: (typeof stem === "number") ? undefined : stem,
            tense: test.tense ?? "perfect",
            voice: test.voice ?? "active",
            mood: test.mood ?? "indicative"
        };
        const params: ConjugationParams = {
            gender: (stringParams.gender === "female") ? Gender.Female : Gender.Male,
            mood: MapMood(stringParams.mood),
            numerus: MapNumerus(stringParams.numerus),
            person: MapPerson(stringParams.person),
            stem: ((typeof stem === "number") ? stem : 1) as any,
            stem1Context: stem as any,
            tense: stringParams.tense === "perfect" ? Tense.Perfect : Tense.Present,
            voice: stringParams.voice === "active" ? Voice.Active : Voice.Passive,
        };
        const pastResult = conjugator.Conjugate(root, params, dialect);
        Test(Array.isArray(test.expected) ? test.expected : [test.expected], pastResult, params);
    }
}

export function RunDefectiveConjugationTest(rootRadicalsWithoutR3: string, stem: AdvancedStemNumber | string, conjugations: ConjugationTest[])
{
    RunConjugationTest(rootRadicalsWithoutR3 + "-و", stem, conjugations);
    RunConjugationTest(rootRadicalsWithoutR3 + "-ي", stem, conjugations);
}

export function RunActiveParticipleTest(rootRadicals: string, stem: number | string, expected: string, dialect: DialectType)
{
    const metadata = GetDialectMetadata(dialect);
    const conjugator = new Conjugator();

    const root = new VerbRoot(rootRadicals.split("-").join(""));
    const stemNumber = (typeof stem === "number") ? stem : 1;
    const ctx = (typeof stem === "number") ? undefined : metadata.CreateStem1Context(root.type, stem);

    if(ctx !== undefined)
        ValidateStem1Context(ctx, root, dialect);
    
    const activeGot = conjugator.ConjugateParticiple(dialect, root, stemNumber, Voice.Active, ctx);
    TestParticiple(expected, activeGot, "active");
}

export function RunParticipleTest(rootRadicals: string, stem: number | string, activeExpected: string, passiveExpected: string)
{
    const metadata = GetDialectMetadata(DialectType.ModernStandardArabic);
    const conjugator = new Conjugator();

    const root = new VerbRoot(rootRadicals.split("-").join(""));

    const stemNumber = (typeof stem === "number") ? stem : 1;
    const ctx = (typeof stem === "number") ? undefined : metadata.CreateStem1Context(root.type, stem);

    if(ctx !== undefined)
        ValidateStem1Context(ctx, root, DialectType.ModernStandardArabic);
    
    const activeGot = conjugator.ConjugateParticiple(DialectType.ModernStandardArabic, root, stemNumber, Voice.Active, ctx);
    TestParticiple(activeExpected, activeGot, "active");

    const passiveGot = conjugator.ConjugateParticiple(DialectType.ModernStandardArabic, root, stemNumber, Voice.Passive, ctx);
    TestParticiple(passiveExpected, passiveGot, "passive");
}

interface VerbalNounTestPattern
{
    expected: string;
    rootRadicals: string;
}
export function RunVerbalNounPatternTest(stem: AdvancedStemNumber | string, patterns: VerbalNounTestPattern[])
{
    const meta = GetDialectMetadata(DialectType.ModernStandardArabic);
    const conjugator = new Conjugator();

    let length;

    const foundIndices = new Set();
    for (const pattern of patterns)
    {
        const root = new VerbRoot(pattern.rootRadicals.split("-").join(""));
        const stemData = (typeof stem === "number") ? stem : meta.CreateStem1Context(root.type, stem);

        if(!conjugator.HasPotentiallyMultipleVerbalNounForms(root, stemData))
            throw new Error("Expected multiple verbal nouns but apparently only one exists");

        const choices = conjugator.GenerateAllPossibleVerbalNouns(root, stemData);
        const choicesAsStrings = choices.Values().Map(VocalizedTostring).ToArray();

        const index = choicesAsStrings.indexOf(pattern.expected);
        if(index === -1)
            throw new Error("Expected verbal noun '" + pattern.expected + "' could not be generated.");
        length = choices.length;

        if(foundIndices.has(index))
            throw new Error("You wrote two tests for the same verbal noun pattern: " + index);
        foundIndices.add(index);
    }

    if(foundIndices.size !== length)
        throw new Error("Not all verbal noun patterns are tested. Tested: " + foundIndices.size + ", found: " + length);
}

export function RunVerbalNounTest(rootRadicals: string, stem: AdvancedStemNumber | string, expected: string)
{
    const meta = GetDialectMetadata(DialectType.ModernStandardArabic);
    const conjugator = new Conjugator();

    const root = new VerbRoot(rootRadicals.split("-").join(""));
    const stemData = (typeof stem === "number") ? stem : meta.CreateStem1Context(root.type, stem);

    if(conjugator.HasPotentiallyMultipleVerbalNounForms(root, stemData))
        throw new Error("Expected a single verbal noun but apparently multiple ones exist");
    const choices = conjugator.GenerateAllPossibleVerbalNouns(root, stemData);

    if(choices.length !== 1)
        throw new Error("Expected only a single verbal noun but got " + choices.length);
    const got = choices[0];

    const a = ParseVocalizedText(expected);
    const gotStr = VocalizedTostring(got);
    if(!CompareVocalized(a, got))
        Fail("Verbal noun test failed. Expected: " + expected + " / " + Buckwalter.ToString(a) + " got: " + gotStr + " / " + Buckwalter.ToString(got));
}

export function RunDefectiveParticipleTest(rootRadicalsWithoutR3: string, stem: number | string, activeExpected: string, passiveExpected: string)
{
    RunParticipleTest(rootRadicalsWithoutR3 + "-و", stem, activeExpected, passiveExpected);
    RunParticipleTest(rootRadicalsWithoutR3 + "-ي", stem, activeExpected, passiveExpected);
}

export function RunDefectiveVerbalNounTest(rootRadicalsWithoutR3: string, stem: AdvancedStemNumber | string, expected: string)
{
    RunVerbalNounTest(rootRadicalsWithoutR3 + "-و", stem, expected);
    RunVerbalNounTest(rootRadicalsWithoutR3 + "-ي", stem, expected);
}