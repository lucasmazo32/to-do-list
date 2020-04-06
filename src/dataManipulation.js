import { listInformation } from './todoItem';

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
  Object.keys(list).forEach((key) => {
    fromNow(new Date(list[key].date));
  });
};

export { arrayCreation };