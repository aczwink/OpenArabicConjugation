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
import { BaseTashkil, Letter } from "./Definitions";

export enum RootType
{
    Sound,

    /**
     * First radical is waw or ya
     */
    Assimilated,
    /**
     * Second radical is waw or ya
     */
    Hollow,
    /**
     * Third radical is waw or ya
     */
    Defective,

    SecondConsonantDoubled,
    /**
     * The first radical is a hamza
     */
    HamzaOnR1,

    Quadriliteral,

    DoublyWeak_WawOnR1_WawOrYaOnR3,
}

export class VerbRoot
{
    constructor(private radicals: string)
    {
    }

    //Properties
    public get r1()
    {
        return this.radicals.charAt(0) as Letter;
    }

    public get r2()
    {
        return this.radicals.charAt(1) as Letter;
    }

    public get r3()
    {
        return this.radicals.charAt(2) as Letter;
    }

    public get r4()
    {
        return this.radicals.charAt(3) as Letter;
    }

    public get radicalsAsSeparateLetters()
    {
        switch(this.type)
        {
            case RootType.Quadriliteral:
                return [this.r1, this.r2, this.r3, this.r4];
            case RootType.Assimilated:
            case RootType.Sound:
            case RootType.Hollow:
            case RootType.Defective:
            case RootType.HamzaOnR1:
            case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                return [this.r1, this.r2, this.r3];
            case RootType.SecondConsonantDoubled:
                return [this.r1, this.r2, this.r2];
        }
    }

    public get type()
    {
        if(this.radicals.length === 4)
            return RootType.Quadriliteral;
        if(this.r2 === this.r3)
            return RootType.SecondConsonantDoubled;

        if( (this.r1 === Letter.Waw) && ( (this.r3 === Letter.Waw) || (this.r3 === Letter.Ya) ) )
            return RootType.DoublyWeak_WawOnR1_WawOrYaOnR3;

        if((this.r1 === Letter.Waw) || (this.r1 === Letter.Ya))
            return RootType.Assimilated;

        if((this.r2 === Letter.Waw) || (this.r2 === Letter.Ya))
        {
            if((this.r3 === Letter.Waw) || (this.r3 === Letter.Ya))
                return RootType.Defective;
            return RootType.Hollow;
        }

        if((this.r3 === Letter.Waw) || (this.r3 === Letter.Ya))
            return RootType.Defective;
        if(this.r1 === Letter.Hamza)
            return RootType.HamzaOnR1;
        return RootType.Sound;
    }

    //Public methods
    public ToString()
    {
        return this.radicalsAsSeparateLetters.join("-");
    }
}