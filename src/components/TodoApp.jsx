import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../App';

export default function TodoApp({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

//loading states
  const [isLoading, setIsLoading] = useState(false); 
  const [deletingId, setDeletingId] = useState(null); 


  const fetchTodos = async () => {
    const res = await fetch('http://localhost:5000/todos', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      setTodos(data);
    } else {
      console.error(`Fetching failed with status: ${res.status}`);
    }
  };

  // Fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const logout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false);
    navigate('/'); 
  };

  //  Add todo
  const addTodo = async () => {
    if (text.trim() === '') return;

    setIsLoading(true); 

    const res = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ text })
    });

    setIsLoading(false); 

    if (res.ok) {
      fetchTodos();
      setText('');
    }
  };

  // Edit...save 
  const saveTodo = async () => {
    if (text.trim() === '') return;

    setIsLoading(true); 

    const res = await fetch(`http://localhost:5000/todos/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ text })
    });

    setIsLoading(false); 

    if (res.ok) {
      fetchTodos();
      setEditId(null);
      setText('');
    }
  };

  // delete todo
  const deleteTodo = async (id) => {
    setDeletingId(id); 
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setDeletingId(null); 

    if (res.ok) {
      fetchTodos();
    }
  };

  const startEdit = (todo) => {
    setText(todo.text);
    setEditId(todo.id); 
  };

  return (
    <div className="app_container">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Todo"
      />

      {editId ? (
        <button onClick={saveTodo} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      ) : (
        <button onClick={addTodo} disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>{todo.text}</p>
            <div className="button-group">
              <button onClick={() => startEdit(todo)}>Edit</button>
              <button
                onClick={() => deleteTodo(todo.id)} disabled={deletingId === todo.id}>
                {deletingId === todo.id ? 'Deleting...' : 'Del'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
