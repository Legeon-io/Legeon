import { createSlice } from "@reduxjs/toolkit";

const CallSlice = createSlice({
  name: "call",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    getVerifyRequest: (state) => {
      state.loading = true;
    },
    getVerifySuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getVerifyFailure: (state) => {
      state.loading = false;
    },
    deleteCallRequest: (state) => {
      state.loading = false;
    },
    deleteCallSuccess: (state, action) => {
      state.loading = false;
      const idToDelete = action.payload.serviceId;
      state.data = state.data.filter((item) => item._id !== idToDelete);
    },
    deleteCallFailure: (state) => {
      state.loading = false;
    },
    updateServiceRequest: (state) => {
      state.loading = true;
    },
    updateServiceSuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      const indexToUpdate = state.data.findIndex(
        (item) => item._id === action.payload.serviceId
      );

      if (indexToUpdate !== -1) {
        state.data[indexToUpdate] = {
          ...state.data[indexToUpdate],
          ...action.payload,
        };
      }
    },
    updateServiceFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getVerifySuccess,
  getVerifyFailure,
  getVerifyRequest,
  deleteCallRequest,
  deleteCallSuccess,
  deleteCallFailure,
  updateServiceRequest,
  updateServiceSuccess,
  updateServiceFailure,
} = CallSlice.actions;

const ServiceReducer = CallSlice.reducer;
export default ServiceReducer;
