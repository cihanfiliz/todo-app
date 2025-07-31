import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import FilterButtons from "./components/FilterButtons";

function App() {
  const [todos, setTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=20"
        );
        if (!response.ok) {
          throw new Error("An error occurred when retrieving the data.");
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if(activeFilter === "completed") return todo.completed;
    if(activeFilter === "active") return !todo.completed;
    return true;
  })

  const handleAddTask = (e) => {
    e.preventDefault(); //prevents form to reload the page
    if (newTaskTitle.trim() === "") {
      alert("Please enter a task.");
      return;
    }
    const newTodo = {
      id: Date.now(), //simple unique id method
      title: newTaskTitle,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setNewTaskTitle("");
  };

  const handleToggleComplete = (id) => {
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updateTodos);
  };

  const handleDeleteTodo = (id) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <header className="border-b-2 border-gray-200 pb-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-700">
            Things to do
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Fetch Data Via React Hooks
          </p>
        </header>

        <TodoForm
          newTaskTitle={newTaskTitle}
          onNewTaskChange={(e) => setNewTaskTitle(e.target.value)}
          onAddTask={handleAddTask}
        />

        <FilterButtons
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <main>
          {isLoading && <p className="text-center text-gray-500">Loading...</p>}
          {error && (
            <p className="text-center text-red-500 font-semibold">{error}</p>
          )}
          {!isLoading && !error && (
            <TodoList
              todos={filteredTodos}
              onToggleComplete={handleToggleComplete}
              onDeleteTodo={handleDeleteTodo}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
