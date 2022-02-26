import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'

import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    todos: Todo[];
    todo: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number
}
function SingleTodo({ todos, setTodos, todo, index }: Props) {

    const [isEditActive, setIsEditActive] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        inputRef.current?.focus();
    }, [isEditActive])


    const handleDone = (id: number) => {
        setTodos(todos.map(mappingTodo => mappingTodo.id == id ? { ...mappingTodo, isDone: !mappingTodo.isDone } : mappingTodo))
    }
    const handleDelete = (id: number) => {
        setTodos(todos.filter(currentTodo => currentTodo.id != id))
    }
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map(mappingTodo => mappingTodo.id == id ? { ...mappingTodo, todo: editTodo } : mappingTodo));
        setEditTodo("");
        setIsEditActive(false);

    }
    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided, snapshot) => (
                    <form
                        className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
                        onSubmit={(e) => handleEdit(e, todo.id)}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        {isEditActive ? <input
                            ref={inputRef}
                            value={editTodo}
                            onChange={e => setEditTodo(e.target.value)}
                        /> :
                            todo.isDone ? (
                                <s className="todos__single__text">{todo.todo}</s>
                            ) : (
                                <span className="todos__single__text">{todo.todo}</span>
                            )}
                        <div>
                            <span className="icon" onClick={() => {
                                if (!isEditActive && !todo.isDone) {
                                    setIsEditActive(!isEditActive);
                                }
                            }}> <AiFillEdit /> </span>
                            <span className="icon" onClick={() => handleDelete(todo.id)}> <AiFillDelete /></span>
                            <span className="icon" onClick={() => handleDone(todo.id)}> <MdDone /> </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}

export default SingleTodo;
