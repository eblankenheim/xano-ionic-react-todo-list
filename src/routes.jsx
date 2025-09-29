import { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import Login from "./auth/Login";
import Register from "./auth/Register";
import TodoList from "./todos/TodoList";

export default function Routes() {
  const { user } = useContext(AuthContext);

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
