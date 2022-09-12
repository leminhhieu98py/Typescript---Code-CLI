import produce from 'immer';

import { CellAction } from '../actions';
import { CellActionType } from '../actionTypes';
import { Cell } from '../../typings';

const createRandomId = () => {
  return new Date().getTime().toString();
};

interface CellState {
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const randomId = createRandomId();

const initialEditorValue = `import { useState } from 'react';
const App = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => setCount(count + 1);
  const handleDecrease = () => setCount(count - 1);
  return (
    <>
      <span>Count: {count}</span>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease}>Decrease</button>
    </>
  );
};

show(<App />)`;

const initialState: CellState = {
  order: [randomId],
  data: {
    [randomId]: {
      type: 'code',
      content: initialEditorValue,
      isLoading: false,
      error: null
    }
  }
};

const reducer = produce(
  (state: CellState = initialState, action: CellAction): CellState => {
    switch (action.type) {
      case CellActionType.MOVE_CELL:
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

      case CellActionType.UPDATE_CELL:
        state.data[action.payload.id].content = action.payload.content;
        return state;

      case CellActionType.DELETE_CELL:
        delete state.data[action.payload.id];
        state.order = state.order.filter((id) => id !== action.payload.id);
        return state;

      case CellActionType.INSERT_CELL_AFTER:
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

      case CellActionType.START_BUNDLING:
        state.data[action.payload.cellId].isLoading = true;
        return state;

      case CellActionType.STOP_BUNDLING:
        state.data[action.payload.cellId].isLoading = false;
        state.data[action.payload.cellId].error = action.payload.error;
        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
