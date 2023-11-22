import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import produitSlice from "./slices/produitSlice";
import recetteSlice from "./slices/recetteSlice";
import calendrierSlice from "./slices/calendrierSlice";


const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        produit: produitSlice,
        recette: recetteSlice,
        calendrier: calendrierSlice,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: true }).concat(apiSlice.middleware),
    devTools: false

})

export default store