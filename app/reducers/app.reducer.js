import {
  GET_DATA,
} from '../actions/app.actions.js';

const appInitialState = {
  data: [],
};

export const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case [GET_DATA]:
      return {
        ...state,
        data: action.data
      }
    default:
      return state;
  }
};

export default appReducer;
