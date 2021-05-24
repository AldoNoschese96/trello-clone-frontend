//Api
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBoardsByUser,
  createNewBoard,
  deleteBoard,
} from "../../api/requests";

export const getAllBoards = createAsyncThunk(
  "boards/getAllByUser",
  async (id) => {
    const response = await getBoardsByUser(id);
    return response;
  }
);
export const createNewBoardAct = createAsyncThunk(
  "boards/createNewBoard",
  async (payload) => {
    const response = await createNewBoard(payload.id, payload.title);
    return response;
  }
);
export const deleteBoardAct = createAsyncThunk(
  "boards/deleteBoard",
  async (boardId) => {
    const response = await deleteBoard(boardId);
    return response;
  }
);
