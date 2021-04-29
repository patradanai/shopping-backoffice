import { PAGE_STATE, SHOP_PROFILE } from "./Dashboard.action";
import createContext from "./createContext";
import { DashPageFunc, ShopProfile } from "./Dashboard.action";

const initialStore = {
  DashboardPage: 0,
  shopDetails: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case PAGE_STATE:
      return { ...state, DashboardPage: action.payload };
    case SHOP_PROFILE:
      return { ...state, shopDetails: action.payload };
    default:
      return state;
  }
};

export const { Context, Provider } = createContext(
  reducer,
  { DashPageFunc, ShopProfile },
  initialStore
);
