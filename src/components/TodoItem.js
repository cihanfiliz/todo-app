import React from "react";

function TodoItem({ todo, onToggleComplete, onDeleteTodo }) {
  return (
    <li
      key={todo.id}
      className={`group flex items-center p-4 rounded-lg transition-all duration-200 ${
        todo.completed ? "bg-green-50 text-gray-500 line-through" : "bg-blue-50"
      }`}
    >
      <div
        onClick={() => onToggleComplete(todo.id)}
        className="flex items-center flex-grow cursor-pointer"
      >
        <span
          className={`flex-shrink-0 h-6 w-6 rounded-full mr-4 border-2 transition-all ${
            todo.completed ? "bg-green-400 border-green-400" : "border-gray-300"
          }`}
        ></span>
        <span className={`flex-grow ${todo.completed ? "line-through" : ""}`}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDeleteTodo(todo.id)}
        className="ml-4 text-gray-400 hover:text-red-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
      >
        X
      </button>
    </li>
  );
}

export default TodoItem;
