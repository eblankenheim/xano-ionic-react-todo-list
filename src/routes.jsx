import { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import Login from "./auth/Login";
import Register from "./auth/Register";
import TodoList from "./todos/TodoList";
import { IonPage, IonContent, IonSpinner } from "@ionic/react";

export default function Routes() {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return (
      <IonPage>
        <IonContent className="ion-padding" fullscreen>
          <IonSpinner
            style={{ display: "block", margin: "auto", marginTop: "40vh" }}
          />
        </IonContent>
      </IonPage>
    );
  } else {
    return (
      <Switch>
        <Route
          path="/login"
          render={() => (user ? <Redirect to="/" /> : <Login />)}
        />
        <Route
          path="/register"
          render={() => (user ? <Redirect to="/" /> : <Register />)}
        />
        <Route
          exact
          path="/"
          render={() => (user ? <TodoList /> : <Redirect to="/login" />)}
        />
        {/* 404 catch-all */}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    );
  }
}
