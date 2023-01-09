const createActionName = (actionName) => `app/users/${actionName}`
const LOG_IN = createActionName('LOG_IN');

export const getLogin = ({ users }) => users.data

export const logIn = payload => ({type: LOG_IN, payload})

const initialState = {
  data: null
}

const userReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...statePart, data: action.payload }
    default:
      return statePart;
  }
}

export default userReducer