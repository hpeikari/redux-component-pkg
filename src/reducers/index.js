import {
  SOME_ACTION,
  Increment
} from '../actions';

const initialState = {
  index: 0,
};

export default function reducer(state = initialState, action) {

  switch (action.type) {

    case Increment:
      return {
        ...state,
        index: state.index + 1
      };

    case SOME_ACTION:
      return {
        ...state,
        dataRedux: [
          ...state.dataRedux || [],
          action.obj
        ]
      };

    default:
      return state;
  }
}
