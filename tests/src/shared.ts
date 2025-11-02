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
import { Expect, Fail } from "acts-util-test";
import { Conjugator } from "openarabicconjugation/dist/Conjugator";
import { AdvancedStemNumber, ConjugationParams, Gender, GenderString, Mood, MoodString, Numerus, NumerusString, Person, PersonString, Tense, TenseString, VerbType, Voice, VoiceString } from "openarabicconjugation/dist/Definitions";
import { VerbRoot } from "openarabicconjugation/dist/VerbRoot";
import { GenderToString, MoodToString, NumerusToString, PersonToString, TenseToString, VoiceToString } from "openarabicconjugation/dist/Util";
import { DisplayVocalized, ParseVocalizedText, VocalizedToString } from "openarabicconjugation/dist/Vocalization";
import { Buckwalter } from "openarabicconjugation/dist/Transliteration";
import { DialectType } from "openarabicconjugation/dist/Dialects";
import { GetDialectMetadata } from "openarabicconjugation/dist/DialectsMetadata";
import { CreateVerb, VerbStem1Data, VerbStemData } from "openarabicconjugation/dist/Verb";

export interface VerbTestData
{
    dialect: DialectType;
    rootRadicals: string;
    stativeActiveParticiple?: true;
    stem: AdvancedStemNumber | string;
    verbType?: VerbType;
}

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

function Test(expected: string[], got: DisplayVocalized[], stemData: VerbStemData<string>, params: ConjugationParams)
{
    const gotStr = VocalizedTostring(got);
    const anyExpected = expected.Values().Map(ex => CompareVocalized(ParseVocalizedText(ex), got)).AnyTrue();
    if(!anyExpected)
    {
        const stemDataString = (stemData.stem === 1) ? (stemData.stem + stemData.stemParameterization) : stemData.stem;
        const context = ["stem " + stemDataString, TenseToString(params.tense), VoiceToString(params.voice)];
        if(params.tense === Tense.Present)
            context.push(MoodToString(params.mood));
        context.push(NumerusToString(params.numerus), PersonToString(params.person), GenderToString(params.gender));
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

function ValidateStem1Context(ctx: VerbStem1Data<string>, root: VerbRoot, dialectType: DialectType)
{
    const meta = GetDialectMetadata(dialectType);
    const choices = meta.GetStem1ContextChoices(ctx.type, root);
    for (const opt of choices.types)
    {
        if(ctx.stemParameterization === opt)
            return;
    }
    throw new Error("Illegal stem 1 context");
}

function CreateVerbInstance(verbData: VerbTestData)
{
    const root = new VerbRoot(verbData.rootRadicals.split("-").join(""));
    const verb = CreateVerb(verbData.dialect, root, verbData.stem, verbData.verbType);

    if(verb.stem === 1)
        ValidateStem1Context(verb, root, verbData.dialect);

    return verb;
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
export function _Legacy_RunConjugationTest(rootRadicals: string, stem: AdvancedStemNumber | string, conjugations: ConjugationTest[], dialect: DialectType = DialectType.ModernStandardArabic, verbType?: VerbType)
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

    const verb = CreateVerbInstance({
        dialect,
        rootRadicals,
        stem,
        verbType
    });

    for (const test of conjugations)
    {
        const stringParams = {
            gender: test.gender ?? "male",
            numerus: test.numerus ?? "singular",
            person: test.person ?? "third",
            stem1Context: (typeof stem === "number") ? undefined : verb,
            tense: test.tense ?? "perfect",
            voice: test.voice ?? "active",
            mood: test.mood ?? "indicative"
        };
        const params: ConjugationParams = {
            gender: (stringParams.gender === "female") ? Gender.Female : Gender.Male,
            mood: MapMood(stringParams.mood),
            numerus: MapNumerus(stringParams.numerus),
            person: MapPerson(stringParams.person),
            tense: stringParams.tense === "perfect" ? Tense.Perfect : Tense.Present,
            voice: stringParams.voice === "active" ? Voice.Active : Voice.Passive,
        };
        const pastResult = conjugator.Conjugate(verb, params);
        const expected = Array.isArray(test.expected) ? test.expected : [test.expected];
        Test(expected, pastResult, verb, params);
    }
}

export function RunConjugationTest(verbTestData: VerbTestData, conjugations: ConjugationTest[])
{
    _Legacy_RunConjugationTest(verbTestData.rootRadicals, verbTestData.stem, conjugations, verbTestData.dialect, verbTestData.verbType);
}

export function RunDefectiveConjugationTest(rootRadicalsWithoutR3: string, stem: AdvancedStemNumber | string, conjugations: ConjugationTest[])
{
    _Legacy_RunConjugationTest(rootRadicalsWithoutR3 + "-و", stem, conjugations);
    _Legacy_RunConjugationTest(rootRadicalsWithoutR3 + "-ي", stem, conjugations);
}

export function _Legacy_RunActiveParticipleTest(rootRadicals: string, stem: AdvancedStemNumber | string, expected: string, dialect: DialectType, verbType?: VerbType)
{
    const conjugator = new Conjugator();

    const verb = CreateVerbInstance({
        dialect,
        rootRadicals,
        stem,
        verbType
    });
    
    const activeGot = conjugator.ConjugateParticiple(verb, Voice.Active);
    TestParticiple(expected, activeGot, "active");
}

export function RunActiveParticipleTest(verbTestData: VerbTestData, expected: string)
{
    const conjugator = new Conjugator();

    const verb = CreateVerbInstance(verbTestData);
    
    const activeGot = conjugator.ConjugateParticiple(verb, Voice.Active);
    TestParticiple(expected, activeGot, "active");
}

export function _Legacy_RunParticipleTest(rootRadicals: string, stem: AdvancedStemNumber | string, activeExpected: string, passiveExpected: string)
{
    const dialect = DialectType.ModernStandardArabic;
    const conjugator = new Conjugator();

    const verb = CreateVerbInstance({
        dialect,
        rootRadicals,
        stem,
    });
    
    const activeGot = conjugator.ConjugateParticiple(verb, Voice.Active);
    TestParticiple(activeExpected, activeGot, "active");

    const passiveGot = conjugator.ConjugateParticiple(verb, Voice.Passive);
    TestParticiple(passiveExpected, passiveGot, "passive");
}

export function RunParticipleTest(verbTestData: VerbTestData, activeExpected: string, passiveExpected: string)
{
    const dialect = DialectType.ModernStandardArabic;
    const conjugator = new Conjugator();

    const verb = CreateVerbInstance({
        dialect,
        rootRadicals: verbTestData.rootRadicals,
        stem: verbTestData.stem,
    });
    
    const activeGot = (verbTestData.stativeActiveParticiple === true) ? conjugator.DeclineStativeActiveParticiple(verb) : conjugator.ConjugateParticiple(verb, Voice.Active);
    TestParticiple(activeExpected, activeGot, "active");

    const passiveGot = conjugator.ConjugateParticiple(verb, Voice.Passive);
    TestParticiple(passiveExpected, passiveGot, "passive");
}

export function RunSoundEqualityTest(verbData: VerbTestData)
{
    function ReplaceRoot(vocalized: DisplayVocalized[], root: VerbRoot)
    {
        const replacedRoot = ["a", "b", "c", "d"];

        let startIndex = 0;
        for(let i = 0; i < root.radicalsAsSeparateLetters.length; i++)
        {
            const radical = root.radicalsAsSeparateLetters[i];

            const idx = vocalized.findIndex( (x, i) => (x.letter === radical) && (i >= startIndex) );
            if(idx === -1)
                throw new Error("Root replacement failed");
            vocalized[idx].letter = replacedRoot[i] as any;
            startIndex = idx+1;
        }
    }

    function TestRootless(expected: DisplayVocalized[], rootOfExpected: VerbRoot, got: DisplayVocalized[], rootOfGot: VerbRoot)
    {
        ReplaceRoot(expected, rootOfExpected);
        ReplaceRoot(got, rootOfGot);

        const result = CompareVocalized(expected, got);
        if(!result)
        {
            console.log(expected, got);
            Fail("Comparison failed");
        }
    }


    const verb = CreateVerbInstance(verbData);
    Expect(verb.type).ToBe(VerbType.Sound);

    const soundVerb = CreateVerb(verbData.dialect, new VerbRoot("فعل"), verbData.stem);

    const conjugator = new Conjugator();

    //TODO: compare all conjugations
    
    const a1 = conjugator.ConjugateParticiple(verb, Voice.Active);
    const a2 = conjugator.ConjugateParticiple(soundVerb, Voice.Active);
    TestRootless(a2, soundVerb.root, a1, verb.root);

    const p1 = conjugator.ConjugateParticiple(verb, Voice.Passive);
    const p2 = conjugator.ConjugateParticiple(soundVerb, Voice.Passive);
    TestRootless(p2, soundVerb.root, p1, verb.root);

    //TODO: compare all verbal nouns
}

interface VerbalNounTestPattern
{
    expected: string;
    rootRadicals: string;
}
export function RunVerbalNounPatternTest(stem: AdvancedStemNumber | string, patterns: VerbalNounTestPattern[], verbType?: VerbType)
{
    const dialect = DialectType.ModernStandardArabic;
    const conjugator = new Conjugator();

    let length;

    const foundIndices = new Set();
    for (const pattern of patterns)
    {
        const root = new VerbRoot(pattern.rootRadicals.split("-").join(""));
        const verb = CreateVerb(dialect, root, stem, verbType);

        if(!conjugator.HasPotentiallyMultipleVerbalNounForms(verb))
            throw new Error("Expected multiple verbal nouns but apparently only one exists");

        const choices = conjugator.GenerateAllPossibleVerbalNouns(root, (verb.stem === 1) ? verb : verb.stem);
        const index = choices.findIndex(x => CompareVocalized(x, ParseVocalizedText(pattern.expected)));
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
    const dialect = DialectType.ModernStandardArabic;
    const conjugator = new Conjugator();

    const root = new VerbRoot(rootRadicals.split("-").join(""));
    const verb = CreateVerb(dialect, root, stem);

    if(conjugator.HasPotentiallyMultipleVerbalNounForms(verb))
        throw new Error("Expected a single verbal noun but apparently multiple ones exist");
    const choices = conjugator.GenerateAllPossibleVerbalNouns(root, (verb.stem === 1) ? verb : verb.stem);

    if(choices.length !== 1)
        throw new Error("Expected only a single verbal noun but got " + choices.length);
    const got = choices[0];

    const a = ParseVocalizedText(expected);
    const gotStr = VocalizedTostring(got);
    if(!CompareVocalized(a, got))
        Fail("Verbal noun test failed. Expected: " + expected + " / " + Buckwalter.ToString(a) + " got: " + gotStr + " / " + Buckwalter.ToString(got));
}

export function RunDefectiveParticipleTest(rootRadicalsWithoutR3: string, stem: AdvancedStemNumber | string, activeExpected: string, passiveExpected: string)
{
    _Legacy_RunParticipleTest(rootRadicalsWithoutR3 + "-و", stem, activeExpected, passiveExpected);
    _Legacy_RunParticipleTest(rootRadicalsWithoutR3 + "-ي", stem, activeExpected, passiveExpected);
}

export function RunDefectiveVerbalNounTest(rootRadicalsWithoutR3: string, stem: AdvancedStemNumber | string, expected: string)
{
    RunVerbalNounTest(rootRadicalsWithoutR3 + "-و", stem, expected);
    RunVerbalNounTest(rootRadicalsWithoutR3 + "-ي", stem, expected);
}