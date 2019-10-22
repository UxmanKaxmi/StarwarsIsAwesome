import { fetchAPI } from '../config/helpers';

export const _starShipsAPI = user_id => {
  let route = '/starships';
  let method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };
  return fetchAPI(route, method);
};
