import React from 'react';
import { Direction } from '../../store/actions';

interface ActionBarProps {
  id: string;
  deleteCell: (id: string) => {};
  moveCell: (id: string, direction: Direction) => {};
}

const ActionBar: React.FC<ActionBarProps> = ({ id, deleteCell, moveCell }) => {
  return (
    <div>
      <button onClick={() => moveCell(id, 'up')}>Up</button>
      <button onClick={() => moveCell(id, 'down')}>Down</button>
      <button onClick={() => deleteCell(id)}>Delete</button>
    </div>
  );
};

export default ActionBar;
