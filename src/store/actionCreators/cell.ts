import {
  MoveCellAction,
  UpdateCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  Direction
} from '../actions';
import { CellActionType } from '../actionTypes';
import { CellType } from '../interfaces/Cell';

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: CellActionType.MOVE_CELL,
    payload: {
      id,
      direction
    }
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: CellActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: CellActionType.DELETE_CELL,
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
    type: CellActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type
    }
  };
};

export const startBundling = (cellId: string) => {
  return {
    type: CellActionType.START_BUNDLING,
    payload: {
      cellId
    }
  };
};

export const stopBundling = (cellId: string, error: string | null) => {
  return {
    type: CellActionType.STOP_BUNDLING,
    payload: {
      cellId,
      error
    }
  };
};
