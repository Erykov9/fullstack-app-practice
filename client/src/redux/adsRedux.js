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

const EDIT_ADS = createActionName('EDIT_ADS');
const DELETE_AD = createActionName('DELETE_AD');
const ADD_AD = createActionName('ADD_AD')

export const LOAD_ADS = createActionName('LOAD_ADS');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });


export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const editAds = (payload) => ({ payload, type: EDIT_ADS});
export const deleteAd = payload => ({payload, type: DELETE_AD});
export const addAd = payload => ({payload, type: ADD_AD})

export const getAdsRequest = () => {
  return async dispatch => {

    dispatch(startRequest({name: LOAD_ADS}));

    try {
      let res = await axios.get(`${API_URL}/ads`);
      dispatch(loadAds(res.data));
      dispatch(endRequest({name: LOAD_ADS}));
    } catch(err) {
      dispatch(errorRequest({ name: LOAD_ADS, error: err.message}))
    }
  }
};

export const deleteAdDB = (id) => {
  return async dispatch => {
    dispatch(startRequest());

    try {
      await axios.delete(`${API_URL}/ads/${id}`);
      dispatch(endRequest());
    } catch(err) {
      dispatch(errorRequest(err.message));
    }
  }
}

export const addAdDB = (ad) => {
  return async dispatch => {
    dispatch(startRequest());

    try {
      let res = await axios.post(`${API_URL}/ads`, ad, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      dispatch(addAd(ad))
      dispatch(endRequest());
    } catch(err) {
      dispatch(errorRequest(err.message));
    }
  }
};

export const editAdDB = (ad) => {
  return async dispatch => {
    dispatch(startRequest());

    try {
      let res = await axios.put(`${API_URL}/ads/${ad.id}`, ad);
      dispatch(editAds(res.data));
      dispatch(endRequest());
    } catch(err) {
      dispatch(errorRequest(err.message));
    }
  }
}

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
    case DELETE_AD:
      return { ...statePart, data: statePart.data.filter(ad => ad._id !== action.payload)};
    case ADD_AD:
      return { ...statePart, data: [...statePart.data, action.payload]};
    case EDIT_ADS:
      return { ...statePart, data: statePart.data.map((id) => id._id === action.payload._id ? {...id, ...action.payload} : id)}
    default:
    return statePart
  }
}

export default adsReducer;