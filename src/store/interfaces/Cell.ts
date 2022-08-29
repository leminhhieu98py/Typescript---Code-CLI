export type CellType = 'code' | 'markdown'; // Cell can be a Code Cell or a MarkDown Cell

export interface Cell {
  type: CellType;
  content: string;
}
