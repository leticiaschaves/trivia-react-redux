import { ADD_EMAIL, ADD_NAME, RESET_SCORE, SAVE_SCORE } from './actionsTypes';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const addName = (name) => ({
  type: ADD_NAME,
  payload: name,
});

export const actionSaveScore = (score) => ({
  type: SAVE_SCORE,
  payload: score,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});
