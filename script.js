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

/* Task 2. Conditions */

function getGrade(score) {
    if (typeof score !== "number" || Number.isNaN(score) || score < 0 || score > 100) {
        return "невалідний бал";
    }

    if (score <= 59) {
        return "незадовільно";
    }

    if (score <= 74) {
        return "задовільно";
    }

    if (score <= 89) {
        return "добре";
    }

    return "відмінно";
}

function getSeasonUA(month) {
    switch (month) {
        case 12:
        case 1:
        case 2:
            return "зима";
        case 3:
        case 4:
        case 5:
            return "весна";
        case 6:
        case 7:
        case 8:
            return "літо";
        case 9:
        case 10:
        case 11:
            return "осінь";
        default:
            return "невалідний місяць";
    }
}

const studentAge = 19;
const adultStatus = studentAge >= 18 ? "повнолітній" : "неповнолітній";

print("Task 2: grades", [
    getGrade(45),
    getGrade(66),
    getGrade(82),
    getGrade(95),
    getGrade(-1),
    getGrade("90")
]);

print("Task 2: seasons", [
    getSeasonUA(1),
    getSeasonUA(4),
    getSeasonUA(7),
    getSeasonUA(10),
    getSeasonUA(15)
]);

print("Task 2: ternary operator", adultStatus);

/* Task 3. Arrays */

let students = [
    { name: "Олена Коваленко", grade: 87, courses: ["JavaScript", "HTML", "CSS"] },
    { name: "Іван Петренко", grade: 58, courses: ["HTML"] },
    { name: "Марія Шевченко", grade: 94, courses: ["JavaScript", "React"] },
    { name: "Андрій Бондар", grade: 73, courses: ["CSS", "HTML"] },
    { name: "Софія Мельник", grade: 91, courses: ["JavaScript", "CSS"] },
    { name: "Дмитро Сидоренко", grade: 66, courses: ["Git", "HTML"] }
];

students.push({ name: "Наталія Романенко", grade: 79, courses: ["JavaScript", "Git"] });
const removedLastStudent = students.pop();

const removedFromMiddle = students.splice(2, 1);
students.splice(2, 0, { name: "Артем Літвінов", grade: 88, courses: ["HTML", "CSS", "JavaScript"] });

const firstExcellentStudent = students.find((student) => student.grade > 90);
const jsStudents = students.filter((student) => student.courses.includes("JavaScript"));
const averageGrade = students.reduce((sum, student) => sum + student.grade, 0) / students.length;

print("Task 3: current students", students);
print("Task 3: removed last student", removedLastStudent);
print("Task 3: removed from middle", removedFromMiddle);
print("Task 3: first student with grade > 90", firstExcellentStudent);
print("Task 3: JavaScript students", jsStudents);
print("Task 3: average grade", averageGrade.toFixed(2));
