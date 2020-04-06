import { toDoList } from './todoItem';
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

const form = document.querySelector('.new-to-do');
const nameField = document.querySelector('#to-name');
const descriptionField = document.querySelector('#to-description');
const dateField = document.querySelector('#to-date');
const priorityField = document.querySelector('#to-priority');
const projectFiled = document.querySelector('#to-project');
const storedTable = document.querySelector('.stored-table');
const newTable = document.querySelector('.new-table');
const descriptionOutput = document.querySelector('.description-info');
const descriptionTitle = document.querySelector('.description-title');
const descriptionContent = document.querySelector('.description-content');
const newItem = document.querySelector('.new-item');
const closeNew = document.querySelector('.close-new');
const newProjectBtn = document.querySelector('.new-project');
const newProject = document.querySelector('.project-form');
const newProjectName = document.querySelector('.project-name');
const closeProject = document.querySelector('.close-project');

const localData = getProject();

let projectId = localData[0];

// list default value creation
const listStored = localData[1];
let projectList = {};
if (localData[1] !== null) {
  projectList = listStored;
}

const addSingleOption = (key) => {
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

const createBtns = (id) => {
  const changeTd = document.createElement('td');
  const deleteTd = document.createElement('td');

  const changeBtn = document.createElement('a');
  changeBtn.textContent = 'Change';
  changeBtn.classList.add('btn');
  changeBtn.classList.add('btn-info');
  changeBtn.setAttribute('id', `change-${id}`);

  const deleteBtn = document.createElement('a');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('btn');
  deleteBtn.classList.add('btn-danger');
  deleteBtn.setAttribute('id', `delete-${id}`);

  changeTd.append(changeBtn);
  deleteTd.append(deleteBtn);

  return [changeTd, deleteTd];
};

const emptyValue = (array) => {
  array.forEach((element) => {
    element.value = '';
  });
};

const organizeStorage = (data, fromNow, cond = true) => {
  const newEntry = document.createElement('tr');
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
  if (cond) {
    storedTable.append(newEntry);
  } else {
    newTable.append(newEntry);
  }
  title.onclick = () => {
    descriptionTitle.textContent = data.name;
    descriptionContent.textContent = data.description;
    descriptionOutput.classList.toggle('closed');
  };
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

const dataToList = () => {
  projectForm();
  toggleActions();
  appendProjectsOptions();
  form.onsubmit = () => {
    const name = nameField.value;
    const description = descriptionField.value;
    const date = new Date(dateField.value);
    date.setDate(date.getDate() + 1);
    const priority = priorityField.value;
    const project = projectFiled.value;
    emptyValue([nameField, descriptionField, dateField, priorityField, projectFiled]);
    const data = toDoList(name, description, date, priority, project);
    organizeStorage(data, fromNow(date), false);
    form.classList.toggle('closed');
    return false;
  };
};

export { dataToList, organizeStorage };