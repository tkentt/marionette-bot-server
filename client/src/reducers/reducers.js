import { 
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
} from '../actions/actions';

const initialState = {
  loading: false
};

export const reducer = (state=initialState, action) => {
  if (action.type === LOG_IN_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    })
  }
  return state
}