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

//
describe("Sulfuras quality", function() {
  it("should not change", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 2)]);

    const items1 = gildedRose.updateQuality();
    expect(items1[0].quality).toBe(2);
  });
});

// A Tester avec un item qui est 'Aged Brie' :
describe("Aged Brie quality", function() {

  // - Tester que la qualité augmente de 1 à chaque appel
  it("should increase", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 2)]);

    const items1 = gildedRose.updateQuality();
    expect(items1[0].quality).toBe(3);

    const items2 = gildedRose.updateQuality();
    expect(items2[0].quality).toBe(4);
  });

  // - Tester que la qualité n'est jamais supérieur à 50
  it("must not exceed 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 49)]);

    const items1 = gildedRose.updateQuality();
    expect(items1[0].quality).toBe(50);

    const items2 = gildedRose.updateQuality();
    expect(items2[0].quality).toBe(50);

    const items3 = gildedRose.updateQuality();
    expect(items3[0].quality).toBe(50);
  });

});

// A Tester avec un item qui est 'Backstage passes' :
describe("Backstage passes quality", function() {

  const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 2)]);

  // - Tester que la qualité augmente de 1 à chaque appel si écart avec la date > 10
  it("should increase (+1 if sellIn >= 10)", function() {
    const items1 = gildedRose.updateQuality();
    expect(items1[0].quality).toBe(3);

    const items2 = gildedRose.updateQuality();
    expect(items2[0].quality).toBe(4);
  });

  // - Tester que la qualité augmente de 2 à chaque appel si écart avec la date < 10 et > 5
  it("should increase (+2 if sellIn < 10 and sellIn >= 5)", function() {
    const items1 = gildedRose.updateQuality();
    expect(items1[0].quality).toBe(6);

    const items2 = gildedRose.updateQuality();
    expect(items2[0].quality).toBe(8);

    const items3 = gildedRose.updateQuality();
    expect(items3[0].quality).toBe(10);

    const items4 = gildedRose.updateQuality();
    expect(items4[0].quality).toBe(12);

    const items5 = gildedRose.updateQuality();
    expect(items5[0].quality).toBe(14);
  });

  // - Tester que la qualité augmente de 3 à chaque appel si écart avec la date < 5
  it("should increase (+3 if sellIn < 5 and >= 0)", function() {
    const items1 = gildedRose.updateQuality();
    expect(items1[0].quality).toBe(17);

    const items2 = gildedRose.updateQuality();
    expect(items2[0].quality).toBe(20);

    const items3 = gildedRose.updateQuality();
    expect(items3[0].quality).toBe(23);

    const items4 = gildedRose.updateQuality();
    expect(items4[0].quality).toBe(26);

    const items5 = gildedRose.updateQuality();
    expect(items5[0].quality).toBe(29);
  });

  // - Tester que la qualité est à 0 quand la date est dépassé
  it("must be 0 (if sellIn < 0)", function() {
    const items1 = gildedRose.updateQuality();
    expect(items1[0].quality).toBe(0);

    const items2 = gildedRose.updateQuality();
    expect(items2[0].quality).toBe(0);
  });

});

// Tester avec plusieurs items
describe("Many Items", function() {

  it("should be correct", function() {
    const gildedRose = new Shop([
                                  new Item("test1", 12, 2),
                                  new Item("test2", 5, 11),
                                  new Item("test3", 0, 6)
                                ]);

    const items1 = gildedRose.updateQuality();
    expect(items1[0].quality).toBe(1);
    expect(items1[1].quality).toBe(10);
    expect(items1[2].quality).toBe(4);

    expect(items1[0].sellIn).toBe(11);
    expect(items1[1].sellIn).toBe(4);
    expect(items1[2].sellIn).toBe(-1);
  });

});
