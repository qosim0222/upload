import { configureStore } from "@reduxjs/toolkit";
import counter from "./features/counter.sliec";
import auth from "./features/auth.slice";
import { mainApi } from "./api/";

export const store = configureStore({
  reducer: {
    counter,
    auth,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
