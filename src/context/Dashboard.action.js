export const PAGE_STATE = "PAGE_STATE";
export const SHOP_PROFILE = "SHOP_PROFILE";
export const USER_PROFILE = "USER_PROFILE";
export const LOADING = "LOADING";

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

export const UserProfile = (dispatch) => {
  return (data) => {
    return dispatch({ type: USER_PROFILE, payload: data });
  };
};

export const setLoading = (dispatch) => {
  return (data) => {
    return dispatch({ type: LOADING, payload: data });
  };
};
