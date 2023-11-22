import { createSlice } from "@reduxjs/toolkit";
import FormatDate from "../../utils/FormatDate";
const initialState = {
  date_paiement : FormatDate(new Date().toISOString())
};

const calendrierSlice = createSlice({
  initialState,
  name: "calendrier",
  reducers: {
   
    setDate_paiement: (state, action) => {
      state.date_paiement = action.payload;
    },
  },
});

export const { setDate_paiement } = calendrierSlice.actions;
export default calendrierSlice.reducer;