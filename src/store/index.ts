import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/login';
import eventReducer from './reducers/event';
import newEventReducer from './reducers/createEvent';
import deleteEventReducer from './reducers/deleteEvent';
import publishEventReducer from './reducers/publishEvent';
import updateEventReducer from './reducers/updateEvent';
import registerEventReducer from './reducers/registerEvent';
import unregisterEventReducer from './reducers/unregisterEvent';
import searchReducer from './reducers/search';
import signupReducer from './reducers/signup';
import loggedUserReducer from './reducers/loggedUser';
import loggedUserUpdateReducer from './reducers/loggedUserUpdate';
import userGamesReducer from './reducers/userGames';
import userPlatformsReducer from './reducers/userPlatforms';
import profileReducer from './reducers/profile';
import gameReducer from './reducers/game';
import platformReducer from './reducers/platform';
import passwordChangeReducer from './reducers/passwordChange';

const store = configureStore({
  reducer: {
    login: loginReducer,
    event: eventReducer,
    newEvent: newEventReducer,
    updatedEvent: updateEventReducer,
    deleteEvent: deleteEventReducer,
    publishEvent: publishEventReducer,
    registerEvent: registerEventReducer,
    unregisterEvent: unregisterEventReducer,
    search: searchReducer,
    signup: signupReducer,
    loggedUser: loggedUserReducer,
    loggedUserUpdate: loggedUserUpdateReducer,
    userGames: userGamesReducer,
    userPlatforms: userPlatformsReducer,
    profile: profileReducer,
    game: gameReducer,
    platform: platformReducer,
    passwordChange: passwordChangeReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
