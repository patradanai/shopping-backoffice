import {
  PAGE_STATE,
  SHOP_PROFILE,
  USER_PROFILE,
  LOADING,
} from "./Dashboard.action";
import createContext from "./createContext";
import {
  DashPageFunc,
  ShopProfile,
  UserProfile,
  setLoading,
} from "./Dashboard.action";

const initialStore = {
  DashboardPage: 1,
  shopDetails: {},
  userProfiles: {},
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case PAGE_STATE:
      return { ...state, DashboardPage: action.payload };
    case SHOP_PROFILE:
      return { ...state, shopDetails: action.payload };
    case USER_PROFILE:
      return { ...state, userProfiles: action.payload };
    case LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const { Context, Provider } = createContext(
  reducer,
  { DashPageFunc, ShopProfile, UserProfile, setLoading },
  initialStore
);
