
function start() {
  fetch('/todo', {
    method: 'GET',
    mode:'no-cors'
  })
  .then((res) => res.json())
  .then((body) => {

    body.forEach((todo, index) => {
      insertTODO(todo, index)
    })
  })
}

function insertTODO(todo, index) {
  const todoBody = document.getElementById('todo-body');
  const doneBody = document.getElementById('done-body');

  if (todo.done) {
    // add to done  
    doneBody.appendChild(getTodoDone(todo.text));
  } else {
    // add to todo table
    todoBody.appendChild(getTodoTable(todo.text, index, todo._id));
  }
}

function getHtmlTodoDone(text) {
  const row = document.createElement('tr');
  row.innerHTML = `<td>${text}</td>`;
  return row;
}

function getHtmlTodoTable(text, index, id) {
  const row = document.createElement('tr');
  row.id = `todo-${index}`;
  row.innerHTML = `
    <td scope="row" class="text-left">${text}</td>
    <td>
      <button
        class="btn btn-outline-success btn-sm"
        id=${id}
        cy-data=${'todo-' + index}
        onClick="doneTODO(event)"
      >
        Done
      </button>
    </td>`;
  return row;
}

function createTODO() {
  const todo = document.querySelector('input').value;
  addTODO(todo);
}

function addTODO(todo) {
  fetch('/todo', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: todo, done: false })
  })
  .then(() => window.location.reload());
}

function doneTODO(event) {
  const { id } = event.target;
  fetch(`/todo/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ done: true })
  })
  .then(() => window.location.reload());
}

module.exports = {
  addTODO, 
  getHtmlTodoDone,
  getHtmlTodoTable,
  start
};