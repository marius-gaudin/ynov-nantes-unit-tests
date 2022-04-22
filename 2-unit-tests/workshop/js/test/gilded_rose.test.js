const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("fixme");
  });
});

// -- Item --
// Tester que les éléments créé on bien une valeur sellIn
// Tester que les éléments créé on bien une valeur quality et que ce n'est pas supérieur à 50
// Tester que si 'Sulfuras' alors pas de date de péremption


// -- Shop --
// --- updateQuality ---
// Tester pour une liste items vide (pas d'erreurs)

// A Tester avec un item qui n'est ni 'Aged Brie' ni 'Sulfuras' ni 'Backstage passes' :
// - Tester que la qualité diminue a chaque appel
// - Tester que la qualité n'est jamais négative
// - Tester une fois la date de péremption est passée que la qualité se dégrade deux fois plus rapidement

// A Tester avec un item qui est 'Aged Brie' :
// - Tester que la qualité augmente de 1 à chaque appel
// - Tester que la qualité n'est jamais supérieur à 50

// A Tester avec un item qui est 'Backstage passes' :
// - Tester que la qualité augmente de 1 à chaque appel si écart avec la date > 10
// - Tester que la qualité augmente de 2 à chaque appel si écart avec la date < 10 et > 5
// - Tester que la qualité augmente de 3 à chaque appel si écart avec la date < 5
// - Tester que la qualité est à 0 quand la date est dépassé

// Tester avec plusieurs items
