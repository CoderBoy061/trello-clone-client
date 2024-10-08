import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import{BrowserRouter} from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}
    >
      <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>
);
