import React, { useEffect } from "react";
import packageJson from '../package.json';
function App() {


  const apiUrl = "/api/todos";
  const [todos, setTodos] = React.useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrl]);

  return (
    <div className="container p-3">
      <h1>Hello World..!</h1>
      <img src={'assets/images/ogure.png'} title="Ogure NG" style={{ maxHeight: 75 }} />
      <button style={{ color: 'blue' }}>{packageJson.version}</button>
      <p>Welcome to the application!</p>
      <h2>Todo List</h2>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;