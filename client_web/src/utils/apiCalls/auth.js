import { client } from "./_client";

const logInUser = (email, password) =>
  client.post("/user/login", { body: { email, password } });

const signUpUser = (username, email, password) =>
  client.post("/user/login", { body: { username, email, password } });

export { logInUser, signUpUser };
