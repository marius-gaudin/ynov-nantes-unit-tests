import { Input, Nm } from "../src/Input";

// l'objet Champs prends deux paramètre
// caracter, input, champs, ligne, nm

// NM :
  // constructeur nm doit etre de lengrh deux
  // leur valeur doit entre 1 et 100


describe("Gilded Rose", function() {
    it("la première ligne doit contenir deux chiffres", function() {
        let num:number[] = [1]
        let premièreligne:Nm = new Nm(num);
        expect(premièreligne).toThrow(Error);
    });

    it("les chiffrse ne sont pas negatif", function() {
      let num:number[] = [-1, -25]
      let premièreligneneg:Nm = new Nm(num);
      expect(premièreligneneg).toThrow(Error);
      expect(premièreligneneg).toThrow(Error);
    });

    it("les chiffres ne sont pas supérieur a 100", function() {
      let num:number[] = [120, 110]
      let premièrelignesuphundred:Nm = new Nm(num);
      expect(premièrelignesuphundred.value[0]).not.toBeGreaterThan(100);
      expect(premièrelignesuphundred.value[1]).not.toBeGreaterThan(100);
    });


  });
  