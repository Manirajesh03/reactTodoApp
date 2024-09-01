import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState();

  const fetchTodos = () => {
    fetch("https://dummyjson.com/todos").then((res) =>
      res
        .json()
        .then((res) => setTodos(res.todos))
        .catch((err) => console.log(err))
    );
  };

  const addTodo = () => {
    const newTodos = { id: todos.length + 1, todo: newTodo, completed: false };
    setTodos([newTodos, ...todos]);
  };

  const removeTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="d-flex flex-column container justify-content-center align-items-center">
      <h1 className="text-center m-4">Todo App</h1>
      <div className="input-group mb-3 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="New Todo"
          name="newTodo"
          onChange={(e) => setNewTodo(e.target.value)}
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <button
          class="btn btn-outline-primary"
          type="button"
          id="button-addon2"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      {todos?.map((todo) => (
        <div key={todo.id} className="border border-primary m-1 rounded-2 w-50">
          <ul className="d-flex   align-items-center m-0 p-1">
            <li className="mx-5">Todo: {todo.todo}</li>
            <li className="list-unstyled">
              Status: {todo.completed ? "Completed" : "Not Completed"}
            </li>
            <button
              className="mx-5 btn btn-outline-danger"
              onClick={() => removeTodo(todo.id)}
            >
              Done
            </button>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Todo;
