const moment = require('moment');

const list = [];

class Item {
  constructor(name, description, date, importance) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.importance = importance;
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

const toDoList = (name, description, date, importance) => {
  const newItem = new Item(name, description, date, importance);
  list.push(newItem);
  return list;
};

export default toDoList;