class TodoApp {
    constructor() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.todoList = document.getElementById('todoList');
        this.todos = [];

        this.addBtn.addEventListener('click', () => this.addTodo());
        this.clearBtn.addEventListener('click', () => this.clearAll());
    }

    addTodo() {
        const todoText = this.todoInput.value.trim();
        if (todoText === '') return;

        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };

        this.todos.push(newTodo);
        this.renderTodo(newTodo);
        this.todoInput.value = '';
    }

    renderTodo(todo) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span>${todo.text}</span>
            <button class="deleteBtn">Delete</button>
            <button class="editBtn">Edit</button>
        `;

        li.querySelector('.deleteBtn').addEventListener('click', () => this.deleteTodo(todo.id));
        li.querySelector('.editBtn').addEventListener('click', () => this.editTodo(todo.id));
        li.querySelector('input[type="checkbox"]').addEventListener('change', (e) => this.toggleComplete(todo.id, e.target.checked));

        this.todoList.appendChild(li);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.renderTodos();
    }

    editTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) return;

        const newText = prompt('Edit todo:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            this.renderTodos();
        }
    }

    toggleComplete(id, completed) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = completed;
            this.renderTodos();
        }
    }

    clearAll() {
        this.todos = [];
        this.renderTodos();
    }

    renderTodos() {
        this.todoList.innerHTML = '';
        this.todos.forEach(todo => this.renderTodo(todo));
    }
}

new TodoApp();