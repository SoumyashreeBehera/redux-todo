import axios from "axios";

export const getTodos = async () => {
  let res = await axios.get("http://localhost:3001/todos");
  let todos = res.data;
  return todos;
};

export const getSingleTodos = async (id) => {
  let res = await axios.get(`http://localhost:3001/todos/${id}`);
  let todos = res.data;
  return todos;
};

export const getCompletedTodos = async () => {
  let res = await axios.get("http://localhost:3001/todos", {
    params: {
      status: true,
    },
  });
  let todos = res.data;
  return todos;
};

export const addTodos = async (text) => {
  let res = await axios.post("http://localhost:3001/todos", {
    status: false,
    title: text,
  });
  let todos = res.data;
  return todos;
};

export const toggleTodo = async ({ id, status, title }) => {
  let res = await axios.put(`http://localhost:3001/todos/${id}`, {
    title: title,
    status: !status,
  });
  return;
};

export const deleteTodo = async (id) => {
  let res = await axios.delete(`http://localhost:3001/todos/${id}`);
  return;
};
