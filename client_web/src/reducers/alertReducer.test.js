import {
  setSuccessAlert,
  setGeneralAlert,
  clearAlert,
} from "actions/alertActions";
import { alertReducer } from "./alertReducer";

const initialState = {
  style: "GENERAL",
  message: null,
  details: null,
};

describe("alertReducer", () => {
  it("should return initial state with GENERAL style for default fallback", () => {
    expect(alertReducer(undefined, {})).toEqual(initialState);
  });
  it("should set SUCCESS alert on setSuccessAlert action", () => {
    const alertPayload = {
      message: "yey, a thing happened successfully",
      extraDetails: "the thing that happened was really cool and impressive",
    };

    const newState = {
      message: "yey, a thing happened successfully",
      details: "the thing that happened was really cool and impressive",
      style: "SUCCESS",
    };

    expect(alertReducer(undefined, setSuccessAlert(alertPayload))).toEqual(
      newState
    );
  });
  it("should clear alert on clearAlert action", () => {
    const initialAlert = {
      message: "yey, a thing happened successfully",
      details: "the thing that happened was really cool and impressive",
      style: "SUCCESS",
    };
    expect(alertReducer(initialAlert, clearAlert())).toEqual(initialState);
  });

  it("should override previous alert if alert exists", () => {
    const previousState = {
      message: "yey, a thing happened successfully",
      details: "the thing that happened was really cool and impressive",
      style: "SUCCESS",
    };

    const newState = { message: "new alert", style: "GENERAL" };

    expect(
      alertReducer(previousState, setGeneralAlert({ message: "new alert" }))
    ).toEqual(newState);
  });
});
