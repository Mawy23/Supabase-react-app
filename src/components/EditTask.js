
import React, { useState } from 'react';

const EditTask = ({ task, saveTask, cancelEditing }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    saveTask({ ...task, title, description });
  };

  return (
    <div>
      <h2>Editar Tarea</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={cancelEditing}>Cancelar</button>
    </div>
  );
};

export default EditTask;