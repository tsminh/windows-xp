import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import windowReducer from "./windowSlice";
import fileSystemReducer from "./fileSystemSlice";
import applicationReducer from "./applicationSlice";
import startReducer from "./startSlice";
import listenerMiddleware from "./middleware";

const rootReducer = combineReducers({
    window: windowReducer,
    fileSystem: fileSystemReducer,
    application: applicationReducer,
    start: startReducer,
});

const persistConfig = {
    key: "app",
    storage: (storage as any).default ?? storage,
    whitelist: ["window"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).prepend(listenerMiddleware.middleware),
});

(window as any).appDispatch = store.dispatch;

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
