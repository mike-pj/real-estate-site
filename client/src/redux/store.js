import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';   
import storage from 'redux-persist/lib/storage';


//persist the redux store in local storage so that when the user refreshes the page, the state is not lost
const rootReducer = combineReducers({
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
} 

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: {user: userReducer},

  reducer: persistedReducer,//use the persisted reducer instead of the original reducer

  //serialize in other to avoid errors with non-serializable values in the state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

//to make the store persisted
export const persistor = persistStore(store);