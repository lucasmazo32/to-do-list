import toDoList from './todoItem';

const form = document.querySelector('form');
const nameField = document.querySelector('#to-name');
const descriptionField = document.querySelector('#to-description');
const dateField = document.querySelector('#to-date');
const priorityField = document.querySelector('#to-priority');
const projectFiled = document.querySelector('#to-project');

const emptyValue = (array) => {
  array.forEach((element) => {
    element.value = '';
  });
};

const dataToList = () => {
  form.onsubmit = () => {
    const name = nameField.value;
    const description = descriptionField.value;
    const date = new Date(dateField.value);
    const priority = priorityField.value;
    const project = projectFiled.value;
    emptyValue([nameField, descriptionField, dateField, priorityField, projectFiled]);
    toDoList(name, description, date, priority, project);
    return false;
  };
};

export default dataToList;