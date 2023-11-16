const { createSlice } = require("@reduxjs/toolkit");

const pppSlice = createSlice({
  name: "public profile",
  initialState: {
    data: {},
    loading: false,
  },
  reducers: { 
    pppRequest: (state) => {
      state.loading = true;
    },
    pppSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    pppFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { pppRequest, pppSuccess, pppFailure } = pppSlice.actions;
const pppReducer = pppSlice.reducer;
export default pppReducer;
