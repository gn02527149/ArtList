import { combineReducers } from 'redux';
import sections from './sections';
import lists from './lists';

const msgApp = combineReducers({
	sections,
	lists
});

export default msgApp;
