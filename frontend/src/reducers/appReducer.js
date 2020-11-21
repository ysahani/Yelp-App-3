import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['isSignedUp', 'isLoggedIn', 'email', 'name', 'location', 'description', 'timings', 'eventName', 'eventDesc', 'eventTime', 'eventDate', 'eventLoc', 'eventHashtags', 'yelpingSince', 'thingsILove', 'findMeIn', 'blogsite', 'dob', 'city', 'state', 'country', 'nickname', 'phone', 'cName', 'results', 'rName', 'dName', 'url', 'cEmail', 'persona'],
};
const createState = {

};
const appReducer = (state = createState, action) => {
  if (action.type === 'SIGNUP_USER') {
    return {
      ...state,
      isSignedUp: true,
    };
  }
  if (action.type === 'DONT_SIGNUP_USER') {
    return {
      ...state,
      isSignedUp: false,
    };
  }
  if (action.type === 'LOGIN_USER') {
    return {
      ...state,
      name: action.rname,
      location: action.location,
      email: action.email,
      isSignedUp: true,
      isLoggedIn: true,
      description: action.description,
      timings: action.timings,
      persona: action.persona,
    };
  }
  if (action.type === 'LOGIN_CUSTOMER') {
    return {
      ...state,
      name: action.cname,
      email: action.email,
      yelpingSince: action.yelpSince,
      thingsILove: action.love,
      findMeIn: action.findMe,
      blogsite: action.weblog,
      dob: action.dateob,
      city: action.acity,
      state: action.astate,
      country: action.acountry,
      nickname: action.nname,
      phone: action.aphone,
      isSignedUp: true,
      isLoggedIn: true,
      persona: action.persona,
    };
  }
  if (action.type === 'DONT_LOGIN_USER') {
    return {
      ...state,
      isLoggedIn: false,
    };
  }
  if (action.type === 'SIGN_OUT') {
    return {
      isSignedUp: null,
      isLoggedIn: null,
    };
  }
  if (action.type === 'UPDATE_PROFILE') {
    return {
      ...state,
      email: action.email,
      name: action.rname,
      location: action.location,
      description: action.description,
      timings: action.timings,
    };
  }
  if (action.type === 'UPDATE_CUSTOMER') {
    return {
      ...state,
      name: action.fullname,
      email: action.email,
      yelpingSince: action.yelpSince,
      thingsILove: action.love,
      findMeIn: action.findIn,
      blogsite: action.weblog,
      dob: action.dob,
      city: action.acity,
      state: action.astate,
      country: action.acountry,
      nickname: action.nname,
      phone: action.aPhone,
      isSignedUp: true,
      isLoggedIn: true,
    };
  }
  if (action.type === 'UPDATE_EVENT') {
    return {
      ...state,
      eventName: action.eventName,
      eventDesc: action.eventDesc,
      eventTime: action.eventTime,
      eventDate: action.eventDate,
      eventLoc: action.eventLoc,
      eventHtags: action.eventHtags,
    };
  }
  if (action.type === 'UPDATE_VIEWVENT') {
    return {
      ...state,
      eventName: action.eventName,
    };
  }
  if (action.type === 'UPDATE_CNAME') {
    return {
      ...state,
      cName: action.cName,
    };
  }
  if (action.type === 'UPDATE_RESULTS') {
    return {
      ...state,
      results: action.sResults,
    };
  }
  if (action.type === 'UPDATE_RNAME') {
    return {
      ...state,
      rName: action.rName,
    };
  }
  if (action.type === 'UPDATE_DNAME') {
    return {
      ...state,
      dName: action.dName,
    };
  }
  if (action.type === 'UPDATE_URL') {
    return {
      ...state,
      url: action.aurl,
    };
  }
  if (action.type === 'UPDATE_CEMAIL') {
    return {
      ...state,
      cEmail: action.cEmail,
    };
  }
  return state;
};

export default persistReducer(persistConfig, appReducer);
