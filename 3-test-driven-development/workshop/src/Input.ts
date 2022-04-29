import {NmErrorType, LigneError, ChampError} from "../src/ErrorTypes"; 
//type Char = '*' | '.' | "1" | "2" | "0" | "3" | "4" | "5" | "6" | "7" | "8";

class Input {
    champs: Champ[];

    constructor( champs : Champ[]) {
        this.champs = champs;
    }

    toString() {
        let str = '';
        this.champs.forEach((champ, i) => {
            str += 'Field #'+(i+1)+':\n';
            str += champ.toString();
            str += '\n';
        });
        return str;
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

    toString() {
        let str = '';
        this.Lignes.forEach(n => {
            str += n.chars.join('');
            str += '\n';
        });
        return str;
    }

    Process() {
        
        for(let n = 0; n < this.nm.value[0]; n++) {
            for(let m = 0; m < this.nm.value[1]; m++) {
                if(this.Lignes[n].chars[m] === ".") {
                    let nb = 0;

                    let check = [
                        [n-1, m-1], //TOP LEFT
                        [n-1, m],   //TOP
                        [n-1, m+1], //TOP RIGHT
                        [n+1, m-1], //BOTTOM LEFT
                        [n+1, m],   //BOTTOM
                        [n+1, m+1], //TBOTTOM RIGHT
                        [n, m-1],   //LEFT
                        [n, m+1],   //RIGHT
                    ];

                    check.forEach(position => {
                        if(typeof this.Lignes[position[0]] !== 'undefined' && 
                           typeof this.Lignes[position[0]].chars[position[1]] !== 'undefined' && 
                           this.Lignes[position[0]].chars[position[1]] === "*")
                            nb++;
                    })

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