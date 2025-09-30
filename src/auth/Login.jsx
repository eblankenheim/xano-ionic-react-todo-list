import { useState, useContext } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { login } from "../api/xano";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      await loginUser(res.data.authToken || res.data.token); // Adjust key if needed
    } catch {
      setError("Login failed");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              className="custom-contrast ion-margin-top"
              value={email}
              onIonInput={(e) => setEmail(e.target.value)}
              required
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
            Login
          </IonButton>
        </form>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <IonText>
            Don't have an account?{" "}
            <span
              style={{
                color: "#3880ff",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => history.push("/register")}>
              Register
            </span>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
}
