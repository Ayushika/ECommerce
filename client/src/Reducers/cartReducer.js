/** @format */

let initialCart = [];

if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    initialCart = JSON.parse(localStorage.getItem("cart"));
  }
}

export const cartReducer = (state = initialCart, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};
