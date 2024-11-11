import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './App.css';


function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setTasks(data || []); // Asegura que 'data' sea un array o vacío si es null
    }
  };

  const addTask = async (task) => {
    const { data, error } = await supabase.from('tasks').insert([task]).select();
    if (error) {
      console.error('Error adding task:', error);
      return;
    }

    if (Array.isArray(data)) {
      setTasks([...tasks, ...data]);
    } else {
      console.error('Data returned is not an array:', data);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <AddTask onAddTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
