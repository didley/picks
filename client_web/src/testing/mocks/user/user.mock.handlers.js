import { rest } from "msw";
import { userMockControllers } from "./user.mock.controllers";

const {
  loginUser,
  registerUser,
  getUser,
  getProfileSummary,
  updateProfileSummary,
} = userMockControllers;

export const userMockHandlers = [
  rest.post("/api/user/login", loginUser),
  rest.post("/api/user/signup", registerUser),
  rest.get("/api/user", getUser),
  rest.get("/api/user/profile", getProfileSummary),
  rest.put("/api/user", updateProfileSummary),
];
