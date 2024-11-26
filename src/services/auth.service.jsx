import { authKey } from "@/constants/authKey";
import { decodedToken } from "@/utils/jwt/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorage/local.storage";

export const storUserInfo = ({ accessToken }) => {
  console.log(accessToken);
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  // console.log(authToken)
  if (authToken) {
    const decodeData = decodedToken(authToken);
    console.log(decodeData);
    return {
      ...decodeData,
      role: decodeData?.role.toLowerCase(),
    };
  }
};

export const isLoggingIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUserInfo = () => {
  return removeFromLocalStorage(authKey);
};
