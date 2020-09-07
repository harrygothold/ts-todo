import axios from 'axios';

const baseUrl: string = 'http://localhost:4000';

export const getTodos = async (): Promise<APIResponse> => {
  try {
    const todos: APIResponse = await axios.get(baseUrl + '/todos');
    return todos;
  } catch (error) {
    throw new Error(error);
  }
};

export const addTodo = async (formData: ITodo): Promise<APIResponse> => {
  try {
    const todo: Omit<ITodo, '_id'> = {
      name: formData.name,
      description: formData.description,
      status: false,
    };
    const savedTodo: APIResponse = await axios.post(
      baseUrl + '/add-todo',
      todo
    );
    return savedTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTodo = async (todo: ITodo): Promise<APIResponse> => {
  try {
    const todoUpdate: Pick<ITodo, 'status'> = {
      status: true,
    };
    const updatedTodo: APIResponse = await axios.put(
      `${baseUrl}/edit-todo/${todo._id}`,
      todoUpdate
    );
    return updatedTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (_id: string): Promise<APIResponse> => {
  try {
    const deletedTodo: APIResponse = await axios.delete(
      `${baseUrl}/delete-todo/${_id}`
    );
    return deletedTodo;
  } catch (error) {
    throw new Error(error);
  }
};
