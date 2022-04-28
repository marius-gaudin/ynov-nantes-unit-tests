 class Input {
    champs: Champ[];

   constructor( champs : Champ[]) {

        this.champs = champs;
   }

}
class Nm {
    value: number[]
    constructor(value: number[]){

        this.value =value;
    }
}
class Champ{
    nm: Nm
    Lignes : Ligne[];
    constructor(nm: Nm,Lignes:Ligne[]){
        this.nm = nm;
        this.Lignes = Lignes;
    }
   
}
class Ligne{
   chars : Caractere[];
   constructor(chars:Caractere[]){
        this.chars = chars;
   }
}

class Caractere{
   value : string;
   constructor(value: string){
       this.value = value;
   }

   public static  ETOILE :Caractere = new Caractere("*");
   public static  POINT :Caractere = new Caractere(".");
}

export {Input, Ligne, Champ, Caractere, Nm};