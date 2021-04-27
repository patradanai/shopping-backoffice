import { PAGE_STATE } from "./Dashboard.action";
import createContext from "./createContext";
import { DashPageFunc } from "./Dashboard.action";

const initialStore = {
  DashboardPage: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case PAGE_STATE:
      return { ...state, DashboardPage: action.payload };
    default:
      return state;
  }
};

export const { Context, Provider } = createContext(
  reducer,
  { DashPageFunc },
  initialStore
);
