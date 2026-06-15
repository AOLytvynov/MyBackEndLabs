"use strict";

const output = document.getElementById("js-output");

function formatValue(value) {
    if (typeof value === "bigint") {
        return `${value.toString()}n`;
    }

    if (typeof value === "symbol") {
        return value.toString();
    }

    if (typeof value === "function") {
        return value.toString();
    }

    return JSON.stringify(value, (key, item) => {
        if (typeof item === "bigint") {
            return `${item.toString()}n`;
        }

        if (typeof item === "symbol") {
            return item.toString();
        }

        return item;
    }, 2);
}

function print(title, data) {
    console.log(title, data);

    if (!output) {
        return;
    }

    const block = document.createElement("article");
    block.className = "js-result";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const content = document.createElement("pre");
    content.textContent = formatValue(data);

    block.append(heading, content);
    output.append(block);
}
