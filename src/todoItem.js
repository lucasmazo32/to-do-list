import { getStorage, setStorage } from './localStorageData';

const localData = getStorage();

let idCount = localData[0];

// list default value creation
const listStored = localData[1];
let list = {};
if (localData[1] !== null) {
  list = listStored;
}

class Item {
  constructor(id, name, description, date, importance, project) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.importance = importance;
    this.project = project;
  }
}

const toDoList = (name, description, date, importance, project) => {
  idCount += 1;
  const newItem = new Item(idCount, name, description, date, importance, project);
  list[idCount] = newItem;
  setStorage(idCount, list);
  return newItem;
};

const listInformation = () => list;

const changeItem = (id, name, description, date, priority) => {
  list[id].name = name;
  list[id].description = description;
  list[id].date = date;
  list[id].importance = priority;
  setStorage(idCount, list);
};

const deleteItem = (id) => {
  const succ = delete list[id];
  setStorage(idCount, list);
  return succ;
};

export {
  toDoList, listInformation, changeItem, deleteItem,
};