import React from 'react';

const TaskList = ({ tasks, updateTask, deleteTask, toggleTaskCompletion, startEditingTask }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <button onClick={() => toggleTaskCompletion(task.id, task.completed)}>
            {task.completed ? 'Marcar como no completada' : 'Marcar como completada'}
          </button>
          <button onClick={() => startEditingTask(task)}>Editar</button>
          <button onClick={() => deleteTask(task.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
