import produce from 'immer';

import { Action } from '../actions';
import { ActionType } from '../actionTypes';
import { Cell } from '../interfaces/Cell';

interface CellState {
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  order: ['123', '1233'],
  data: {
    '123': {
      type: 'code',
      content: `console.log('Hello World');`,
      isLoading: false,
      error: null
    },
    '1233': {
      type: 'markdown',
      content: '# Hello world',
      isLoading: false,
      error: null
    }
  }
};

const reducer = produce(
  (state: CellState = initialState, action: Action): CellState => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        if (foundIndex === -1) return state;

        const targetIndex =
          action.payload.direction === 'up' ? foundIndex - 1 : foundIndex + 1;
        if (targetIndex === -1 || targetIndex === state.order.length)
          return state;

        const targetValue = state.order[targetIndex];
        state.order[targetIndex] = state.order[foundIndex];
        state.order[foundIndex] = targetValue;
        return state;

      case ActionType.UPDATE_CELL:
        state.data[action.payload.id].content = action.payload.content;
        return state;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload.id];
        state.order = state.order.filter((id) => id !== action.payload.id);
        return state;

      case ActionType.INSERT_CELL_AFTER:
        const index = state.order.findIndex((id) => id === action.payload.id);
        const newCellId = createRandomId();

        if (index !== -1) {
          state.order.splice(index + 1, 0, newCellId);
          state.data[newCellId] = {
            type: action.payload.type,
            content: '',
            isLoading: false,
            error: null
          };
        }
        return state;

      case ActionType.START_BUNDLING:
        state.data[action.payload.cellId].isLoading = true;
        return state;

      case ActionType.STOP_BUNDLING:
        state.data[action.payload.cellId].isLoading = false;
        if (action.payload.error) {
          state.data[action.payload.cellId].error = action.payload.error;
        }
        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;

const createRandomId = () => {
  return new Date().getTime().toString();
};
