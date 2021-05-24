import { createSlice } from "@reduxjs/toolkit";

//Lists Slice Actions
import * as ACTIONS from "../actions/listSliceActions";

const initialState = {
  lists: [],
  isLoading: false,
  error: null,
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    onMoveCardBetweenLists: (state, action) => {
      const fIdx = action.payload.fromId;
      const dIdx = action.payload.destId;

      state.lists[fIdx].cards = action.payload.fromListCards;
      state.lists[dIdx].cards = action.payload.destListCards;
    },
    onMoveCardInList: (state, action) => {
      const listId = action.payload.listId;
      const cards = action.payload.cards;
      state.lists[listId].cards = cards;
    },
  },
  extraReducers: {
    [ACTIONS.createNewList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ACTIONS.createNewList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.lists.push(payload);
    },
    [ACTIONS.createNewList.rejected]: (state, { meta }) => {
      state.isLoading = false;
      state.error = "Could Not Create A List";
    },
    [ACTIONS.deleteListAct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ACTIONS.deleteListAct.fulfilled]: (state, { meta }) => {
      const idx = state.lists.findIndex((list) => list._id === meta.arg);
      state.isLoading = false;
      state.lists.splice(idx, 1);
    },
    [ACTIONS.deleteListAct.rejected]: (state, { meta }) => {
      state.isLoading = false;
      state.error = "Could Not Delete A List";
    },
    [ACTIONS.getAllLists.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ACTIONS.getAllLists.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.lists = action.payload;
    },
    [ACTIONS.getAllLists.rejected]: (state, { meta }) => {
      state.isLoading = false;
      state.error = "Could Not Loaded Lists";
    },
    [ACTIONS.editListAct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ACTIONS.editListAct.fulfilled]: (state, { meta, payload }) => {
      const idx = state.lists.findIndex((list) => list._id === meta.arg.id);
      state.isLoading = false;
      state.lists[idx] = payload;
    },
    [ACTIONS.editListAct.rejected]: (state, { meta }) => {
      state.isLoading = false;
      state.error = "Could Not Edit List";
    },
    [ACTIONS.createNewCard.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ACTIONS.createNewCard.fulfilled]: (state, { meta, payload }) => {
      const idx = state.lists.findIndex((list) => list._id === meta.arg.id);
      state.isLoading = false;
      state.lists[idx].cards.push(payload);
    },
    [ACTIONS.createNewCard.rejected]: (state, { meta }) => {
      state.isLoading = false;
      state.error = "Could Not Create Card";
    },
    [ACTIONS.editACard.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ACTIONS.editACard.fulfilled]: (state, { meta, payload }) => {
      const idx = state.lists.findIndex((list) => list._id === meta.arg.listId);
      const cardIdx = state.lists[idx].cards.findIndex(
        (card) => card._id === meta.arg.cardId
      );
      state.lists[idx].cards[cardIdx] = payload;
      state.isLoading = false;
    },
    [ACTIONS.editACard.rejected]: (state, { meta }) => {
      state.isLoading = false;
      state.error = "Could Not Create Card";
    },
    [ACTIONS.deleteACard.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ACTIONS.deleteACard.fulfilled]: (state, { meta, payload }) => {
      const idx = state.lists.findIndex((list) => list._id === meta.arg.listId);
      const cardIdx = state.lists[idx].cards.findIndex(
        (card) => card._id === meta.arg.cardId
      );
      state.lists[idx].cards.splice(cardIdx, 1);
      state.isLoading = false;
    },
    [ACTIONS.deleteACard.rejected]: (state, { meta }) => {
      state.isLoading = false;
      state.error = "Could Not Create Card";
    },
    [ACTIONS.moveCardAct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ACTIONS.moveCardAct.fulfilled]: (state, { meta, payload }) => {
      const listFromIdx = state.lists.findIndex(
        (list) => list._id === meta.arg.fromlistId
      );
      const listToIdx = state.lists.findIndex(
        (list) => list._id === meta.arg.toListid
      );
      state.lists[listFromIdx] = payload.listFromSaved;
      state.lists[listToIdx] = payload.listToSaved;
      state.isLoading = false;
    },
    [ACTIONS.moveCardAct.rejected]: (state, { meta }) => {
      state.isLoading = false;
      state.error = "Could Not Move Card";
    },
  },
});

export const { onMoveCardBetweenLists, onMoveCardInList } = listsSlice.actions;
export default listsSlice.reducer;
