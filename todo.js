"use strict";

const API_URL = "https://jsonplaceholder.typicode.com";

const state = {
    tasks: [],
    filter: "all",
    search: "",
    user: null
};

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
