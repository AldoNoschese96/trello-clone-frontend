import { configureStore } from "@reduxjs/toolkit";

//Slices
import authReducer from "./slices/authSlice";
import listsReducer from "./slices/listsSlice";
import boardsReducer from "./slices/boardsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    lists: listsReducer,
    boards: boardsReducer,
  },
});
