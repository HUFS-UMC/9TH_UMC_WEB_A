const input = document.querySelector<HTMLInputElement>('.todo-popup__input');
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const todoList = document.getElementById('todoList') as HTMLUListElement;
const doneList = document.getElementById('doneList') as HTMLUListElement;

// 할 일 추가
addBtn.addEventListener('click', () => {
  if (!input?.value.trim()) return;

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

// 이벤트 위임을 사용하여 동적으로 생성된 버튼 처리
todoList.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const listItem = target.closest('li');

  if (!listItem) return;

  if (target.classList.contains('todo-popup__done-btn')) {
    // '완료' 버튼 클릭 시
    const doneItem = listItem.cloneNode(true) as HTMLLIElement;
    
    // 복제된 항목에서 '완료' 버튼 제거
    const doneBtn = doneItem.querySelector('.todo-popup__done-btn');
    if (doneBtn) {
      doneBtn.remove();
    }
    
    doneList.appendChild(doneItem);
    listItem.remove(); // 원본 항목 제거
  } else if (target.classList.contains('todo-popup__delete-btn')) {
    // '삭제' 버튼 클릭 시
    listItem.remove();
  }
});

// 완료 목록에서 삭제 기능만 추가
doneList.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('todo-popup__delete-btn')) {
    const listItem = target.closest('li');
    if (listItem) {
      listItem.remove();
    }
  }
});