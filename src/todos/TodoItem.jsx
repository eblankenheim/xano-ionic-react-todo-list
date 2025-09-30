import React, { useState } from "react";
import {
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonCheckbox,
  IonIcon,
  IonAlert,
  IonText,
} from "@ionic/react";
import { trashOutline, pencilOutline, checkmarkOutline } from "ionicons/icons";
import { updateTodo } from "../api/xano";

export default function TodoItem({ todo, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Toggle completed status
  const toggleCompleted = async () => {
    setLoading(true);
    setError("");
    try {
      await updateTodo(todo.id, {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
      });
      onUpdate();
    } catch {
      setError("Failed to update todo.");
    }
    setLoading(false);
  };

  // Save edits
  const handleEditSave = async () => {
    setLoading(true);
    setError("");
    if (!editTitle.trim() || !editDescription.trim()) {
      setError("Fields cannot be empty");
      setLoading(false);
      return;
    }
    try {
      await updateTodo(todo.id, {
        title: editTitle,
        description: editDescription,
        completed: todo.completed,
      });
      setEditing(false);
      onUpdate();
    } catch {
      setError("Failed to edit todo.");
    }
    setLoading(false);
  };

  return (
    <>
      <IonItem className="ion-margin-vertical" lines="full">
        <IonCheckbox
          checked={todo.completed}
          onIonChange={toggleCompleted}
          slot="start"
          color="success"
          aria-label="Mark as completed"
          disabled={loading}
        />
        <IonLabel>
          {editing ? (
            <>
              <IonItem>
                <IonLabel position="stacked">Title</IonLabel>
                <IonInput
                  className="ion-margin-bottom custom-contrast ion-margin-top"
                  value={editTitle}
                  onIonInput={(e) => setEditTitle(e.target.value)}
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Description</IonLabel>
                <IonInput
                  className="ion-margin-bottom custom-contrast ion-margin-top"
                  value={editDescription}
                  onIonInput={(e) => setEditDescription(e.target.value)}
                />
              </IonItem>
              <IonButton
                size="small"
                color="success"
                onClick={handleEditSave}
                style={{ marginRight: 8, marginTop: 8 }}
                disabled={loading}>
                <IonIcon icon={checkmarkOutline} slot="start" />
                Save
              </IonButton>
              <IonButton
                size="small"
                color="medium"
                onClick={() => setEditing(false)}
                style={{ marginTop: 8 }}
                disabled={loading}>
                Cancel
              </IonButton>
            </>
          ) : (
            <>
              <div style={{ fontWeight: "bold", fontSize: 18 }}>
                {todo.title}
              </div>
              <div style={{ fontSize: 16 }}>{todo.description}</div>
              <div style={{ marginTop: 4 }}>
                {todo.completed ? (
                  <IonText color="success">
                    <span role="img" aria-label="completed">
                      ✅
                    </span>{" "}
                    Completed
                  </IonText>
                ) : (
                  <IonText color="danger">
                    <span role="img" aria-label="not completed">
                      ❌
                    </span>{" "}
                    Not completed
                  </IonText>
                )}
              </div>
            </>
          )}
          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}
        </IonLabel>
        {!editing && (
          <>
            <IonButton
              color="warning"
              size="small"
              onClick={() => setEditing(true)}
              style={{ marginRight: 8 }}
              disabled={loading}>
              <IonIcon icon={pencilOutline} slot="icon-only" />
            </IonButton>
            <IonButton
              color="danger"
              size="small"
              onClick={() => setShowDeleteAlert(true)}
              disabled={loading}>
              <IonIcon icon={trashOutline} slot="icon-only" />
            </IonButton>
          </>
        )}
      </IonItem>
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header="Delete Todo"
        message="Are you sure you want to delete this todo?"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Delete",
            handler: () => onDelete(todo.id),
          },
        ]}
      />
    </>
  );
}
