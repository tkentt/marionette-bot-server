export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const logInRequest = () => ({
  type: LOG_IN_REQUEST
})

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const logInSuccess = {
  type: LOG_IN_REQUEST
}

export const LOG_IN_ERROR = 'LOG_IN_ERROR'
export const logInError = {
  type: LOG_IN_ERROR
}

export const logIn = () => dispatch => {
  dispatch(logInRequest());
};
