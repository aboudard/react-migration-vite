import React, { useEffect, useRef } from "react";
import packageJson from '../package.json';
import BundledEditor from "./BundledEditor";
function App() {


  const apiUrl = "/api/todos";
  const [todos, setTodos] = React.useState([]);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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

        <h2>Editor</h2>

        <BundledEditor
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue='<p>This is the initial content of the editor.</p>'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
            'searchreplace', 'table', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>

    </div>
  );
}
export default App;