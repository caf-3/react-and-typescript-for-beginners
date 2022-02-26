import React, { useState } from 'react';
import InputField from './components/InputField';
import './App.css'
import { Todo } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const generateId = (): number => Number(String(Math.random()).slice(5))

  const handleAdd = (e: React.FormEvent): void => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: generateId(), todo: todo, isDone: false }])
      setTodo('')
    }
  }

  const onDrangEnd = (result: DropResult) => {
    const { source, destination } = result;
    let add, active = todos;
    let complete = completedTodos;

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return

    if( source.droppableId === 'ActiveTasks'){

      // get the current todo that is being dragged
      add = active[source.index];
      // remove the selected todo
      active.splice(source.index, 1)
    }else{
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if( destination.droppableId === 'ActiveTasks'){
      add.isDone = false;
      active.splice(destination.index, 0, add);
    }else{
      add.isDone = true
      complete.splice(destination.index, 0, add)

    }
    setTodos(active);
    setCompletedTodos(complete)
  }

  return (
    <DragDropContext onDragEnd={onDrangEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
  )
}
export default App;
