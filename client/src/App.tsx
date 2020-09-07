import React, { FC, useState, useEffect, FormEvent } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './API';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';

const App: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const fetchTodos = async (): Promise<void> => {
    const {
      data: { todos },
    }: ITodo[] | any = await getTodos();
    setTodos(todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSaveTodo = async (
    e: FormEvent,
    formData: ITodo
  ): Promise<void> => {
    e.preventDefault();
    const { data, status }: any = await addTodo(formData);
    if (status !== 201) {
      throw new Error('Error! Todo not saved!');
    }
    setTodos(data.todos);
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not updated');
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted');
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="App">
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  );
};

export default App;
