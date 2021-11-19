import { authToken } from "utils/authToken";

const apiBaseURL =
  process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL : "";

const defaults = {
  baseURL: `${apiBaseURL}/api`,
  headers: () => ({
    "content-type": "application/json",
    Authorization: authToken.get() ? `Bearer ${authToken.get()}` : undefined,
  }),
  error: {
    code: "SERVER_ERROR",
    message:
      "Something went wrong. Check your network connection and refresh this page. If the issue continues contact our support.",
    status: 503,
    data: {},
  },
};

async function fetchWrapper(method, endpoint, { body, ...customConfig } = {}) {
  const config = {
    method,
    ...customConfig,
    headers: {
      ...defaults.headers(),
      ...customConfig.headers,
    },
  };
  if (body) config.body = JSON.stringify(body);

  return window
    .fetch(`${defaults.baseURL}${endpoint}`, config)
    .then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        return { ...data, status: res.status };
      } else {
        return data
          ? Promise.reject({ ...data, status: res.status })
          : Promise.reject(defaults.error);
      }
    });
}

export const client = {
  get: (...args) => fetchWrapper("GET", ...args),
  post: (...args) => fetchWrapper("POST", ...args),
  put: (...args) => fetchWrapper("PUT", ...args),
  patch: (...args) => fetchWrapper("PATCH", ...args),
  delete: (...args) => fetchWrapper("DELETE", ...args),
};
