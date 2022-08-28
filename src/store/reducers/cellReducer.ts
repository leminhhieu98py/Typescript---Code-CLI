import { Action } from '../actions';
import { ActionType } from '../actionTypes';
import { Cell } from '../interfaces/Cell';

interface CellState {
  isLoading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  isLoading: false,
  error: null,
  order: [],
  data: {}
};

const reducer = (
  state: CellState = initialState,
  action: Action
): CellState => {
  switch (action.type) {
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.UPDATE_CELL:
      return state;
    case ActionType.DELETE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;

    default:
      return state;
  }
};

export default reducer;
