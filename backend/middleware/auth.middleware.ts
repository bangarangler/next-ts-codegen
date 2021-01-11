import { Router, Request, Response, NextFunction } from "express";
// import { ObjectID } from "mongodb";
import { verify } from "jsonwebtoken";
// import { createAccessToken, createRefreshToken } from "../utils/authTokens";
import { REFRESH_COOKIE_NAME, __prod__ } from "../constants";
// import { db } from "../mongoConfig/mongo";

const router = Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req?.headers?.authorization || "";
  const accessToken = authHeaders.split(" ")[1];
  console.log("accessToken", accessToken);
  console.log("req.cookie", req?.cookies[REFRESH_COOKIE_NAME]);
  console.log("req.cookie", req?.cookies);
  const refreshToken = req?.cookies[REFRESH_COOKIE_NAME];
  console.log("refreshToken", refreshToken);

  // if (!accessToken && !refreshToken) {
  if (!accessToken) {
    res.status(401).json({ error: true, message: "Please Register or Login" });
  }

  if (accessToken) {
    try {
      const verAcc = verify(accessToken, process.env.JWT_SECRET_KEY!);
      console.log("verAcc", verAcc);
      next();
    } catch (err) {
      console.log("bad access token");
      // next();
      res.status(401).json({ error: true, message: "Not Authorized" });
    }
  }

  // if (refreshToken) {
  //   try {
  //     const verRef = verify(refreshToken, process.env.REFRESH_SECRET_KEY!);
  //     console.log("verRef", verRef);
  //     next();
  //     // res
  //     //   .status(401)
  //     //   .json({ error: false, message: "Hit Refresh route for new tokens" });
  //   } catch (err) {
  //     console.log("your refresh Token is bad!");
  //     // res.status(401).json({ error: true, message: "Not Authorized" });
  //     res
  //       .status(401)
  //       .json({ error: false, message: "Hit Refresh route for new tokens" });
  //   }
  // }
});

export { router as authMiddleware };
