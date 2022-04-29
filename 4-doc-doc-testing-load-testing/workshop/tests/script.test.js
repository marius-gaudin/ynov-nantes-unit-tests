const { getHtmlTodoDone, getHtmlTodoTable, addTODO } = require("../public/script");

describe("Test Unitaire", function() {

    it("getHtmlTodoDone", function() {
        const row = document.createElement('tr');
        row.innerHTML = `<td>test ok</td>`;
        expect(getHtmlTodoDone("test ok")).toStrictEqual(row);
    });

    it("getHtmlTodoTable", function() {
        const row = document.createElement('tr');
        row.id = `todo-5`;
        row.innerHTML = `
    <td scope="row" class="text-left">test todo</td>
    <td>
      <button
        class="btn btn-outline-success btn-sm"
        id=10
        cy-data=todo-5
        onClick="doneTODO(event)"
      >
        Done
      </button>
    </td>`;

        expect(getHtmlTodoTable("test todo", 5, 10)).toStrictEqual(row);
    });
});

// const mockDB = require('./mockDB');

// before(async () => await mockDB.connect());

describe("Test d'Integration", function() {

    it("addTODO", async function() {
        ToDo.deleteMany({});
        addTODO("TEST");
        const res = await ToDo.find();
        expect(res).toBe("TEST")
        ToDo.deleteMany({});
    });
});
