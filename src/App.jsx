import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { AuthProvider } from "./auth/AuthProvider";
import Routes from "./routes";
import "@ionic/react/css/core.css";

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
