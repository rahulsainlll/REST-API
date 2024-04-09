import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDoucment } from "../models/session.model";
import { get } from "lodash";
import config from "config";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent: userAgent,
  });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDoucment>) {
  return SessionModel.find(query).lean();
}

export async function updateSessions(
  query: FilterQuery<SessionDoucment>,
  upadate: UpdateQuery<SessionDoucment>
) {
  return SessionModel.updateOne(query, upadate);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
}
