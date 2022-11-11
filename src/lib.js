import fs from "fs";
import { result } from "underscore";
import { getSystemErrorName } from "util";

export const chooseRandom = (array = [], numItems) => {
  if (array.length <= 1) {
    return array;
  }
  if (numItems < 1 || numItems > array.length) {
    numItems = math.floor(math.random() * (array.length + 1));
  }

  let result = [];
  let randomlySelectedItemsArray = [...array];

  for (let i = randomlySelectedItemsArray.length - 1; i > 0; i--) {
    let randomNumber = Math.floor(Math.random() * i);
    let x = randomlySelectedItemsArray[i];
    randomlySelectedItemsArray[i] = randomlySelectedItemsArray[randomNumber];
    randomlySelectedItemsArray[randomNumber] = x;
  }

  return randomlySelectedItemsArray.slice(0, numItems);
};

export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  let result = [];

  for (let question = 1; question <= numQuestions; question++) {
    result.push({
      type: "input",
      name: `question-${question}`,
      message: `Enter question ${question}`,
    });

    for (let choice = 1; choice <= numChoices; choice++) {
      result.push({
        type: "input",
        name: `question-${question}-choice-${choice}`,
        message: `Enter answer choice ${choice} for question ${question}`,
      });
    }
  }

  return result;
};

export const createQuestions = (obj = {}) => {
  let questionArray = [];
  let currentQuestionNumber;
  let questionName;
  let message;
  let choices = [];

  for (let key in obj) {
    if (!key.includes("choice") || !key.includes(currentQuestionNumber)) {
      currentQuestionNumber = key;
      questionName = key;
      message = obj[key];
    }

    if (key.includes("choice") && key.includes(currentQuestionNumber)) {
      choices.push(obj[key]);
    }

    let keys = Object.keys(obj);
    let nextIndex = keys.indexOf(key) + 1;
    let nextItem = keys[nextIndex];

    if (nextItem === undefined || !nextItem.includes(currentQuestionNumber)) {
      questionArray.push({
        type: "list",
        name: questionName,
        message: message,
        choices: choices,
      });
      choices = [];
    }
  }
  console.log(questionArray);
  return questionArray;
};

export const readFile = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)));
  });

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) =>
      err ? reject(err) : resolve("File saved successfully")
    );
  });
