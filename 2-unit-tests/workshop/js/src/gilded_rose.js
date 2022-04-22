const SULFURAS = 'Sulfuras';
const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASSES = 'Backstage passes';
const CONJURED = 'Conjured';
const QUALITY_MAX = 50;
const SULFURAS_QUALITY = 80;

class Item {
  constructor(name, sellIn, quality){
    if(quality < 0)
      quality = 0
    if(quality > QUALITY_MAX)
      quality = QUALITY_MAX;
    this.name = name;
    this.sellIn = name == SULFURAS ? undefined : sellIn;
    this.quality = name == SULFURAS ? SULFURAS_QUALITY : quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(item => {

      if (item.name == AGED_BRIE)
      {
        if(item.quality < QUALITY_MAX)
          item.quality++;
      }
      else if (item.name == BACKSTAGE_PASSES)
      {
        if(item.quality < QUALITY_MAX) {
          if (item.sellIn <= 0)
            item.quality = 0
          else if (item.sellIn <= 5)
            item.quality += 3;
          else if (item.sellIn <= 10)
            item.quality += 2;
          else
            item.quality ++;
        }
      }
      else if (item.name != SULFURAS && item.quality > 0) 
      {
        let conjured = item.name == CONJURED ? 2 : 1;

        if (item.sellIn > 0)
          item.quality -= 1 * conjured;
        else
          item.quality -= 2 * conjured;
      }

      if (item.name != SULFURAS)
        item.sellIn--;
    });
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
