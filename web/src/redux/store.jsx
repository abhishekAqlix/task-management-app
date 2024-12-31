import { configureStore } from "@reduxjs/toolkit";
import task from './taskSlice'
import { apiCall } from "../services/apiCall";
import { setupListeners } from "@reduxjs/toolkit/query";

const store= configureStore({
reducer:
{ tasks : task,
 [apiCall.reducerPath]: apiCall.reducer
 } ,
    middleware:(getDefaultMiddleware) =>getDefaultMiddleware().concat(apiCall.middleware),
})

setupListeners(store.dispatch)
export default store;
