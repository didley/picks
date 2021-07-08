export const alertTypes = {
  SET_GENERAL_ALERT: "alert/setGeneralAlert",
  SET_WARNING_ALERT: "alert/setWarningAlert",
  SET_ERROR_ALERT: "alert/setErrorAlert",
  SET_SUCCESS_ALERT: "alert/setSuccessAlert",
  SET_LOADING_ALERT: "alert/setLoadingAlert",
  CLEAR_ALERT: "alert/clearAlert",
};

export const setGeneralAlert = ({ message, extraDetails, timeout = null }) => ({
  type: alertTypes.SET_GENERAL_ALERT,
  message,
  extraDetails,
  timeout,
});

export const setWarningAlert = ({ message, extraDetails, timeout = null }) => ({
  type: alertTypes.SET_WARNING_ALERT,
  message,
  extraDetails,
  timeout,
});

export const setErrorAlert = ({ message, extraDetails, timeout = null }) => ({
  type: alertTypes.SET_ERROR_ALERT,
  message,
  extraDetails,
  timeout,
});

export const setSuccessAlert = ({ message, extraDetails, timeout = null }) => ({
  type: alertTypes.SET_SUCCESS_ALERT,
  message,
  extraDetails,
  timeout,
});

export const setLoadingAlert = () => ({
  type: alertTypes.SET_LOADING_ALERT,
});

export const clearAlert = () => ({ type: alertTypes.CLEAR_ALERT });
