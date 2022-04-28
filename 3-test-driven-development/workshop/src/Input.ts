 import {NmErrorType, LigneError, ChampError} from "../src/ErrorTypes"; 
 //type Char = '*' | '.' | "1" | "2" | "0" | "3" | "4" | "5" | "6" | "7" | "8";


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
        
        for(let n = 0; n < this.nm.value[0]; n++) {
            for(let m = 0; m < this.nm.value[1]; m++) {
                if(this.Lignes[n].chars[m] !== "*") {
                    let nb = 0;

                    if(n > 0 && m > 0 && this.Lignes[n-1].chars[m-1] === "*")
                        nb++;
                    
                    if(n > 0 && this.Lignes[n-1].chars[m] === "*")
                        nb++;
                    
                    if(n > 0 && m+1 < this.nm.value[1] && this.Lignes[n-1].chars[m+1] === "*")
                        nb++;
                    
                    if(n+1 < this.nm.value[0] && m > 0 && this.Lignes[n+1].chars[m-1] === "*")
                        nb++;

                    if(n+1 < this.nm.value[0] && this.Lignes[n+1].chars[m] === "*")
                        nb++;

                    if(n+1 < this.nm.value[0] && m+1 < this.nm.value[1] && this.Lignes[n+1].chars[m+1] === "*")
                        nb++;
                    
                    if(m > 0 && this.Lignes[n].chars[m-1] === "*")
                        nb++;
                    
                    if(m+1 < this.nm.value[1] && this.Lignes[n].chars[m+1] === "*")
                        nb++;

                    this.Lignes[n].chars[m] = nb.toString();
                }
            }
        }
        return this;
    }
   

}

class Ligne{
   chars : String[];
   constructor(chars:String[]){
    this.chars = chars;
   }
}



export {Input, Ligne, Champ, Nm};