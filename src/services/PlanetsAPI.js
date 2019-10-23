import { fetchAPI } from '../config/helpers';

export const _planetsAPI = () => {
  let route = '/planets';
  let method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };
  return fetchAPI(route, method);
};


export const _morePlanetsAPI = (moreLink) => {
  let route = '/planets/?' + moreLink;
  let method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };
  return fetchAPI(route, method);
};


export const _specificPlanet = (link) => {

  let route = link.split("api").pop();
  let method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };
  return fetchAPI(route, method);
};
