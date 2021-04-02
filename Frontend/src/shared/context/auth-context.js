import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: true,
  userId: '604deed92e6612a489fe0547',
  login: () => {},
  logout: () => {}
});
