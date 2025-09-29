import React, { useState } from "react";
import { IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import { addTodo } from "../api/xano";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Both fields required.");
      return;
    }
    try {
      await addTodo({ title, description });
      // ...
    } catch {
      setError("Failed to add todo.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonItem>
        <IonLabel position="stacked">Title</IonLabel>
        <IonInput
          value={title}
          onIonChange={(e) => setTitle(e.detail.value)}
          required
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Description</IonLabel>
        <IonInput
          value={description}
          onIonChange={(e) => setDescription(e.detail.value)}
        />
      </IonItem>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <IonButton expand="block" type="submit">
        Add Todo
      </IonButton>
    </form>
  );
}
