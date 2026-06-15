"use strict";

const API_URL = "https://jsonplaceholder.typicode.com";

const state = {
    tasks: [],
    filter: "all",
    search: "",
    user: null
};

const taskTranslations = {
    "delectus aut autem": "вивчити основи DOM",
    "quis ut nam facilis et officia qui": "додати обробники подій",
    "fugiat veniam minus": "перевірити роботу форми",
    "et porro tempora": "завершити навчальне завдання",
    "laboriosam mollitia et enim quasi adipisci quia provident illum": "оформити список завдань",
    "qui ullam ratione quibusdam voluptatem quia omnis": "налаштувати фільтри завдань",
    "illo expedita consequatur quia in": "перевірити пошук за текстом",
    "quo adipisci enim quam ut ab": "реалізувати видалення завдань",
    "molestiae perspiciatis ipsa": "додати повідомлення про помилки",
    "illo est ratione doloremque quia maiores aut": "перевірити роботу API",
    "vero rerum temporibus dolor": "завантажити дані користувача",
    "ipsa repellendus fugit nisi": "оновити статус завдання",
    "et doloremque nulla": "зробити фінальну перевірку",
    "repellendus sunt dolores architecto voluptatum": "покращити вигляд карток",
    "ab voluptatum amet voluptas": "підготувати роботу до здачі",
    "accusamus eos facilis sint et aut voluptatem": "перевірити адаптивність сторінки",
    "quo laboriosam deleniti aut qui": "оформити README",
    "dolorum est consequatur ea mollitia in culpa": "перевірити консоль браузера",
    "molestiae ipsa aut voluptatibus pariatur dolor nihil": "виправити дрібні помилки",
    "ullam nobis libero sapiente ad optio sint": "завантажити роботу на GitHub"
};

function translateTaskTitle(title) {
    return taskTranslations[title] ?? title;
}
const elements = {
    form: document.querySelector("#todo-form"),
    input: document.querySelector("#task-input"),
    addButton: document.querySelector("#add-task-btn"),
    searchInput: document.querySelector("#search-input"),
    filters: document.querySelector("#todo-filters"),
    taskList: document.querySelector("#task-list"),
    counter: document.querySelector("#todo-counter"),
    loader: document.querySelector("#todo-loader"),
    error: document.querySelector("#todo-error"),
    user: document.querySelector("#todo-user")
};

function showLoader() {
    elements.loader.classList.remove("hidden");
}

function hideLoader() {
    elements.loader.classList.add("hidden");
}

function showError(message) {
    elements.error.textContent = message;
    elements.error.classList.remove("hidden");
}

function clearError() {
    elements.error.textContent = "";
    elements.error.classList.add("hidden");
}

function updateAddButton() {
    elements.addButton.disabled = elements.input.value.trim().length === 0;
}

function renderUserInfo(user) {
    state.user = user;

    elements.user.textContent = `Користувач: ${user.name} (${user.email})`;
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.dataset.id = task.id;

    if (task.completed) {
        li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.classList.add("task-checkbox");
    checkbox.setAttribute("aria-label", "Змінити статус завдання");

    const span = document.createElement("span");
    span.textContent = task.title;
    span.classList.add("task-title");

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Видалити";
    deleteButton.classList.add("task-delete");

    li.append(checkbox, span, deleteButton);

    return li;
}

function getVisibleTasks() {
    return state.tasks.filter((task) => {
        const matchesFilter =
            state.filter === "all"
            || (state.filter === "active" && !task.completed)
            || (state.filter === "completed" && task.completed);

        const matchesSearch = task.title
            .toLowerCase()
            .includes(state.search.toLowerCase());

        return matchesFilter && matchesSearch;
    });
}

function renderTasks() {
    elements.taskList.textContent = "";

    const visibleTasks = getVisibleTasks();

    visibleTasks.forEach((task) => {
        elements.taskList.append(createTaskElement(task));
    });

    updateCounter();
}

function updateCounter() {
    const activeCount = state.tasks.filter((task) => !task.completed).length;
    elements.counter.textContent = `Активних завдань: ${activeCount}`;
}

async function loadInitialData() {
    showLoader();
    clearError();

    try {
        const [todosResponse, userResponse] = await Promise.all([
            fetch(`${API_URL}/todos?_limit=20`),
            fetch(`${API_URL}/users/1`)
        ]);

        if (!todosResponse.ok || !userResponse.ok) {
            throw new Error("Помилка завантаження даних");
        }

        const [todos, user] = await Promise.all([
            todosResponse.json(),
            userResponse.json()
        ]);

        state.tasks = todos.map((task) => ({ ...task, title: translateTaskTitle(task.title) }));
        renderUserInfo(user);
        renderTasks();
    } catch (error) {
        showError("Не вдалося завантажити дані. Спробуйте пізніше.");
        console.error("Помилка завантаження:", error);
    } finally {
        hideLoader();
    }
}

async function loadInitialData() {
    showLoader();
    clearError();

    try {
        const [todosResponse, userResponse] = await Promise.all([
            fetch(`${API_URL}/todos?_limit=20`),
            fetch(`${API_URL}/users/1`)
        ]);

        if (!todosResponse.ok || !userResponse.ok) {
            throw new Error("Помилка завантаження даних");
        }

        const [todos, user] = await Promise.all([
            todosResponse.json(),
            userResponse.json()
        ]);

        state.tasks = todos.map((task) => ({ ...task, title: translateTaskTitle(task.title) }));
        renderUserInfo(user);
        renderTasks();
    } catch (error) {
        showError("Не вдалося завантажити дані. Спробуйте пізніше.");
        console.error("Помилка завантаження:", error);
    } finally {
        hideLoader();
    }
}

async function addTask(title) {
    showLoader();
    clearError();

    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                title,
                completed: false,
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }

        const createdTask = await response.json();

        const newTask = {
            ...createdTask,
            id: Date.now(),
            title,
            completed: false
        };

        state.tasks.unshift(newTask);
        elements.input.value = "";
        updateAddButton();
        renderTasks();
    } catch (error) {
        showError("Не вдалося створити завдання.");
        console.error("Помилка створення:", error);
    } finally {
        hideLoader();
    }
}

async function toggleTask(id, completed) {
    clearError();

    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ completed })
        });

        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }

        state.tasks = state.tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    completed
                };
            }

            return task;
        });

        renderTasks();
    } catch (error) {
        showError("Не вдалося оновити завдання.");
        console.error("Помилка оновлення:", error);
        renderTasks();
    }
}

function handleFormSubmit(event) {
    event.preventDefault();

    const title = elements.input.value.trim();

    if (!title) {
        return;
    }

    addTask(title);
}

function handleTaskListClick(event) {
    const target = event.target;
    const taskItem = target.closest(".task-item");

    if (!taskItem) {
        return;
    }

    const taskId = Number(taskItem.dataset.id);

    if (target.classList.contains("task-delete")) {
        deleteTask(taskId);
    }

    if (target.classList.contains("task-checkbox")) {
        toggleTask(taskId, target.checked);
    }
}

elements.form.addEventListener("submit", handleFormSubmit);
elements.taskList.addEventListener("click", handleTaskListClick);
elements.input.addEventListener("input", updateAddButton);

function handleFormSubmit(event) {
    event.preventDefault();

    const title = elements.input.value.trim();

    if (!title) {
        return;
    }

    addTask(title);
}

function handleTaskListClick(event) {
    const target = event.target;
    const taskItem = target.closest(".task-item");

    if (!taskItem) {
        return;
    }

    const taskId = Number(taskItem.dataset.id);

    if (target.classList.contains("task-delete")) {
        deleteTask(taskId);
    }

    if (target.classList.contains("task-checkbox")) {
        toggleTask(taskId, target.checked);
    }
}

elements.form.addEventListener("submit", handleFormSubmit);
elements.taskList.addEventListener("click", handleTaskListClick);
elements.input.addEventListener("input", updateAddButton);

function setActiveFilter(filter) {
    state.filter = filter;

    elements.filters.querySelectorAll(".filter-btn").forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === filter);
    });

    renderTasks();
}

elements.filters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");

    if (!button) {
        return;
    }

    setActiveFilter(button.dataset.filter);
});

function debounce(callback, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback.apply(this, args), delay);
    };
}

const handleSearch = debounce((event) => {
    state.search = event.target.value.trim();
    renderTasks();
}, 300);

elements.searchInput.addEventListener("input", handleSearch);

elements.input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        elements.input.value = "";
        updateAddButton();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.activeElement === elements.searchInput) {
        elements.searchInput.value = "";
        state.search = "";
        renderTasks();
    }
});

updateAddButton();
loadInitialData();

