import React, { useState, useContext } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonTitle,
  IonToolbar,
  IonHeader,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { register } from "../api/xano";
import { AuthContext } from "./AuthContext";

export default function Register() {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await register({ email, password });
      const token = res.data.authToken || res.data.token;
      await loginUser(token);
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              value={email}
              onIonInput={(e) => setEmail(e.target.value)}
              required
              className="custom-contrast ion-margin-top"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              className="ion-margin-bottom custom-contrast ion-margin-top"
              type="password"
              value={password}
              onIonInput={(e) => setPassword(e.target.value)}
              required
            />
          </IonItem>
          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}
          <IonButton className="ion-margin-top" expand="block" type="submit">
            Register
          </IonButton>
        </form>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <IonText>
            Already have an account?{" "}
            <span
              style={{
                color: "#3880ff",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => history.push("/login")}>
              Login
            </span>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
}
