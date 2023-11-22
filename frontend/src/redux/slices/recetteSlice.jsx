import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  serviceId: "first",
  currentPage: 1,
  totalPage: 1,
};

const searchSlice = createSlice({
  initialState,
  name: "recette",
  reducers: {
    setServiceId: (state, action) => {
      state.serviceId = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
  },
});

export const { setServiceId, setCurrentPage, setTotalPage } = searchSlice.actions;
export default searchSlice.reducer;
