export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  //BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',

  ENDPOINTS: {
    USERS: '/api/users',
  },
};
