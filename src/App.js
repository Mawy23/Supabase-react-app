import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';  // Asegúrate de que la importación sea correcta
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';  // Importa el componente EditTask
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalTasks, setTotalTasks] = useState(0);
  const [editingTask, setEditingTask] = useState(null); // Nuevo estado para la tarea en edición

  useEffect(() => {
    fetchTasks();
  }, [filter, page]);

  const fetchTasks = async () => {
    let query = supabase.from('tasks')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (filter === 'completed') {
      query = query.eq('completed', true);
    } else if (filter === 'not_completed') {
      query = query.eq('completed', false);
    }

    const { data, error, count } = await query;
    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setTasks(data || []);
      setTotalTasks(count);
    }
  };

  const addTask = async (task) => {
    console.log('Añadiendo tarea:', task);

    const { data, error } = await supabase.from('tasks').insert([{
      title: task.title,
      description: task.description,
      completed: task.completed
    }]).select();

    if (error) {
      console.error('Error al añadir tarea:', error.message);
      return;
    }

    console.log('Respuesta de la inserción:', data);
    if (Array.isArray(data)) {
      setTasks([...tasks, ...data]);
    }
  };

  const updateTask = async (id, updates) => {
    const { data, error } = await supabase.from('tasks').update(updates).eq('id', id).select();
    if (error) {
      console.error('Error updating task:', error);
      return;
    }

    if (Array.isArray(data)) {
      setTasks(tasks.map(task => task.id === id ? data[0] : task));
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) {
      console.error('Error deleting task:', error);
      return;
    }

    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = async (id, currentStatus) => {
    const updates = { completed: !currentStatus };
    const { data, error } = await supabase.from('tasks').update(updates).eq('id', id).select();
    if (error) {
      console.error('Error updating task:', error);
      return;
    }

    if (Array.isArray(data)) {
      setTasks(tasks.map(task => task.id === id ? data[0] : task));
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page * pageSize < totalTasks) {
      setPage(page + 1);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1); // Reset page to 1 when filter changes
  };

  const startEditingTask = (task) => {
    setEditingTask(task);
  };

  const saveTask = async (task) => {
    const { data, error } = await supabase.from('tasks').update(task).eq('id', task.id).select();
    if (error) {
      console.error('Error updating task:', error);
      return;
    }

    if (Array.isArray(data)) {
      setTasks(tasks.map(t => t.id === task.id ? data[0] : t));
      setEditingTask(null); // Terminar la edición
    }
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  return (
    <div className="App">
      <h1>Gestor de Tareas</h1>
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} toggleTaskCompletion={toggleTaskCompletion} startEditingTask={startEditingTask} />
      {editingTask && (
        <EditTask task={editingTask} saveTask={saveTask} cancelEditing={cancelEditing} />
      )}
      {/* Eliminamos los botones de paginación y filtros */}
    </div>
  );
}

export default App;
