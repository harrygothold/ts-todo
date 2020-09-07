import React, { FormEvent, FC, useState, ChangeEvent } from 'react';

type Props = {
  saveTodo: (e: FormEvent, formData: ITodo | any) => void;
};

const AddTodo: FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>();

  const handleForm = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSave = (e: FormEvent) => {
    saveTodo(e, formData);
    setFormData({
      name: '',
      description: '',
    });
  };

  return (
    <form className="Form" onSubmit={(e) => handleSave(e)}>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input onChange={handleForm} type="text" id="name" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input onChange={handleForm} type="text" id="description" />
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>Add Todo</button>
    </form>
  );
};

export default AddTodo;
