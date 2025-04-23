import { useState } from "react";
import Swal from "sweetalert2";


function ToDoItem({ todo, todos, setTodos }) {
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleSave = () => {
    editTodo(todo.id, text);
    setEditing(false);
  };

  const handleKeySave = (e) =>{
    if (e.key === "Enter") {
        handleSave();
      }
  }

  const deleteTodo = async (id) => {
     const result = await Swal.fire({
      title: "Are you sure to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
    if(result.isConfirmed){
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <>
      <div className="flex gap-10 p-5 justify-between items-center">
        <li className="flex gap-10 items-center text-xl">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleDone(todo.id)}
          />
          <span className={todo.done ? "line-through text-red-700" : "none"}>
            {todo.text}
          </span>
        </li>
        {isEditing ? (
          <>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="input-field"
              onKeyDown={handleKeySave}
            />
            <button onClick={handleSave} className="button" >
              Save
            </button>
          </>
        ) : (
          <>
            {/* btn */}
            <div className="flex gap-5">
              <button onClick={() => setEditing(true)} className="edit-button">
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ToDoItem;
