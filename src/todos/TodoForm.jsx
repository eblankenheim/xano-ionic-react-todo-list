import React, { useState } from "react";
import { IonItem, IonLabel, IonInput, IonButton, IonText } from "@ionic/react";
import { addTodo } from "../api/xano";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      !title.trim() ||
      !description.trim()
    ) {
      setError("Both fields required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await addTodo({ title, description });
      setTitle("");
      setDescription("");
      if (onAdd) onAdd();
    } catch {
      setError("Failed to add todo.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <IonItem lines="none">
        <IonLabel position="stacked">Title</IonLabel>
        <IonInput
          className="ion-margin-bottom custom-contrast ion-margin-top"
          type="text"
          value={title}
          onIonInput={(e) => setTitle(e.target.value ?? "")}
          required
        />
      </IonItem>
      <IonItem lines="none">
        <IonLabel position="stacked">Description</IonLabel>
        <IonInput
          type="text"
          value={description}
          onIonInput={(e) => setDescription(e.target.value ?? "")}
          className="ion-margin-bottom custom-contrast ion-margin-top"
        />
      </IonItem>
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}
      <IonButton
        expand="block"
        type="submit"
        color="primary"
        style={{ marginTop: 16, borderRadius: 12 }}
        disabled={loading}>
        {loading ? "Adding..." : "Add Todo"}
      </IonButton>
    </form>
  );
}
