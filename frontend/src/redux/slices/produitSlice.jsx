import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  serviceId: "first",
  search_value: "%20",
  currentPage: 1,
  totalPage: 1,
};

const searchSlice = createSlice({
  initialState,
  name: "produit",
  reducers: {
    setServiceId: (state, action) => {
      state.serviceId = action.payload;
    },
    setSearchValue: (state, action) => {
      state.search_value = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
  },
});

export const { setServiceId, setSearchValue, setCurrentPage, setTotalPage} = searchSlice.actions;
export default searchSlice.reducer;
