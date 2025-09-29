import axios from "axios";

// Axios for Auth
const AuthAPI = axios.create({
  baseURL: "https://x8ki-letl-twmt.n7.xano.io/api:0EHxHUr7",
});

// Axios for Todos
const TodoAPI = axios.create({
  baseURL: "https://x8ki-letl-twmt.n7.xano.io/api:kZemCDCA",
});

// Set auth token for both (in case you want to secure both APIs)
export function setAuthToken(token) {
  if (token) {
    AuthAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    TodoAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AuthAPI.defaults.headers.common["Authorization"];
    delete TodoAPI.defaults.headers.common["Authorization"];
  }
}

// Auth endpoints
export const login = (data) => AuthAPI.post("/auth/login", data);
export const register = (data) => AuthAPI.post("/auth/signup", data);
export const getMe = () => AuthAPI.get("/auth/me");

// Todo endpoints
export const getTodos = () => TodoAPI.get("/todo");
export const addTodo = (data) => TodoAPI.post("/todo", data);
export const updateTodo = (id, data) => TodoAPI.patch(`/todo/${id}`, data);
export const deleteTodo = (id) => TodoAPI.delete(`/todo/${id}`);

export default {
  setAuthToken,
  login,
  register,
  getMe,
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
