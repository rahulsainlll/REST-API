import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";
import config from "config";
import { signJwt } from "../utils/jwt.utils";

// validate the user password
// create a session
// create a access token
// create a refresh token
// return axxess & refresh token

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the user password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(400).send("Invalid email or password");
  }
  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create a access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get("accessTokenTtl"),
    }
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get("refreshTokenTtl"),
    }
  );

  // return axxess & refresh token

  return res.send({ accessToken, refreshToken });
}
