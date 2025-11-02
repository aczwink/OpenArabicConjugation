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
import { _TODO_ToConjugationVocalized, ConjugatedWord, ConjugationItem, ConjugationRule, ConjugationRuleMatchResult, SuffixResult, Vowel } from "../../Conjugation";
import { ConjugationRuleMatcher } from "../../ConjugationRuleMatcher";
import { ConjugationParams, Letter, Tashkil, Tense, VerbType, Voice } from "../../Definitions";
import { DialectConjugator } from "../../DialectConjugator";
import { Verb } from "../../Verb";
import { ConjugationVocalized } from "../../Vocalization";
import { DefectiveStem4Template } from "./conjugation_templates/defective_stem4";
import { DerivePrefix } from "./prefix";
import { SouthLevantineStem1Context } from "./SouthLevantineDialectMetadata";
import { DeriveSuffix } from "./suffix";

export class SouthLevantineConjugator implements DialectConjugator<SouthLevantineStem1Context>
{
    public Conjugate(verb: Verb<SouthLevantineStem1Context>, params: ConjugationParams): ConjugationVocalized[]
    {
        const template = this.PickConjugationTemplate(verb, params);
        if(template === undefined)
            throw new Error("Can't be conjugated.");

        const matched = new ConjugationRuleMatcher<SouthLevantineStem1Context>(false).Match(template, verb, params);

        const prefix = DerivePrefix(matched.prefixVowel, matched.vowels[0], params);
        const suffix = DeriveSuffix(verb, params);

        const constructed = this.Construct(matched, prefix, suffix);

        return _TODO_ToConjugationVocalized(constructed);
    }

    public ConjugateParticiple(verb: Verb<SouthLevantineStem1Context>, voice: Voice): ConjugationVocalized[]
    {
        return [{ emphasis: true, letter: "TODO" as any, tashkil: Tashkil.AlefMaksuraMarker }];
    }

    //Private methods
    private Construct(rule: ConjugationRuleMatchResult, prefix: ConjugationItem[], suffix: SuffixResult): ConjugatedWord
    {
        const vowels = [...rule.vowels, suffix.previousVowel];
        let vowelIndex = 0;

        const items = prefix.concat(rule.symbols.map((x,i)=> ({
            consonant: x,
            followingVowel: vowels[vowelIndex++],
            emphasis: (i === rule.emphasize) ? true : undefined
        })));
        if(suffix.prefinal !== undefined)
            items.push(suffix.prefinal);

        if(suffix.final !== undefined)
        {
            if(typeof suffix.final === "string")
            {
                return {
                    items,
                    final: suffix.final
                };
            }
            else
                items.push(suffix.final);
        }
        return {
            items
        };
    }
    
    private PickConjugationTemplate(verb: Verb<SouthLevantineStem1Context>, params: ConjugationParams): ConjugationRule[] | undefined
    {
        switch(verb.stem)
        {
            case 4:
                switch(verb.type)
                {
                    case VerbType.Defective:
                        return DefectiveStem4Template(verb);
                }
                break;
        }
    }
}
