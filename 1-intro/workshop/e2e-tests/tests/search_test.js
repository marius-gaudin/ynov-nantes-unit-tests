Feature('Ynov Nantes');

Scenario('Test Ynov Nantes Land Page', ({ I }) => {
    // Faire un test end to end qui va sur www.ynov-nantes.com/
    I.amOnPage('https://www.ynov-nantes.com/');

    // clique sur la recherche
    I.click('.icon-search');

    // recherche "info"
    I.fillField('s', 'info');

    // et s'assure de voir "Bachelor Informatique"
    I.wait(5);
    I.see('Bachelor Informatique');
});
