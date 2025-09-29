import React, { useState, useEffect, useContext } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { getTodos, deleteTodo } from "../api/xano";
import { AuthContext } from "../auth/AuthContext";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { logoutUser } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getTodos().then((res) => {
      setTodos(res.data);
    });
  }, [refresh]);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setRefresh((r) => !r);
  };

  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={logoutUser} color="danger">
          Logout
        </IonButton>
        <TodoForm onAdd={() => setRefresh((r) => !r)} />
        <IonList>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => handleDelete(todo.id)}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
