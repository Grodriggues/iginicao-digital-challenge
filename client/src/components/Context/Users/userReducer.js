import {
  ADD_USER,
  GET_USER,
  DELETE_USER,
  UPDATE_USER,
  LOAD_USERS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case GET_USER:
      return { ...state, user: action.payload };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        )
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    case LOAD_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
  }
};
