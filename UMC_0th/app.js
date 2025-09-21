const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && input.value.trim() !== "") {
    addTodo(input.value.trim());
    input.value = "";
  }
});

function addTodo(task) {
  const li = document.createElement("li");
  li.textContent = task;

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "완료";
  completeBtn.className = "complete-btn";
  completeBtn.addEventListener("click", () => completeTodo(li, task));

  li.appendChild(completeBtn);
  todoList.appendChild(li);
}

function completeTodo(item, task) {
  item.remove();

  const li = document.createElement("li");
  li.textContent = task;
  li.classList.add("done");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => li.remove());

  li.appendChild(deleteBtn);
  doneList.appendChild(li);
}
