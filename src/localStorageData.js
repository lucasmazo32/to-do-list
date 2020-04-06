const currentIdCount = localStorage.getItem('id-count');
const currentList = localStorage.getItem('current-list');
const projectId = localStorage.getItem('project-id');
const projectList = localStorage.getItem('project-list');

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

const setProject = (id, list) => {
  localStorage['project-id'] = id;
  localStorage['project-list'] = JSON.stringify(list);
};

const getProject = () => {
  let id = 0;
  let list = {};
  if (projectId !== undefined) {
    id = Number(projectId);
    list = JSON.parse(projectList);
  }
  return [id, list];
};

export { getStorage, setStorage, setProject, getProject };