import { sign } from "jsonwebtoken";

import { ACCESS_TOKEN_EXPIRES, __prod__ } from "../constants";

export interface AccessTokenFrame {
  id: string;
  email: string;
}

export interface RefreshTokenFrame {
  id: string;
  email: string;
}

// CREATE ACCESS TOKEN
export const createAccessToken = (userObj: AccessTokenFrame) => {
  // console.log("userObj", userObj);

  const accessToken = sign(userObj, process.env.JWT_SECRET_KEY!, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });
  // console.log("accessToken", accessToken);
  if (accessToken) {
    return accessToken;
  } else {
    console.log("returning null for accessToken");
    return null;
  }
};

// CREATE REFRESH TOKEN
export const createRefreshToken = (userObj: RefreshTokenFrame) => {
  // console.log("userObj", userObj);
  const refreshToken = sign(userObj, process.env.REFRESH_SECRET_KEY!);
  // console.log("refreshToken", refreshToken);
  if (refreshToken) {
    return refreshToken;
  } else {
    console.log("returning null for refreshToken");
    return null;
  }
};
