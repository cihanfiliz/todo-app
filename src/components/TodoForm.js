import React from "react";

function TodoForm({ newTaskTitle, onNewTaskChange, onAddTask }) {
  return (
    <form onSubmit={onAddTask} className="flex mb-6">
      <input
        type="text"
        value={newTaskTitle}
        onChange={onNewTaskChange}
        placeholder="Add new task..."
        className="flex-grow p-3 border-2 border-gray-200 rounded-l-md focus:outline-none focus:border-blue-500 transition-colors"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-r-md font-semibold hover:bg-blue-600 transition-colors"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
