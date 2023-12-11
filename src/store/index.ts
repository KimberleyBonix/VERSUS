import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/login';
import signupReducer from './reducers/signup';

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
