import { client } from "./_client";

const getUser = () => client.get("/user");

const logInUser = (email, password) =>
  client.post("/user/login", { body: { email, password } });

const signUpUser = (username, email, password) =>
  client.post("/user/signup", { body: { username, email, password } });

export { getUser, logInUser, signUpUser };
