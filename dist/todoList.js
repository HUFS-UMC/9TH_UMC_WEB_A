"use strict";
var todoInput = document.getElementById('todo-input');
var todoForm = document.getElementById('todo-form');
var todoList = document.getElementById('todo-list');
var doneList = document.getElementById('done-list');
var todos = [];
var doneTasks = [];
var renderTasks = function () {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach(function (todo) {
        var li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach(function (todo) {
        var li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
var getTodoText = function () {
    return todoInput.value.trim(); /*공백을 잘라줌*/
};
var addTodo = function (text) {
    todos.push({ id: Date.now(), text: text }); /*key, value가 같기에 text: 생략*/
    todoInput.value = ''; /*input value 다시 공백으로 초기화 */
    renderTasks();
};
var completeTodo = function (todo) {
    todos = todos.filter(function (t) { return t.id !== todo.id; }); /*내가 선택한 아이디 빼고 나머지를 다 보여줌*/
    doneTasks.push(todo); /*내가 선택한 값을 넣어줌 */
    renderTasks();
};
var deleteTodo = function (todo) {
    doneTasks = doneTasks.filter(function (t) { return t.id !== todo.id; }); /*삭제는 그냥 없애기만 하면 됨 */
    renderTasks();
};
var createTodoElement = function (todo, isDone) {
    var li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;
    var button = document.createElement('button');
    button.classList.add('render-container__item-button');
    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';
    }
    button.addEventListener('click', function () {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });
    li.appendChild(button);
    //appendChild는 무조건 return을 해야 함
    return li;
};
todoForm.addEventListener('submit', function (event) {
    event.preventDefault(); //값이 계속 초기화되는 것을 막음
    var text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
renderTasks();
