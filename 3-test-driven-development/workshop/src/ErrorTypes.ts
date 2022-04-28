class NmErrorType extends Error{
    public message: string;
    constructor(message:string){
        super();
        this.message = message;
    }

    public static INVALIDLENGTH : NmErrorType = new NmErrorType("l'objet Nm prend une liste de deux chiffres en paramètres");
}


export{ NmErrorType};