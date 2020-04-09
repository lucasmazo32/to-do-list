import {
  toDoList, listInformation, changeItem, deleteItem,
} from './todoItem';
import { setProject, getProject } from './localStorageData';

const moment = require('moment');

const fromNow = (date) => moment(date).calendar(null, {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: 'DD/MM/YYYY',
});

// new form
const form = document.querySelector('.new-to-do');
const nameField = document.querySelector('#to-name');
const descriptionField = document.querySelector('#to-description');
const dateField = document.querySelector('#to-date');
const priorityField = document.querySelector('#to-priority');
const projectFiled = document.querySelector('#to-project');
const storedTable = document.querySelector('.stored-table');
const newItem = document.querySelector('.new-item');
const closeNew = document.querySelector('.close-new');
// table
const newTable = document.querySelector('.new-table');
const descriptionOutput = document.querySelector('.description-info');
const descriptionTitle = document.querySelector('.description-title');
const descriptionContent = document.querySelector('.description-content');
// new project
const newProjectBtn = document.querySelector('.new-project');
const newProject = document.querySelector('.project-form');
const newProjectName = document.querySelector('.project-name');
const closeProject = document.querySelector('.close-project');
const projectTable = document.querySelector('.project-table');
// change form
const changeForm = document.querySelector('.change-to-do');
const closeChange = document.querySelector('.close-change');
const nameChange = document.querySelector('#change-name');
const descriptionChange = document.querySelector('#change-description');
const dateChange = document.querySelector('#change-date');
const importanceChange = document.querySelector('#change-priority');
// confirmation
const confirmationBox = document.querySelector('.confirmation');
const trueConfirm = document.querySelector('.confirmation-true');
const falseConfirm = document.querySelector('.confirmation-false');
// organize data button
const organizeBtn = document.querySelector('.organize');

// getting the data from the localhost
const localData = getProject();

let projectId = localData[0];

// list default value creation
const listStored = localData[1];
let projectList = {};
if (localData[1] !== null) {
  projectList = listStored;
}

// organize btn 

organizeBtn.onclick = () => {
  location.reload();
};

const addSingleOption = (key) => {
  const addTitleHeader = document.createElement('thead');
  const addTitle = document.createElement('th');
  addTitle.textContent = projectList[key];
  addTitleHeader.classList.add('thead-light');
  addTitleHeader.append(addTitle);
  const addBody = document.createElement('tbody');
  addBody.classList.add(`project-${key}`);
  projectTable.append(addTitleHeader, addBody);

  const newOption = document.createElement('option');
  newOption.textContent = projectList[key];
  newOption.value = key;
  projectFiled.append(newOption);
};

const appendProjectsOptions = () => {
  Object.keys(projectList).forEach((key) => {
    addSingleOption(key);
  });
};

const clickChange = (btn, id) => {
  btn.onclick = () => {
    const listObject = listInformation()[id];
    changeForm.classList.toggle('closed');
    changeForm.setAttribute('id', `form-${id}`);
    nameChange.value = listObject.name;
    descriptionChange.value = listObject.description;
    const date = new Date(listObject.date);
    date.setDate(date.getDate() - 1);
    dateChange.value = date.toISOString().slice(0, 10);
    importanceChange.value = listObject.importance;
  };
};

const clickDelete = (btn, id) => {
  btn.onclick = () => {
    confirmationBox.classList.toggle('closed');
    trueConfirm.onclick = () => {
      const tableRow = document.querySelector(`.container-${id}`);
      tableRow.classList.add('just-deleted');
      window.setTimeout(() => {
        tableRow.remove();
      }, 3000);
      deleteItem(id);
      confirmationBox.classList.toggle('closed');
    };
  };
};

const createBtns = (id) => {
  const changeTd = document.createElement('td');
  const deleteTd = document.createElement('td');

  const changeBtn = document.createElement('a');
  changeBtn.textContent = 'Change';
  changeBtn.classList.add('btn');
  changeBtn.classList.add('btn-info');
  changeBtn.setAttribute('id', `change-${id}`);
  clickChange(changeBtn, id);

  const deleteBtn = document.createElement('a');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('btn');
  deleteBtn.classList.add('btn-danger');
  deleteBtn.setAttribute('id', `delete-${id}`);
  clickDelete(deleteBtn, id);

  changeTd.append(changeBtn);
  deleteTd.append(deleteBtn);

  return [changeTd, deleteTd];
};


const organizeStorage = (data, fromNow, cond) => {
  const newEntry = document.createElement('tr');
  newEntry.classList.add(`container-${data.id}`);
  const title = document.createElement('th');
  const dueDate = document.createElement('td');
  const importance = document.createElement('td');

  title.textContent = data.name;
  title.setAttribute('scope', 'row');
  title.classList.add('title-clickable');
  title.setAttribute('id', `title-${data.id}`);
  dueDate.textContent = fromNow;
  importance.textContent = data.importance;
  importance.classList.add(data.importance);

  const btns = createBtns(data.id);

  newEntry.append(title, dueDate, importance, btns[0], btns[1]);
  if (cond === 'default') {
    storedTable.append(newEntry);
  } else if (cond === 'recent') {
    newTable.append(newEntry);
    if ( !organizeBtn.classList.contains('available') ){
      organizeBtn.classList.add('available');
    }
  } else {
    const location = document.querySelector(`.project-${cond}`);
    location.append(newEntry);
  }
  title.onclick = () => {
    descriptionTitle.textContent = data.name;
    descriptionContent.textContent = data.description;
    descriptionOutput.classList.toggle('closed');
  };
};

const changeFromDOM = (id, date) => {
  const tableRow = document.querySelector(`.container-${id}`);
  tableRow.remove();
  const data = listInformation()[id];
  organizeStorage(data, fromNow(date), 'recent');
};

const changeFormActions = () => {
  changeForm.onsubmit = () => {
    const id = Number(changeForm.getAttribute('id').slice(5));
    const name = nameChange.value;
    const description = descriptionChange.value;
    const date = new Date(dateChange.value);
    date.setDate(date.getDate() + 1);
    const priority = importanceChange.value;
    changeItem(id, name, description, date, priority);
    changeForm.classList.toggle('closed');
    changeFromDOM(id, date);
    return false;
  };
};


const emptyValue = (array) => {
  array.forEach((element) => {
    element.value = '';
  });
};

const toggleActions = () => {
  newItem.onclick = () => {
    form.classList.toggle('closed');
  };
  closeNew.onclick = () => {
    form.classList.toggle('closed');
  };
  newProjectBtn.onclick = () => {
    newProject.classList.toggle('closed');
  };
  closeProject.onclick = () => {
    newProject.classList.toggle('closed');
  };
  closeChange.onclick = () => {
    changeForm.classList.toggle('closed');
  };
  falseConfirm.onclick = () => {
    confirmationBox.classList.toggle('closed');
  };
};

const projectForm = () => {
  newProject.onsubmit = () => {
    projectId += 1;
    projectList[projectId] = newProjectName.value;
    emptyValue([newProjectName]);
    setProject(projectId, projectList);
    newProject.classList.toggle('closed');
    addSingleOption(projectId);
    return false;
  };
};

const newToDo = () => {
  form.onsubmit = () => {
    const name = nameField.value;
    const description = descriptionField.value;
    const date = new Date(dateField.value);
    date.setDate(date.getDate() + 1);
    const priority = priorityField.value;
    const project = projectFiled.value;
    emptyValue([nameField, descriptionField, dateField, priorityField, projectFiled]);
    const data = toDoList(name, description, date, priority, project);
    organizeStorage(data, fromNow(date), 'recent');
    form.classList.toggle('closed');
    return false;
  };
};

const dataToList = () => {
  changeFormActions();
  projectForm();
  toggleActions();
  appendProjectsOptions();
  newToDo();
};

export { dataToList, organizeStorage };