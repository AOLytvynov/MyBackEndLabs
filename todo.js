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
