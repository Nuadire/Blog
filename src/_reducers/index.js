import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { articlesReducer } from './articles.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  articlesReducer
});

export default rootReducer;