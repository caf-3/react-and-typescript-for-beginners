import React from 'react';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos: Todo[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

function TodoList({ todos, setTodos, completedTodos, setCompletedTodos }: Props) {
    return (
        <div className="container">
            <Droppable droppableId="ActiveTasks">
                {
                    (provided) => (
                        <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">Active Tasks</span>
                            {todos.map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    todos={todos}
                                    todo={todo}
                                    key={todo.id}
                                    setTodos={setTodos}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId="CompletedTasks">
                {
                    (provided) => (
                        <div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">Completed Tasks</span>
                            {completedTodos.map((todo, index) => (
                                <SingleTodo
                                    index={index}
                                    todos={todos}
                                    todo={todo}
                                    key={todo.id}
                                    setTodos={setCompletedTodos}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    );
}

export default TodoList;
