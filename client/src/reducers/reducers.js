import { 
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_ERROR,
} from '../actions/actions';

const initialState = {
  loading: false
};

export const reducer = (state=initialState, action) => {
  if (action.type === AUTHENTICATE_REQUEST) {
    console.log('AUTHENTICATE_REQUEST');
  } else if (action.type === AUTHENTICATE_SUCCESS) {
    console.log('AUTHENTICATE_SUCCESS');
  } else if (action.type === AUTHENTICATE_ERROR) {
    console.log('AUTHENTICATE_ERROR');
  }
  return state
}
