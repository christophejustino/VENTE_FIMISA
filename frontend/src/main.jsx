import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import CircleLoader from "./components/CircleLoader/CircleLoader.jsx";
const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={clerkFrontendApi}>
        <ClerkLoading>
          <div className="flex items-center h-screen justify-center">
            <CircleLoader />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ClerkLoaded>
      </ClerkProvider>
    </Provider>
  </React.StrictMode>
);
