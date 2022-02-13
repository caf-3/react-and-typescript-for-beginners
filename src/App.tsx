import React, { useState } from 'react';
import InputField from './components/InputField';
import './App.css'
import { Todo } from './model';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const generateId = ():number => Number(String(Math.random()).slice(5)) 

  const handleAdd = (e: React.FormEvent):void => {
    e.preventDefault();
    if(todo){
      setTodos([...todos, { id: generateId(), todo: todo, isDone: false }])
      setTodo('')
    }
  }

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}
export default App;
