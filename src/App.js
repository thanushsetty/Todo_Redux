import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoForm from "./components/TodoForm";
import ToDo from "./components/ToDo";
import { addTodo, toggleComplete, setTodos } from "./features/todoSlice";

const App = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const [showDone, setShowDone] = useState(false);
  const [showUnDone, setShowUnDone] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const addTodoHandler = (newTodo) => {
    if (newTodo !== "") {
      const action = addTodo(newTodo.trim());
      dispatch(action);
    }
  };

  console.log(todos);

  const deleteTodoHandler = (remTodo) => {
    const filtered = todos.filter((item) => item.id !== remTodo);
    dispatch(setTodos(filtered));
  };

  const editTodoHandler = (id, editTodo) => {
    const updated = todos.map((item) =>
      item.id === id ? { ...item, title: editTodo } : item
    );
    dispatch(setTodos(updated));
  };

  const doneTodoHandler = (id) => {
    dispatch(toggleComplete({ id }));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setShowAll(true);
  }, [todos]);

  const completedTasks = todos.filter((item) => item.done);
  console.log(completedTasks);

  const uncompletedTasks = todos.filter((item) => !item.done);

  const onDoneHandler = () => {
    setShowDone(true);
    setShowAll(false);
    setShowUnDone(false);
  };

  const onAllHandler = () => {
    setShowAll(true);
    setShowDone(false);
    setShowUnDone(false);
  };

  const onUnDoneHandler = () => {
    setShowAll(false);
    setShowDone(false);
    setShowUnDone(true);
  };

  const deleteAllHandler = () => {
    dispatch(setTodos([]));
  };

  const deleteDoneHandler = () => {
    dispatch(setTodos(uncompletedTasks));
  };

  return (
    <div className="wrapper">
      <TodoForm adder={addTodoHandler} />
      <h2 className="subheading">Todo List</h2>
      <div className="buttons">
        <button onClick={onAllHandler}>All</button>
        <button onClick={onDoneHandler}>Done</button>
        <button onClick={onUnDoneHandler}>Todo</button>
      </div>
      {todos.map((todo) => {
        if (
          (showAll && !showDone && !showUnDone) ||
          (showDone && todo.done) ||
          (showUnDone && !todo.done)
        ) {
          return (
            <ToDo
              deleter={deleteTodoHandler}
              editer={editTodoHandler}
              title={todo.title}
              id={todo.id}
              done={todo.done}
              doner={doneTodoHandler}
              key={todo.id}
            />
          );
        }
        return null;
      })}

      <div className="allButtons">
        <button className="dd" onClick={deleteDoneHandler}>
          Delete Done Tasks
        </button>
        <button className="dd" onClick={deleteAllHandler}>
          Delete All Tasks
        </button>
      </div>
    </div>
  );
};

export default App;