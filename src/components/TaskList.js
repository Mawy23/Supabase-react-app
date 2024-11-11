import React from 'react';
import './TaskList.css'; // Importar el CSS específico del componente

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.description}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
