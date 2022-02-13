import React from 'react';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

function TodoList({todos, setTodos}: Props) {
  return (
      <div className="container">
          <div className="todos">
            <span className="todos__heading">Active Tasks</span>
            {todos.map(todo => (
                <SingleTodo
                    todos={todos}
                    todo={todo}
                    key={todo.id}
                    setTodos={setTodos}
                />
            ))}
          </div>
          <div className="todos remove">
            <span className="todos__heading">Completed Tasks</span>
            {todos.map(todo => (
                <SingleTodo
                    todos={todos}
                    todo={todo}
                    key={todo.id}
                    setTodos={setTodos}
                />
            ))}
          </div>
      </div>
  );
}

export default TodoList;
