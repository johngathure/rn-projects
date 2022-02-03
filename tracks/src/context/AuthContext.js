import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../util/navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTHENTICATION_ERROR":
      return { ...state, errorMessage: action.payload };

    case "AUTHENTICATION_SUCCESS":
      return { token: action.payload, errorMessage: "" };

    case "SIGN_OUT":
      return { token: null, errorMessage: "" };

    case "CLEAR_ERROR_MESSAGE":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    dispatch({ type: "AUTHENTICATION_SUCCESS", payload: token });
    navigate("TrackList");
  } else {
    navigate("authenticationFlow");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({
        type: "AUTHENTICATION_SUCCESS",
        payload: response.data.token,
      });

      navigate("TrackList");
    } catch (error) {
      dispatch({
        type: "AUTHENTICATION_ERROR",
        payload: "Something went wrong with sign up.",
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({
        type: "AUTHENTICATION_SUCCESS",
        payload: response.data.token,
      });

      navigate("TrackList");
    } catch (error) {
      dispatch({
        type: "AUTHENTICATION_ERROR",
        payload: "Something went wrong with sign in",
      });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT" });
  navigate("authenticationFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
