import { CellActionType } from '../actionTypes';
import { CellType } from '../interfaces';

export type Direction = 'up' | 'down';

export interface MoveCellAction {
  type: CellActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface UpdateCellAction {
  type: CellActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface DeleteCellAction {
  type: CellActionType.DELETE_CELL;
  payload: {
    id: string;
  };
}

export interface InsertCellAfterAction {
  type: CellActionType.INSERT_CELL_AFTER;
  payload: {
    id: string;
    type: CellType;
  };
}

export interface StartBundling {
  type: CellActionType.START_BUNDLING;
  payload: {
    cellId: string;
  };
}

export interface StopBundling {
  type: CellActionType.STOP_BUNDLING;
  payload: {
    cellId: string;
    error: string | null;
  };
}

export type CellAction =
  | MoveCellAction
  | UpdateCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | StartBundling
  | StopBundling;
