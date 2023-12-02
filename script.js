document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.querySelector('#add-btn');
  const inputField = document.querySelector('#input-box');
  const listContainer = document.querySelector('#list-container');
  const taskCounter = document.querySelector('#task-counter');

  loadTasks();

  addButton.addEventListener('click', function () {
      const taskText = inputField.value.trim();
      if (taskText) {
          addTask(taskText);
          inputField.value = '';
          saveTasks();
          updateEmptyState();
      }
  });

  listContainer.addEventListener('click', function (e) {
      if (e.target.tagName === 'LI') {
          e.target.classList.toggle('checked');
          saveTasks();
          updateEmptyState();
      } else if (e.target.classList.contains('delete-btn')) {
          e.target.parentElement.remove();
          saveTasks();
          updateEmptyState();
      }
  });

  function addTask(taskText) {
      const listItem = document.createElement('li');
      listItem.textContent = taskText;

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '&#128465;'; 
      deleteButton.classList.add('delete-btn');
      listItem.appendChild(deleteButton);


      listContainer.appendChild(listItem);
      updateTaskCounter();
  }

  function saveTasks() {
      const tasks = [];
      document.querySelectorAll('#list-container li').forEach(li => {
          tasks.push({ text: li.textContent, completed: li.classList.contains('checked') });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      updateTaskCounter();
  }

  function updateTaskCounter() {
      const taskCount = listContainer.children.length;
      taskCounter.textContent = `Tasks: ${taskCount}`;
      updateEmptyState();
  }

  function updateEmptyState() {
      const emptyState = document.getElementById('empty-state');
      if (listContainer.children.length === 0) {
          emptyState.classList.remove('hidden');
      } else {
          emptyState.classList.add('hidden');
      }
  }

  function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      storedTasks.forEach(task => {
          const listItem = document.createElement('li');
          listItem.textContent = task.text;
          if (task.completed) {
              listItem.classList.add('checked');
          }

          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = '&#128465;';
          deleteButton.classList.add('delete-btn');
          listItem.appendChild(deleteButton);

          listContainer.appendChild(listItem);
      });
      updateTaskCounter();
  }

  updateEmptyState();
});
