const { it } = require('@jest/globals');

const validName = "name";
const validId = "57qz+98g4azga948/g";
const validDate = new Date();
const updatedName = "updatedName";

//Comme mongoose nous posait des probleme j'ai écrit des tests avec comme Bdd un object Json : ITEMS et sa liste d'items
let ITEMS = {
    "items" : 
        [
            { "id": "1qz56d4q6d1qz6d1q",
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
 * Après explication de l'intervenant nous avon réécrit les tests avec l'utilisation de la bdd mongoose
 */
