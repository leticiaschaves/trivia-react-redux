import { ADD_EMAIL, ADD_NAME, SAVE_SCORE } from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

// o reducer user apenas recebe o email da pagina home
function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  case ADD_NAME:
    return { ...state, name: action.payload };
  case SAVE_SCORE:
    return { ...state,
      assertions: state.assertions + 1,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
}

export default player;
