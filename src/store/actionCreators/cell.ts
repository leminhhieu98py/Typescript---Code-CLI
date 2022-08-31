import {
  MoveCellAction,
  UpdateCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  Direction
} from '../actions';
import { ActionType } from '../actionTypes';
import { CellType } from '../interfaces/Cell';

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction
    }
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: {
      id
    }
  };
};

export const insertCellAfter = (
  id: string,
  type: CellType
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type
    }
  };
};
