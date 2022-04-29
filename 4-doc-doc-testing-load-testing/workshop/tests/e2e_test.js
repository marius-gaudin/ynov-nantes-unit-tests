
Feature('What do I need to do?');

Scenario('create', ({ I }) => {

    I.amOnPage('http://localhost:5000/');

    I.fillField('#newTODO', 'Test todo');

    I.click('#create-todo');

    I.see('Test todo', '#todo-body tr td');
});

Scenario('done', ({ I }) => {

    I.amOnPage('http://localhost:5000/');

    I.see('Test todo', '#todo-body tr td');

    I.click('.btn-outline-success');

    I.see('Test todo', '.table-borderless tr td');
});
