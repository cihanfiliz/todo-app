import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
        if (!response.ok) {
          throw new Error("An error occurred when retrieving the data.");
        }

        const data = await response.json();
        setTodos(data);
        setFilteredTodos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredTodos(todos);
    } else if (activeFilter === 'completed') {
      setFilteredTodos(todos.filter(todo => todo.completed));
    } else if (activeFilter === 'active') {
      setFilteredTodos(todos.filter(todo => !todo.completed));
    }
  }, [activeFilter, todos]);

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <header className="border-b-2 border-gray-200 pb-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-700">
            Things to do
          </h1>
          <p className="text-center text-gray-500 mt-2">Fetch Data Via React Hooks</p>
        </header>
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            lassName={`px-4 py-2 rounded-md font-semibold transition-all duration-200 ${activeFilter === 'all' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >All</button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 ${activeFilter === 'completed' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >Done</button>
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 ${activeFilter === 'active' ? 'bg-yellow-500 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >to do</button>
        </div>
        <main>
          {isLoading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500 font-semibold">{error}</p>}
          {!isLoading && !error && (
            <ul className="space-y-3">
              {filteredTodos.map(todo => (
                <li key={todo.id}
                  className={`flex items-center p-4 rounded-lg transition-all duration-200 ${todo.completed ? 'bg-green-50 text-gray-500 line-through' : 'bg-blue-50'
                    }`}>
                  <span className={`flex-shrink-0 h-6 w-6 rounded-full mr-4 ${todo.completed ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                  <span className="flex-grow">{todo.title}</span>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
