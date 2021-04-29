export const PAGE_STATE = "PAGE_STATE";
export const SHOP_PROFILE = "SHOP_PROFILE";

export const DashPageFunc = (dispatch) => {
  return (data) => {
    return dispatch({ type: PAGE_STATE, payload: data });
  };
};

export const ShopProfile = (dispatch) => {
  return (data) => {
    return dispatch({ type: SHOP_PROFILE, payload: data });
  };
};
