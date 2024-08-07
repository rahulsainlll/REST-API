import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions, updateSessions } from "../service/session.service";
import config from "config";
import { signJwt } from "../utils/jwt.utils";

// validate the user password
// create a session
// create a access token
// create a refresh token
// return axxess & refresh token

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get("accessTokenTtl"),
    }
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get("refreshTokenTtl"),
    }
  );

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  // console.log(userId);

  const sessions = await findSessions({ user: userId, valid: true });

  // console.log(sessions);

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSessions({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}