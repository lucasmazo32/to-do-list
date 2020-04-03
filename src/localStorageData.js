const currentIdCount = localStorage.getItem('id-count');
const currentList = localStorage.getItem('current-list');

const getStorage = () => {
  let id = 0;
  let list = {};
  if (currentIdCount !== undefined) {
    id = Number(currentIdCount);
    list = JSON.parse(currentList);
  }
  return [id, list];
};

const setStorage = (idCount, list) => {
  localStorage['id-count'] = idCount;
  localStorage['current-list'] = JSON.stringify(list);
};

export { getStorage, setStorage };