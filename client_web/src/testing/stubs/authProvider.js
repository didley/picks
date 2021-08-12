export const AuthProvider = (params = {}) => ({
  auth: {
    user: {
      _id: "fakeIdf7gjsfljfglhjd0dfhlkj",
      username: "fakeUser1",
      email: "fakeUser1@gmail.com",
    },
    isAuthenticated: true,
    isAuthenticating: false,
    message: null,
  },
  ...params,
});
