export const PAGE_STATE = "PAGE_STATE";

export const DashPageFunc = (dispatch) => {
  return (data) => {
    return dispatch({ type: PAGE_STATE, payload: data });
  };
};
