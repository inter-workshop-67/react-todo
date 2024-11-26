import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([
        ...todos, 
        { 
          id: Date.now(), 
          text: inputValue, 
          completed: false 
        }
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed } 
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Todo List</h1>
      
      <div className="flex mb-4">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo"
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
          >
            <div className="flex items-center">
              <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-3 form-checkbox h-5 w-5 text-blue-600"
              />
              <span 
                className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
              >
                {todo.text}
              </span>
            </div>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 transition duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No todos yet. Add a todo!</p>
      )}
    </div>
  );
};

export default TodoApp;