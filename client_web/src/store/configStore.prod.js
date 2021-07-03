import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "../reducers";

export const configStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();

  return {
    ...createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run,
  };
};
