import {
  STORE_ACTION,
  INCREMENT_INDEX_ACTION
} from '../actions';

const defaultState = {
  index: 0,
};

export default function reducer(state = defaultState, action) {
  const actionMap = {
    [INCREMENT_INDEX_ACTION]: () => ({
      ...state,
      index: state.index + 1
    }),

    [STORE_ACTION]: () => ({
      ...state,
      dataRedux: [
        ...state.dataRedux || [],
        action.obj
      ]
    })
  };

  return actionMap[action.type] ? actionMap[action.type]() : state;
};
