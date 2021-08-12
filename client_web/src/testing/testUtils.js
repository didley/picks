import React from "react";
import { render as rtlRender } from "@testing-library/react";

import { configStore } from "../store/configStore";
import { Provider } from "react-redux";
import { rootSaga } from "sagas";

const render = (component, renderOptions) => {
  const initialState = renderOptions?.initialState ?? null;
  const store = configStore(initialState);
  store.runSaga(rootSaga);

  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(component, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
export { render };
