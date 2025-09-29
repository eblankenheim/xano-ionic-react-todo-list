import { IonItem, IonLabel, IonButton } from "@ionic/react";

export default function TodoItem({ todo, onDelete }) {
  return (
    <IonItem>
      <IonLabel>
        <div>
          <strong>{todo.title}</strong>
          <br />
          {todo.description}
          <br />
          {todo.completed ? "✅ Completed" : "❌ Not completed"}
        </div>
        <IonButton
          slot="end"
          color="danger"
          size="small"
          onClick={() => onDelete(todo.id)}>
          Delete
        </IonButton>
      </IonLabel>
    </IonItem>
  );
}
