class NmErrorType extends Error{
    public message: string;
    constructor(message:string){
        super();
        this.message = message;
    }
    public static NEGATIVE : NmErrorType = new NmErrorType("l'objet Nm prend une liste de chiffre non négatifs en paramètres");
    public static SUPERIORVALUES : NmErrorType = new NmErrorType("l'objet Nm prend une liste de chiffre non supérieurs à 100 en paramètres");
    public static INVALIDLENGTH : NmErrorType = new NmErrorType("l'objet Nm prend une liste de deux chiffres en paramètres");
}

class LigneError extends Error{
    public message: string;
    constructor(message:string){
        super();
        this.message = message;
    }
    public static INVALIDCHAR : NmErrorType = new NmErrorType("l'objet ligne prend une liste de caractère * ou . ");

}


class ChampError extends Error{
    public message: string;
    constructor(message:string){
        super();
        this.message = message;
    }
    public static INVALIDLENGTH : ChampError = new NmErrorType("les ligne doivent etre à la longuer n et la largeur m");
}

export{ NmErrorType, LigneError, ChampError};