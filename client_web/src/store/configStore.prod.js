import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { rootReducer } from "../reducers";
import { rootSaga } from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export { store };
