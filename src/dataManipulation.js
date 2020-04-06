import { listInformation } from './todoItem';
import { organizeStorage } from './domChanges';

const moment = require('moment');

const fromNow = (date) => moment(date).calendar(null, {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: 'DD/MM/YYYY',
});

const arrayCreation = () => {
  const list = listInformation();
  if (Object.keys(list).length !== 0) {
    const infoArray = [];
    Object.keys(list).forEach((key) => {
      infoArray.push(list[key]);
    });
    infoArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    infoArray.forEach((data) => {
      organizeStorage(data, fromNow(new Date(data.date)));
    });
  }
};

export { arrayCreation };