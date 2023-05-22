import Cookies from "js-cookie";
import { createContext, useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";


const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,

        user: null,
      };
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case UPDATE_PROFILE:
      const {
        name,
        phoneNumber,
        avatarUrl,
        aboutMe,
        jobTitle,
        facebookLink,
        instagramLink,
        postCount,
      } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          name,
          phoneNumber,
          avatarUrl,
          aboutMe,
          jobTitle,
          facebookLink,
          instagramLink,
          postCount,
        },
      };

    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

const setSession = (accessToken) => {
  if (accessToken) {
    Cookies.set('accessToken', accessToken)
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    Cookies.remove('accessToken')
    delete apiService.defaults.headers.common.Authorization;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updatedProfile = useSelector((state) => state.user.updatedProfile);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const res = await apiService.get("/users/me");
          const {user} = res.data.data;
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true,  user },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ email, password }, callback) => {
    const res = await apiService.post("/auth/login", { email, password });

    const { user, accessToken } = res.data.data;
    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
    callback();
  };
  const register = async ({ name, email, password }, callback) => {
    const res = await apiService.post("/users", { name, email, password });
    const { user, accessToken } = res.data.data;
    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user },
    });
    callback();
  };

  const logout = async (callback) => {
    setSession(null);
    dispatch({
      type: LOGOUT,
    });
    callback();
  };

  useEffect(() => {
    if (updatedProfile)
      dispatch({ type: UPDATE_PROFILE, payload: updatedProfile });
  }, [updatedProfile]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
