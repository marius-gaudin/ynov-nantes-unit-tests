const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("fixme", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("fixme");
  });


  it("items are created with good values", function() {
    const gildedRose = new Shop([new Item("foo", 20, 0)]);
    const items = gildedRose.updateQuality();
    expect(items.length).toBe(1);
    expect(items[0].sellIn).not.toBe(undefined);
    expect(items[0].quality).not.toBe(undefined);
    expect(items[0].quality).toBeLessThan(50);
  });

  it("items are created with 50 shoulld noit work", function() {
    const gildedRose = new Shop([new Item("foo", 20, 51)]);
    expect(gildedRose.items[0].quality).toBe(50);

  });
  it("items suylfuras has no sellIn", function() {
    const gildedRose = new Shop([new Item("Sulfuras", 20, 51)]);
    expect(gildedRose.items[0].sellIn).toBe(undefined);

  });

  it("Item list can be empty", function() {
    const gildedRose = new Shop([]);
    expect(gildedRose).not.toBe(Error);

  });

  it("item quality updating works", function() {
    const quality = 48;
    const gildedRose = new Shop([new Item("not a given name", 20, quality)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(quality - 1);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(quality - 2);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(quality - 3);
  });

  it("item quality cannot be negative", function() {
    const quality = 0;

    const negativeguildedQuality = new Shop([new Item("not a given name", 20, quality)]);
    negativeguildedQuality.updateQuality();
    expect(negativeguildedQuality.items[0].quality).not.toBeLessThan(0);
    
  });

  it("item quality reduce twice as much when sellin is negative", function() {
    const quality = 48;
    const negativeSellIn = -1;
    const negativeguildedQuality = new Shop([new Item("not a given name", negativeSellIn, quality)]);
    negativeguildedQuality.updateQuality();
    expect(negativeguildedQuality.items[0].quality).toBe(quality - 2);
    negativeguildedQuality.updateQuality();
    expect(negativeguildedQuality.items[0].quality).toBe(quality - 4);
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
