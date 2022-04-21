const { it } = require('@jest/globals');

const validName = "name";
const validId = "57qz+98g4azga948/g";
const validDate = new Date();
const updatedName = "updatedName";

//Comme mongoose nous posait des probleme j'ai écrit des tests avec comme Bdd un object Json : ITEMS et sa liste d'items
// (Nous avons finalement réussi à faire les tests avec mangoose voir la fin du fichier)

let ITEMS = {
    "items" : 
        [
            { 
                "id": "1qz56d4q6d1qz6d1q",
                "name" : "nom de base",
                "date": Date.now()
            }
        ]   
}

it("ItemGet" , () => {
  
    let resAll = ITEMS.items;
    // la liste ne devrait pas etre null, on récupère bien la liste d'items
    expect(resAll).not.toBe(undefined);
    //la liste fait la bonne taille initiale
    expect(resAll.length).toBe(1);
})

it("ItemCreation" , () => {
    //création d'un item 
    ITEMS.items.push({id: validId, name: validName, date: validDate})

    //on récupére l'obkect créer
    let created = ITEMS.items.find(i => i.id === validId);
    //est-il valide ?
    expect(created).not.toBe(undefined);
    expect(created.name).toBe(validName)
    expect(created.date).toBe(validDate)

})

it("ItemUpdate" , () => {
    let randomId = Math.random().toString(36).slice(2, 11);
    //création d'un item 
    ITEMS.items.push({id: randomId, name: validName, date: validDate})
    //modification de cet item
    let created = ITEMS.items.find(i => i.id === randomId);
    created.name = updatedName;
    //est-il bien modifié
    let updated =  ITEMS.items.find(i => i.id === randomId);
    expect(updated.name).toBe(updatedName)

})

it("ItemDelete" , () => {
    let randomId = Math.random().toString(36).slice(2, 11);
    //création d'un item 
    ITEMS.items.push({id: randomId, name: validName, date: validDate})
    //l'objet est-il bien créé
    let created = ITEMS.items.find(i => i.id === randomId);
    expect(created).not.toBe(undefined);
    
    ITEMS.items.splice(ITEMS.items.indexOf(created))

    //est-il bien supprimé
    let deleted =  ITEMS.items.find(i => i.id === randomId);
    expect(deleted).toBe(undefined)

})


/**
 * Après explication de l'intervenant nous avons réécrit les tests avec l'utilisation de la bdd mongoose
 */

const mongoose = require('mongoose');
const Item = require('./Item.js');

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/docker-node-mongo', { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected (TESTS)'))
.catch(err => console.log(err));

it("Item" , async () => {
    //Creation
    const item = new Item({name: 'test'});
    expect(item._id).toBeDefined();
    expect(item.name).toBeDefined();
    expect(item.date).toBeDefined();

    const res = await item.save();
    expect(res._id).toBe(item._id);
    expect(res.name).toBe(item.name);
    expect(res.date).toBe(item.date);

    //Delete
    await Item.deleteOne({ _id:item._id});
    const resDelete = await Item.findById(item._id);
    expect(resDelete).toBe(null);
})