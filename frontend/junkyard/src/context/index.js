import React, {createContext, useContext, useMemo, useReducer} from "react";
import { getAuth } from "firebase/auth";

// The app context
const App = createContext();

// The auth context
const Auth = createContext();

//firebase user state
const auth = getAuth();
const user = auth.currentUser;

App.displayName = "AppContext";
Auth.displayName = "AuthContext";

// App reducer
function reducer(state, action) {
  switch (action.type) {
    case "DARKMODE": {
      localStorage.setItem("dark", JSON.stringify(action.value));
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.value};
    }
    case "LOGOUT": {
      return { ...state, user: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// App context provider
function AppControllerProvider({ children }) {
  const initialState = {
    darkMode: JSON.parse(localStorage.getItem('dark')) || false
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <App.Provider value={value}>{children}</App.Provider>;
}

// Auth context provider
function AuthControllerProvider({ children }) {
  const initialState = {
    user: null,
  };

  const [authController, authDispatch] = useReducer(authReducer, initialState);

  const value = useMemo(() => [authController, authDispatch], [authController, authDispatch]);

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
}

function useAppController() {
  const context = useContext(App);

  if (!context) {
    throw new Error(
      "useAppController should be used inside the AppControllerProvider.",
    );
  }

  return context;
}

function useAuthController() {
  const context = useContext(Auth);

  if (!context) {
    throw new Error(
      "useAuthController should be used inside the AuthControllerProvider.",
    );
  }

  return context;
}

// Context module functions
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });
const login = (authDispatch, value) => authDispatch({ type: "LOGIN", value });
const logout = (authDispatch) => authDispatch({ type: "LOGOUT", value: null });

export {
  AppControllerProvider,
  useAppController,
  setDarkMode,
  AuthControllerProvider,
  useAuthController,
  login,
  logout,
};
