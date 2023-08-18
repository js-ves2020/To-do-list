import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (inputTask.trim() !== '') {
      setTasks([...tasks, { text: inputTask, completed: false, status: 'inProgress' }]);
      setInputTask('');
    }
  };

  const toggleTaskCompletion = index => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const updateTaskStatus = (index, newStatus) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = index => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const filterTasks = status => {
    setFilter(status);
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  return (
    <div className="app">
      <header className="header">
        <h1>Todo List</h1>
        <div className="add-task">
          <input
            type="text"
            value={inputTask}
            onChange={e => setInputTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <button onClick={addTask}>{inputTask.trim() === '' ? '+' : '+'}</button>
        </div>
        <div className="filter">
          <button onClick={() => filterTasks('all')}>All</button>
          <button onClick={() => filterTasks('inProgress')}>In Progress</button>
          <button onClick={() => filterTasks('completed')}>Completed</button>
          <button onClick={() => filterTasks('cancelled')}>Cancelled</button>
        </div>
      </header>
      <main className="main">
        <div className="task-list">
          {filteredTasks.map((task, index) => (
            <div key={index} className={`task-card ${task.completed ? 'completed' : ''}`}>
              <span
                className={`task-text ${task.completed ? 'completed' : ''}`}
                onClick={() => toggleTaskCompletion(index)}
              >
                {task.text}
              </span>
              <div className="status-buttons">
                <label>
                  <input
                    type="radio"
                    name={`status-${index}`}
                    value="inProgress"
                    checked={task.status === 'inProgress'}
                    onChange={() => updateTaskStatus(index, 'inProgress')}
                  />
                  In Progress
                </label>
                <label>
                  <input
                    type="radio"
                    name={`status-${index}`}
                    value="completed"
                    checked={task.status === 'completed'}
                    onChange={() => updateTaskStatus(index, 'completed')}
                  />
                  Completed
                </label>
                <label>
                  <input
                    type="radio"
                    name={`status-${index}`}
                    value="cancelled"
                    checked={task.status === 'cancelled'}
                    onChange={() => updateTaskStatus(index, 'cancelled')}
                  />
                  Cancelled
                </label>
              </div>
              <button onClick={() => removeTask(index)}>-</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
