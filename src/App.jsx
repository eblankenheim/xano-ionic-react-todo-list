import { AuthProvider } from "./auth/AuthProvider";
import Routes from "./routes";
import "@ionic/react/css/core.css";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
