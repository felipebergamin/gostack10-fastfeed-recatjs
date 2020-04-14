import produce from 'immer';

const INITIAL_STATE = {
  isAuthenticated: false,
  token: null,
};

export default function auth(state = INITIAL_STATE, action = {}) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/authenticate':
        draft.isAuthenticated = true;
        draft.token = action.payload.token;
        break;
      case '@auth/logout':
        draft.isAuthenticated = false;
        draft.token = null;
        break;
      default:
    }
  });
}
