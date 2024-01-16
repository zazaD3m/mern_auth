import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice"
import rootReducer from "./slices/rootReducer"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [apiSlice.reducerPath],
  whitelist: ["auth", "user"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
})

const persistor = persistStore(store)

export { store, persistor }
