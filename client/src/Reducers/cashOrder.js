/** @format */

export const cashOrderReducer = (state = false, action) => {
  switch (action.type) {
    case "CASH_ORDER":
      return action.payload;
    default:
      return state;
  }
};
