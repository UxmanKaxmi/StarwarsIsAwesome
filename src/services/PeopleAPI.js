import { fetchAPI } from '../config/helpers';

export const _peopleAPI = () => {
  let route = '/people';
  let method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };
  return fetchAPI(route, method);
};

export const _morePeopleAPI = (moreLink) => {
  let route = '/people/?' + moreLink;
  let method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };
  return fetchAPI(route, method);
};

export const _specificPeople = (link) => {
  let route = link[0].split("api").pop();
  let method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };
  return fetchAPI(route, method);
};