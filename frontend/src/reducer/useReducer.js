// Retrieve the stored value
const storedUser = localStorage.getItem("USER");

// Set the initial state to the stored value, or to null if no value is found
export const initialState = storedUser ? JSON.parse(storedUser) : null;

export const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      // Store the user information in localStorage
      localStorage.setItem("USER", JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};