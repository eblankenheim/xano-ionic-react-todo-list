import React, { useState, useEffect, useContext } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonList,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
} from "@ionic/react";
import { getTodos, deleteTodo } from "../api/xano";
import { AuthContext } from "../auth/AuthContext";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { logoutUser } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((res) => setTodos(res.data))
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setRefresh((r) => !r);
  };

  const handleUpdate = () => setRefresh((r) => !r);

  const sortedTodos = [...todos].sort((a, b) => a.created_at - b.created_at);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Todos</IonTitle>
          <IonButton
            onClick={() => setShowLogoutModal(true)}
            slot="end"
            color="danger"
            shape="round"
            size="small"
            className="ion-padding-horizontal">
            Logout
          </IonButton>
          <IonAlert
            isOpen={showLogoutModal}
            onDidDismiss={() => setShowLogoutModal(false)}
            header="Logout"
            message="Are you sure you want to logout?"
            buttons={[
              { text: "Cancel", role: "cancel" },
              { text: "Logout", role: "destructive", handler: logoutUser },
            ]}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <TodoForm onAdd={() => setRefresh((r) => !r)} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonList
                style={loading ? { opacity: 0.5, pointerEvents: "none" } : {}}>
                {Array.isArray(todos) && todos.length === 0 ? (
                  <div style={{ textAlign: "center", padding: 20 }}>
                    No todos found.
                  </div>
                ) : (
                  sortedTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                    />
                  ))
                )}
              </IonList>
              {loading && (
                <IonSpinner
                  style={{ position: "absolute", left: "50%", top: "50%" }}
                />
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
