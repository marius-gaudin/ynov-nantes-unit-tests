 import {NmErrorType, LigneError, ChampError} from "../src/ErrorTypes";




 
 type Char = '*' | '.' | "1" | "2" | "0" | "3" | "4" | "5" | "6" | "7" | "8";


 class Input {
    champs: Champ[];

   constructor( champs : Champ[]) {

        this.champs = champs;
   }

}
class Nm {
    value: number[]
    constructor(value: number[]){
        if(value.length !== 2)
            throw new Error(NmErrorType.INVALIDLENGTH.message);
        if(value[0] < 0 || value[1] < 0)
            throw new Error(NmErrorType.NEGATIVE.message);
        if(value[0] > 100 || value[1] > 100)
            throw new Error(NmErrorType.SUPERIORVALUES.message)
        this.value = value;
    }
}


class Champ{
    nm: Nm
    Lignes : Ligne[];
    constructor(nm: Nm,Lignes:Ligne[]){
        this.nm = nm;
        if(Lignes.length !== nm.value[0])
            throw new Error(ChampError.INVALIDLENGTH.message)
        if(Lignes.find(ligne => ligne.chars.length !== nm.value[1]))
            throw new Error(ChampError.INVALIDLENGTH.message)
        
            
        this.Lignes = Lignes;
    }

    Process(){
        return [];
    }
   

}

class Ligne{
   chars : Char[];
   constructor(chars:Char[]){
    this.chars = chars;
   }
}



export {Input, Ligne, Champ, Char, Nm};