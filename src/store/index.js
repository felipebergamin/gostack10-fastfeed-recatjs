import { createStore } from 'redux';

import rootReducer from './rootReducer';

// eslint-disable-next-line no-console
export default createStore(rootReducer, console.tron.createEnhancer());
