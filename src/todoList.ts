const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

const renderTasks = (): void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo) : void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo) : void => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};

const getTodoText = (): string => {
    return todoInput.value.trim(); /*공백을 잘라줌*/
};

const addTodo = (text: string): void => {
    todos.push({ id: Date.now(), text }); /*key, value가 같기에 text: 생략*/
    todoInput.value = ''; /*input value 다시 공백으로 초기화 */
    renderTasks();
};

const completeTodo = (todo: Todo) : void => {
    todos = todos.filter((t) : boolean => t.id !== todo.id); /*내가 선택한 아이디 빼고 나머지를 다 보여줌*/
    doneTasks.push(todo); /*내가 선택한 값을 넣어줌 */
    renderTasks(); 
};


const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);/*삭제는 그냥 없애기만 하면 됨 */
    renderTasks();
};

const createTodoElement = (todo: Todo, isDone:boolean): HTMLElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';
    }

    button.addEventListener('click', (): void => {
        if(isDone) {
            deleteTodo(todo);
        }
        else{
            completeTodo(todo);
        }
    });

    li.appendChild(button);
    //appendChild는 무조건 return을 해야 함
    return li;

};

todoForm.addEventListener('submit', (event:Event): void => {
    event.preventDefault(); //값이 계속 초기화되는 것을 막음
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});

renderTasks();