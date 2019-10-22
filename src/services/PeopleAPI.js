import {fetchAPI} from '../config/helpers';

export const _peopleAPI = user_id => {
  let route = '/people';
  let method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
 
  };
  return fetchAPI(route, method);
};
