import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./feature/alertslice"; // Correct path if necessary
import { authslice } from "./feature/auth/authsilce";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    auth: authslice.reducer,
  },
});
