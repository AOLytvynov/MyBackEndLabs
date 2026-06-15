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

/* Task 1. Variables and data types */

const stringValue = "JavaScript";
const numberValue = 42;
const booleanValue = true;
const nullValue = null;
let undefinedValue;
const symbolValue = Symbol("studentId");
const bigintValue = 12345678901234567890n;

const primitiveTypes = [
    { name: "string", value: stringValue, type: typeof stringValue },
    { name: "number", value: numberValue, type: typeof numberValue },
    { name: "boolean", value: booleanValue, type: typeof booleanValue },
    { name: "null", value: nullValue, type: typeof nullValue },
    { name: "undefined", value: undefinedValue, type: typeof undefinedValue },
    { name: "symbol", value: symbolValue, type: typeof symbolValue },
    { name: "bigint", value: bigintValue, type: typeof bigintValue }
];

const typeConversions = {
    stringFromNumber: String(125),
    stringFromBoolean: String(false),
    numberFromText: Number("123"),
    numberFromEmptyString: Number(""),
    numberFromTrue: Number(true),
    numberFromFalse: Number(false),
    numberFromNull: Number(null),
    numberFromUndefined: Number(undefined),
    falsyValues: [Boolean(0), Boolean(""), Boolean(null), Boolean(undefined), Boolean(NaN)],
    truthyValues: [Boolean("0"), Boolean([]), Boolean({}), Boolean("false"), Boolean(42)]
};

const studentName = "Артем";
const age = 20;
const university = "ХАІ";
const templateInfo = `Студент: ${studentName}, вік: ${age}, університет: ${university}`;

const equalityExamples = [
    { expression: "5 == '5'", result: 5 == "5" },
    { expression: "5 === '5'", result: 5 === "5" },
    { expression: "null == undefined", result: null == undefined },
    { expression: "null === undefined", result: null === undefined },
    { expression: "0 == false", result: 0 == false },
    { expression: "0 === false", result: 0 === false }
];

print("Task 1: primitive types", primitiveTypes);
print("Task 1: type conversions", typeConversions);
print("Task 1: template literal", templateInfo);
print("Task 1: equality examples", equalityExamples);
