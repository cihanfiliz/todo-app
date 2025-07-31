import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggleComplete, onDeleteTodo }) {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
      {todos.length === 0 && (
        <p className="text-center text-gray-400 py-4">
          No task for this filter
        </p>
      )}
    </ul>
  );
}

export default TodoList;
