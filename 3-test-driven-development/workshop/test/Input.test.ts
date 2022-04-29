import { Input, Ligne, Nm, Champ } from "../src/Input";
import {NmErrorType, ChampError, LigneError} from "../src/ErrorTypes";

// l'objet Champs prends deux paramètre
// caracter, input, champs, ligne, nm

// NM : n = ligne,  m = char
  // constructeur nm doit etre de lengrh deux
  // leur valeur doit entre 1 et 100
  

  //Ligne :
    // soit * soit .

  // champs :
    // prend en parametre un Nm de valeurs chiffrées et un tableau de lignes
    // la longueur et la largeur des lignes doivent etre correspondante 
    // Si les valeurs nm sont a 0 il ya pa de ligne
    
  // La première ligne de champ où n = m = 0 représente la fin de la saisie et ne doit pas être traitée.




describe("Mine Sweeper", function() {
  
    it("la première ligne doit contenir deux chiffres", function() {
        let num:number[] = [1]
        expect(() => {new Nm(num)}).toThrow(NmErrorType.INVALIDLENGTH.message);
    });

    it("les chiffrse ne sont pas negatif", function() {

      let num:number[] = [-120, -5]
      let numprem:number[] = [5, -1]
      let numdeux:number[] = [-1, 5]
      expect(() => {new Nm(num)}).toThrow(NmErrorType.NEGATIVE)
      expect(() => {new Nm(numprem)}).toThrow(NmErrorType.NEGATIVE)
      expect(() => {new Nm(numdeux)}).toThrow(NmErrorType.NEGATIVE)
    });

    it("les chiffres ne sont pas supérieur a 100", function() {
      let num:number[] = [120, 110]
      let numprem:number[] = [130, 1]
      let numdeux:number[] = [1, 110]
      expect(() => {new Nm(num)}).toThrow(NmErrorType.SUPERIORVALUES)
      expect(() => {new Nm(numprem)}).toThrow(NmErrorType.SUPERIORVALUES)
      expect(() => {new Nm(numdeux)}).toThrow(NmErrorType.SUPERIORVALUES)
    });

    /*
    it("Le champ doit avoir n ligne", function() {
      //given :
      let num:number[] = [3, 4];
      let nm:Nm = new Nm(num);
      let chars1:Char[] = [".", ".", ".", "*"]
      let chars2:Char[] = [".", "*", ".", "*"]
      let chars3:Char[] = [".", ".", ".", "*"]
      let lignes:Ligne[] = [
          new Ligne(chars1),
          new Ligne(chars2),
          new Ligne(chars3)
      ] 
      //when : 
      let champ:Champ = new Champ(nm, lignes);
      //champ.Process();


      //then
      expect(champ.Lignes.length).toBe(champ.nm.value[0])
      expect(champ.Lignes[0].chars.length).toBe(chars1.length)
      expect(champ.Lignes[1].chars.length).toBe(chars2.length)
      expect(champ.Lignes[2].chars.length).toBe(chars3.length)
      // champ.Lignes.count.devrait.etre(champ.nm[0])
    });*/

      it("Les lignes ne doivent pas avoir autre chose que m largeur", function() {
        let num:number[] = [3, 25];
        let nm:Nm = new Nm(num);
        let chars1:String[] = [".", ".", ".", "*"]
        let chars2:String[] = [".", "*", ".", "*"]
        let chars3:String[] = [".", ".", ".", "*"]
        let lignes:Ligne[] = [
            new Ligne(chars1),
            new Ligne(chars2),
            new Ligne(chars3)
        ] 
        //when : 
        expect(() => {new Champ(nm, lignes)}).toThrow(ChampError.INVALIDLENGTH);

      });

      it("La méthode process retourne un input processé", function() {
          let champ: Champ= createValidChamp();
          let expected:Champ = createValidProcessChamp();

          console.log(champ.toString());
          expect(champ.Process()).toEqual(expected);
          console.log(champ.toString());

          let champ1: Champ= createValidChamp1();
          let expected1:Champ = createValidProcessChamp1();

          console.log(champ1.toString());
          expect(champ1.Process()).toEqual(expected1);
          console.log(champ1.toString());

      }); 

      it("toString", function() {
        let champ: Champ= createValidChamp();
        let champ1: Champ= createValidChamp1();
        let input = new Input([champ, champ1]);
        
        champ.Process();
        champ1.Process();

        let res = input.toString();
        let correctRes = 
        'Field #1:\n112*\n1*21\n1110\n\nField #2:\n000\n011\n12*\n*21\n110\n\n';

        expect(res).toEqual(correctRes);
        console.log(res);

      }); 
    
   });
  
  function createValidChamp(){
    let num:number[] = [3, 4];
      let nm:Nm = new Nm(num);
      let chars1:String[] = [".", ".", ".", "*"]
      let chars2:String[] = [".", "*", ".", "."]
      let chars3:String[] = [".", ".", ".", "."]
      let lignes:Ligne[] = [
          new Ligne(chars1),
          new Ligne(chars2),
          new Ligne(chars3)
      ]

      return new Champ(nm, lignes);
  }

  function createValidProcessChamp(){
    let num:number[] = [3, 4];
      let nm:Nm = new Nm(num);
      let chars1:String[] = ["1", "1", "2", "*"]
      let chars2:String[] = ["1", "*", "2", "1"]
      let chars3:String[] = ["1", "1", "1", "0"]
      let lignes:Ligne[] = [
          new Ligne(chars1),
          new Ligne(chars2),
          new Ligne(chars3)
      ]

      return new Champ(nm, lignes);
  }

  function createValidChamp1(){
    let num:number[] = [5, 3];
      let nm:Nm = new Nm(num);
      let chars1:String[] = [".", ".", "."]
      let chars2:String[] = [".", ".", "."]
      let chars3:String[] = [".", ".", "*"]
      let chars4:String[] = ["*", ".", "."]
      let chars5:String[] = [".", ".", "."]
      let lignes:Ligne[] = [
          new Ligne(chars1),
          new Ligne(chars2),
          new Ligne(chars3),
          new Ligne(chars4),
          new Ligne(chars5)
      ]

      return new Champ(nm, lignes);
  }

  function createValidProcessChamp1(){
    let num:number[] = [5, 3];
      let nm:Nm = new Nm(num);
      let chars1:String[] = ["0", "0", "0"]
      let chars2:String[] = ["0", "1", "1"]
      let chars3:String[] = ["1", "2", "*"]
      let chars4:String[] = ["*", "2", "1"]
      let chars5:String[] = ["1", "1", "0"]
      let lignes:Ligne[] = [
        new Ligne(chars1),
        new Ligne(chars2),
        new Ligne(chars3),
        new Ligne(chars4),
        new Ligne(chars5)
      ]

      return new Champ(nm, lignes);
  }