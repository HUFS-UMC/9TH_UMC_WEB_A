"use strict";
const input = document.querySelector('.todo-popup__input');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const doneList = document.getElementById('doneList');
addBtn.addEventListener('click', () => {
    if (!(input === null || input === void 0 ? void 0 : input.value.trim()))
        return;
    const li = document.createElement('li');
    li.className = 'todo-popup__item';
    li.innerHTML = `
    <span class="todo-popup__text">${input.value.trim()}</span>
    <button class="todo-popup__done-btn">완료</button>
    <button class="todo-popup__delete-btn">삭제</button>
  `;
    todoList.appendChild(li);
    input.value = '';
});
todoList.addEventListener('click', (event) => {
    const target = event.target;
    const listItem = target.closest('li');
    if (!listItem)
        return;
    if (target.classList.contains('todo-popup__done-btn')) {
        const doneItem = listItem.cloneNode(true);
        const doneBtn = doneItem.querySelector('.todo-popup__done-btn');
        if (doneBtn) {
            doneBtn.remove();
        }
        doneList.appendChild(doneItem);
        listItem.remove();
    }
    else if (target.classList.contains('todo-popup__delete-btn')) {
        listItem.remove();
    }
});
doneList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('todo-popup__delete-btn')) {
        const listItem = target.closest('li');
        if (listItem) {
            listItem.remove();
        }
    }
});
