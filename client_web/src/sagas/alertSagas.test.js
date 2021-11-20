import { setSuccessAlert, clearAlert } from "../actions/alertActions";
import { alertReducer } from "../reducers/alertReducer";
import { watchAlert } from "./alertSagas";
import { expectSaga } from "redux-saga-test-plan";

const initialState = {
  style: "GENERAL",
  message: null,
  details: null,
};

describe("alertSagas", () => {
  it("should clear alert if timeout supplied with action", () => {
    return expectSaga(watchAlert)
      .withReducer(alertReducer)
      .put(clearAlert())
      .dispatch(setSuccessAlert({ message: "timed alert", timeout: 100 }))
      .hasFinalState(initialState)
      .silentRun();
  });

  it("should only clear last alert if multiple overlapping timed alerts dispatched", () => {
    return (
      expectSaga(watchAlert)
        .withReducer(alertReducer)
        .put(clearAlert())
        // should only clearAlert once
        .not.put(clearAlert())
        .dispatch(setSuccessAlert({ message: "timed alert 1", timeout: 100 }))
        .dispatch(setSuccessAlert({ message: "timed alert 2", timeout: 100 }))
        .dispatch(setSuccessAlert({ message: "timed alert 3", timeout: 100 }))
        .silentRun()
    );
  });
});
