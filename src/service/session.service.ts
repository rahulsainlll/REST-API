import { FilterQuery, SessionOperation, UpdateQuery } from "mongoose";
import SessionModel, { SessionDoucment } from "../models/session.model";

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
