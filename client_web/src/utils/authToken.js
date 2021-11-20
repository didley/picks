const TOKEN = "token";

export const authToken = {
  get: () => localStorage.getItem(TOKEN),
  set: (token) => localStorage.setItem(TOKEN, token),
  remove: () => localStorage.removeItem(TOKEN),
};
