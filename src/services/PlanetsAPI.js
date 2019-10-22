import { fetchAPI } from '../config/helpers';

export const _planetsAPI = user_id => {
  let route = '/planets';
  let method = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    }),
  };
  return fetchAPI(route, method);
};
