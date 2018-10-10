export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST'
export const authenticateRequest = () => ({
  type: AUTHENTICATE_REQUEST
})

export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const authenticateSuccess = {
  type: AUTHENTICATE_REQUEST
}

export const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR'
export const authenticateError = {
  type: AUTHENTICATE_ERROR
}

export const authenticate = () => dispatch => {
  dispatch(authenticateRequest());
};