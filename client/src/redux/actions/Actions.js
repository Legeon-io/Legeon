import { createAction } from '@reduxjs/toolkit';

export const loginAction = createAction('LOGIN', ({ username }) => ({
  payload: { username },
}));

export const logoutAction = createAction('LOGOUT');
