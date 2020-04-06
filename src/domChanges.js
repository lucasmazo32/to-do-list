import { toDoList } from './todoItem';
import { fromNow } from './dataManipulation';

const form = document.querySelector('form');
const nameField = document.querySelector('#to-name');
const descriptionField = document.querySelector('#to-description');
const dateField = document.querySelector('#to-date');
const priorityField = document.querySelector('#to-priority');
const projectFiled = document.querySelector('#to-project');
const storedTable = document.querySelector('.stored-table');
const newTable = document.querySelector('.new-table');

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
  const description = document.createElement('td');
  const dueDate = document.createElement('td');
  const project = document.createElement('td');
  const importance = document.createElement('td');

  title.textContent = data.name;
  title.setAttribute('scope', 'row');
  description.textContent = data.description;
  dueDate.textContent = fromNow;
  project.textContent = data.project;
  importance.textContent = data.importance;
  importance.classList.add(data.importance);

  const btns = createBtns(data.id);

  newEntry.append(title, description, dueDate, project, importance, btns[0], btns[1]);
  if (cond) {
    storedTable.append(newEntry);
  } else {
    newTable.append(newEntry);
  }
};

const dataToList = () => {
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
    return false;
  };
};

export { dataToList, organizeStorage };