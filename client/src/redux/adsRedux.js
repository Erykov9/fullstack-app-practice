import axios from 'axios';
import { API_URL } from '../config';


// SELECTORS
export const getAds = ({ ads }) => ads.data;
export const getAdsRequestInfo = ({ ads }) => ads.request
export const getAdById = ({ ads }, id) => ads.data.find(ad => ad._id === id);
export const getRequest = ({ ads }, name) => ads.request[name];

// ACTIONS
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const LOAD_ADS = createActionName('LOAD_ADS');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadAds = (payload) => ({ payload, type: LOAD_ADS });

export const getAdsRequest = () => {
  return async dispatch => {

    dispatch(startRequest());

    try {
      let res = await axios.get(`${API_URL}/ads`);
      dispatch(loadAds(res.data));
      dispatch(endRequest());
    } catch(err) {
      dispatch(errorRequest(err.message))
    }
  }
};

const initialState ={
  data: [],
  request: {
    pending: false,
    error: null,
    success: null
  }
}

const adsReducer = (statePart = initialState, action = {}) => {
  switch(action.type) {
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload]};
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: false } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };
    default:
    return statePart
  }
}

export default adsReducer;