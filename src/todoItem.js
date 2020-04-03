import { getStorage, setStorage } from './localStorageData';

const moment = require('moment');

const localData = getStorage();

let idCount = localData[0];

// list default value creation
const listStored = localData[1];
let list = {};
if (localData[1] !== null) {
  list = listStored;
}

console.log(idCount);
console.log(list);

class Item {
  constructor(id, name, description, date, importance, project) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.importance = importance;
    this.project = project;
  }

  fromNow() {
    return moment(this.date).calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY',
    });
  }
}

const toDoList = (name, description, date, importance, project) => {
  idCount += 1;
  const newItem = new Item(idCount, name, description, date, importance, project);
  list[idCount] = newItem;
  setStorage(idCount, list);
};

export default toDoList;