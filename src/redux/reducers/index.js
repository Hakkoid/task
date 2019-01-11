import { combineReducers } from 'redux';
import points from './points';
import center from './center';

const allReducers = {
    points,
    center
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;