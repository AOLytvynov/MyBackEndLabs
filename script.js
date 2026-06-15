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

/* Task 4. Functions */

function rectangleAreaDeclaration(width, height) {
    return width * height;
}

const rectangleAreaExpression = function (width, height) {
    return width * height;
};

const rectangleAreaArrow = (width, height) => width * height;

function createCounter() {
    let value = 0;

    return {
        increment() {
            value += 1;
            return value;
        },
        decrement() {
            value -= 1;
            return value;
        },
        getValue() {
            return value;
        }
    };
}

function createUser(name, role = "student", isActive = true) {
    return {
        name,
        role,
        isActive
    };
}

const sum = (...numbers) => numbers.reduce((total, number) => total + number, 0);

function printStudentInfo({ name, grade, courses }) {
    return `${name} має оцінку ${grade}. Курси: ${courses.join(", ")}`;
}

const counter = createCounter();
const counterResults = [
    counter.increment(),
    counter.increment(),
    counter.decrement(),
    counter.getValue()
];

print("Task 4: rectangle area", {
    declaration: rectangleAreaDeclaration(5, 4),
    expression: rectangleAreaExpression(5, 4),
    arrow: rectangleAreaArrow(5, 4)
});

print("Task 4: closure counter", counterResults);
print("Task 4: default parameters", [
    createUser("Артем"),
    createUser("Олена", "mentor", false)
]);
print("Task 4: rest parameters", [sum(1, 2, 3), sum(10, 20)]);
print("Task 4: destructuring", printStudentInfo(students[0]));

/* Task 5. Objects */

const studentProfile = {
    firstName: "Артем",
    lastName: "Літвінов",
    age: 20,
    university: "ХАІ",
    grades: {
        math: 85,
        physics: 92,
        programming: 94,
        lab: 96
    },
    isActive: true,
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    getAverageGrade() {
        const grades = Object.values(this.grades);
        return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    }
};

const dynamicKey = "university";
const profileCopy = {
    ...studentProfile,
    university: "National Aerospace University"
};

const labScore = studentProfile.grades?.lab;
const mentorName = studentProfile.mentor?.name ?? "Не призначено";

print("Task 5: object methods", {
    fullName: studentProfile.getFullName(),
    averageGrade: studentProfile.getAverageGrade().toFixed(2)
});

print("Task 5: property access", {
    dotNotation: studentProfile.firstName,
    bracketNotation: studentProfile["lastName"],
    dynamicKey: studentProfile[dynamicKey]
});

print("Task 5: object iteration", {
    keys: Object.keys(studentProfile),
    values: Object.values(studentProfile),
    entries: Object.entries(studentProfile)
});

print("Task 5: spread copy", {
    originalUniversity: studentProfile.university,
    copiedUniversity: profileCopy.university
});

print("Task 5: optional chaining", {
    labScore,
    mentorName
});

/* Task 6. Array method chains */

const products = [
    { name: "Ноутбук", price: 25000, category: "electronics", inStock: true, quantity: 5 },
    { name: "Мишка", price: 600, category: "electronics", inStock: true, quantity: 12 },
    { name: "Клавіатура", price: 1400, category: "electronics", inStock: false, quantity: 7 },
    { name: "Монітор", price: 7200, category: "electronics", inStock: true, quantity: 3 },
    { name: "Стілець", price: 3500, category: "furniture", inStock: true, quantity: 4 },
    { name: "Стіл", price: 5200, category: "furniture", inStock: false, quantity: 2 },
    { name: "Блокнот", price: 120, category: "stationery", inStock: true, quantity: 30 },
    { name: "Ручка", price: 35, category: "stationery", inStock: true, quantity: 100 }
];

const totalStockValue = products
    .filter((product) => product.inStock)
    .map((product) => product.price * product.quantity)
    .reduce((total, value) => total + value, 0);

const electronicsByPrice = products
    .filter((product) => product.category === "electronics")
    .sort((a, b) => a.price - b.price)
    .map((product) => product.name);

const productsByCategory = products.reduce((result, product) => {
    result[product.category] = (result[product.category] ?? 0) + 1;
    return result;
}, {});

const studentsByGrade = [...students].sort((a, b) => b.grade - a.grade);
const studentsByName = [...students].sort((a, b) => a.name.localeCompare(b.name, "uk"));

print("Task 6: total stock value", totalStockValue);
print("Task 6: electronics by price", electronicsByPrice);
print("Task 6: products by category", productsByCategory);
print("Task 6: students by grade", studentsByGrade);
print("Task 6: students by name", studentsByName);

/* Task 7. Strings */

function capitalize(str) {
    if (!str) {
        return "";
    }

    const normalized = str.toLowerCase();
    return normalized[0].toUpperCase() + normalized.slice(1);
}

function countWords(str) {
    return str.trim().split(" ").filter((word) => word.length > 0).length;
}

function truncate(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    }

    return `${str.slice(0, maxLength)}...`;
}

function isValidEmail(email) {
    const atIndex = email.indexOf("@");
    const lastAtIndex = email.lastIndexOf("@");
    const dotIndex = email.lastIndexOf(".");

    return email.includes("@")
        && atIndex === lastAtIndex
        && atIndex > 0
        && dotIndex > atIndex + 1
        && email.length - dotIndex - 1 >= 2;
}

print("Task 7: capitalize", [
    capitalize("javaScript"),
    capitalize("hello world"),
    capitalize("")
]);

print("Task 7: count words", [
    countWords("JavaScript це круто"),
    countWords(" пробіли між словами "),
    countWords("")
]);

print("Task 7: truncate", [
    truncate("Це довгий текст для прикладу", 15),
    truncate("Короткий", 20)
]);

print("Task 7: email validation", [
    { email: "user@example.com", valid: isValidEmail("user@example.com") },
    { email: "invalid-email", valid: isValidEmail("invalid-email") },
    { email: "@example.com", valid: isValidEmail("@example.com") },
    { email: "user@.com", valid: isValidEmail("user@.com") }
]);
