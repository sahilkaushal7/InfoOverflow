const API_ROOT = 'http://localhost:8000';
const makeApiPath = (path: string) => `${API_ROOT}/${path}`;
export const Endpoints = {
  LOGIN: makeApiPath('users/login/'),
  USERS: makeApiPath('users/list/'),
  USERSPROFILE: makeApiPath('users/userprofile'),
  BLOGS: makeApiPath('blogs'),
  QUESTIONS: makeApiPath('questions/list'),
  ANSWERS: makeApiPath('answers'),
}
