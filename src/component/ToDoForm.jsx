import React from "react";
import ToDoItem from "./ToDoItem";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

function ToDoForm() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInput = (e) => {
        setInput(e.target.value);
        if (error){
            setError("")
        }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addToDo();
    }
  };

  const addToDo = () => {
    if (!input) {
      setError("Plese fill the todo");
      return;
    }
    Swal.fire({
      title: "All Set!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
        done: false,
      },
    ]);
  };

  return (
    <div className="grid grid-cols-1  lg:grid-cols-2">
      <div className="bg-white w-full  flex flex-col gap-5 place-items-center place-content-center">
        <div className="mb-20 w-120">
          <div className="second-text">Todo List</div>
          <div className="text-slate-400">
            “Keep it chill and get stuff done — a fun, no-stress To Do List that
            works awesome on your phone!”
          </div>
        </div>
        <div className="card-input flex flex-col gap-5 items-center justify-center">
          <div className="title-text">Let's organized!</div>
          <div className="text-slate-400">Type your new ToDoList...</div>
          <input
            className="input-field"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Add a new todo"
            
          />
          <button onClick={addToDo} className="button">
            Add
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
      <div className="w-full min-h-screen p-10 bg-blue-500">
        <div className="title-text-todolists">Your ToDo Lists</div>
        <ul className="card-todoitem ">
          {todos.map((todo) => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoForm;
