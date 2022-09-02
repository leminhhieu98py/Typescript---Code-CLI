import { ActionType } from '../actionTypes';
import { CellType } from '../interfaces/Cell';

export type Direction = 'up' | 'down';
export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: {
    id: string;
  };
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string;
    type: CellType;
  };
}

export interface StartBundling {
  type: ActionType.START_BUNDLING;
  payload: {
    cellId: string;
  };
}

export interface StopBundling {
  type: ActionType.STOP_BUNDLING;
  payload: {
    cellId: string;
    error: string | null;
  };
}

export type Action =
  | MoveCellAction
  | UpdateCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | StartBundling
  | StopBundling;
