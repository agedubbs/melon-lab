import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import setup from "./ducks/setup";
import invest from "./ducks/invest";
import factsheet from "./ducks/factsheet";

import setupMiddleware from "./middlewares/setup";
import investMiddleware from "./middlewares/invest";
import factsheetMiddleware from "./middlewares/factsheet";

export default createStore(
  combineReducers({
    setup,
    invest,
    factsheet,
  }),
  {
    /* preloadedState */
  },
  compose(
    applyMiddleware(setupMiddleware, investMiddleware, factsheetMiddleware),
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
    /* eslint-enable */
  ),
);
