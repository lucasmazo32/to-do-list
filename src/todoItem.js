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
};

const listInformation = () => list;

export { toDoList, listInformation };