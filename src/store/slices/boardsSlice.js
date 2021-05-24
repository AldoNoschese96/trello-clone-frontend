import { createSlice } from "@reduxjs/toolkit";

import * as ACTIONS from "../actions/boardSliceActions";

const initialState = {
  boardsList: [],
  error: null,
  isLoading: false,
  modal: false,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    openModalAddBoard: (state, action) => {
      state.modal = true;
    },
    closeModalAddBoard: (state, action) => {
      state.modal = false;
    },
  },
  extraReducers: {
    [ACTIONS.getAllBoards.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ACTIONS.getAllBoards.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.boardsList = action.payload;
    },
    [ACTIONS.getAllBoards.rejected]: (state, action) => {
      state.error = "Boards Not Loaded Correctly";
      state.isLoading = false;
    },
    [ACTIONS.createNewBoardAct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ACTIONS.createNewBoardAct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.boardsList.push(action.payload);
      state.modal = false;
    },
    [ACTIONS.createNewBoardAct.rejected]: (state, action) => {
      state.error = "Board Not Created Correctly";
      state.isLoading = false;
      state.modal = false;
    },
    [ACTIONS.deleteBoardAct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ACTIONS.deleteBoardAct.fulfilled]: (state, { meta, payload }) => {
      const idx = state.boardsList.findIndex((item) => item._id === meta.arg);
      state.isLoading = false;
      state.boardsList.splice(idx, 1);
    },
    [ACTIONS.deleteBoardAct.rejected]: (state, action) => {
      state.error = "Board Not Deleted Correctly";
      state.isLoading = false;
    },
  },
});

export const { openModalAddBoard, closeModalAddBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
