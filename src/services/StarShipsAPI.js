import { fetchAPI } from '../config/helpers';

export const _starShipsAPI = () => {
  let route = '/starships';
  let method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };
  return fetchAPI(route, method);
};


export const _moreStarShipsAPI = (moreLink) => {
  let route = '/starships/?' + moreLink;
  let method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };
  return fetchAPI(route, method);
};


export const _specificStarShips = (link) => {
  console.log(link)
  let route = link[0].split("api").pop();
  let method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };
  return fetchAPI(route, method);
};