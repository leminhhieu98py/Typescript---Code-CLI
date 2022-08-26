import { ActionType } from '../actionTypes';

interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: 'up' | 'down';
  };
}

interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: {
    id: string;
  };
}

interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: 'code' | 'markdown';
  };
}

export type Action =
  | MoveCellAction
  | UpdateCellAction
  | DeleteCellAction
  | InsertCellBeforeAction;
