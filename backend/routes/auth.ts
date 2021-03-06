import Router, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { __prod__, COOKIE_NAME } from "../constants";
import { db } from "../mongoConfig/mongo";

const router = Router();

export interface JWTData {
  id: string;
  email: string;
}

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log({ email });
  console.log({ password });
  const userExists = await db
    .db("jwtCookie")
    .collection("users")
    .findOne({ email });
  console.log("userExists", userExists);

  if (!userExists) {
    res.status(404).json({
      success: false,
      message: `Could not find account: ${email}`,
    });
    return;
  }

  const match = await bcrypt.compare(password, userExists.password);
  if (!match) {
    //return error to user to let them know the password is incorrect
    res.status(401).json({
      success: false,
      message: "Incorrect credentials",
    });
    return;
  }

  const token = <JWTData | string>(
    jwt.sign(
      { email: userExists.email, id: userExists._id },
      process.env.JWT_SECRET_KEY!
    )
  );
  console.log("token", token);

  console.log("sending cookie");
  res.cookie(COOKIE_NAME, token, {
    httpOnly: __prod__,
    // domain: "example.com",
  });

  res.status(200).json({
    data: {
      success: true,
      email,
    },
    // token: token,
  });
});

router.post("/register", async (req: Request, res: Response) => {
  const { email, name, password, confirmPW } = req.body;
  console.log({ email });
  console.log({ name });
  console.log({ password });
  console.log({ confirmPW });
  if (!email || !name || !password || !confirmPW) {
    res.status(400).json({ message: "Must Fill All Forms out Completley" });
  }
  const userExists = await db
    .db("jwtCookie")
    .collection("users")
    .findOne({ email });
  console.log("userExists", userExists);

  if (userExists) {
    res.status(404).json({
      success: false,
      message: `account already exists: ${email}`,
    });
    return;
  }
  const hashedPW = await bcrypt.hash(password, 12);
  const newUser = {
    name,
    email,
    password: hashedPW,
  };

  const newUserRes = await db
    .db("jwtCookie")
    .collection("users")
    .insertOne(newUser);
  console.log("newUserRes", newUserRes);

  const token = <JWTData | string>(
    jwt.sign(
      { email: newUserRes.ops[0].email, id: newUserRes.ops[0]._id },
      process.env.JWT_SECRET_KEY!
    )
  );

  console.log("token from reg", token);
  res.cookie(COOKIE_NAME, token, {
    httpOnly: __prod__,
    // domain: "example.com",
  });
  res.status(200).json({
    data: {
      success: true,
      email,
    },
    // token: token,
  });
});

router.post("/logout", (_, res) => {
  res.clearCookie(COOKIE_NAME);
  res.clearCookie("signedin");
  res.json({ success: true });
});

export { router as authRoutes };
